import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import url from 'url';

// Vite Plugin to run /api serverless functions during local development (npm run dev)
function apiServerlessPlugin() {
  return {
    name: 'vite-plugin-api-serverless',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api')) {
          return next();
        }

        const parsedUrl = url.parse(req.url, true);
        let routeName = parsedUrl.pathname.replace(/^\/api\/?/, '').split('/')[0];
        if (!routeName) routeName = 'portfolio';

        // Strip any query strings from module path
        routeName = routeName.split('?')[0];

        try {
          // Dynamically load corresponding API module
          let apiModule;
          try {
            apiModule = await server.ssrLoadModule(`./api/${routeName}.js`);
          } catch (e) {
            console.error(`API route /api/${routeName} not found or failed to load:`, e);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: `API route /api/${routeName} not found` }));
          }

          const handler = apiModule.default || apiModule;
          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: `No default export handler in ./api/${routeName}.js` }));
          }

          // Buffer request body if applicable
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', async () => {
            req.body = body;
            req.query = parsedUrl.query || {};

            // Express/Vercel response compatibility helpers
            res.status = function (statusCode) {
              this.statusCode = statusCode;
              return this;
            };

            res.json = function (jsonObj) {
              if (!res.headersSent) {
                this.setHeader('Content-Type', 'application/json');
              }
              return this.end(JSON.stringify(jsonObj));
            };

            try {
              await handler(req, res);
            } catch (err) {
              console.error(`Error in /api/${routeName} handler:`, err);
              if (!res.headersSent) {
                res.status(500).json({ error: 'Internal Server Error', message: err.message });
              }
            }
          });
        } catch (err) {
          console.error(`API Middleware error for ${req.url}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal Server Middleware Error', message: err.message }));
          }
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiServerlessPlugin()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  }
});
