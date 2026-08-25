# Ashok K Portfolio Roadmap

**Document purpose:** Single source of truth for the portfolio product, its current implementation, delivery priorities, and verification plan.

**Last reviewed:** 2026-08-25
**Product owner:** Ashok K
**Primary identity:** Java Full Stack App Developer and Computer Science Engineering student
**Repository:** `ashok-k-portfolio`

## 1. Product Overview

This repository contains a personal portfolio experience presented through two clients:

- A responsive React/Vite web portfolio for public visitors and browser-based administration.
- A native Android Jetpack Compose portfolio app with local persistence and an admin/settings experience.

The portfolio combines professional information with a traditional Indian art gallery. Its primary goals are to:

1. Present Ashok's profile, skills, education, experience, certifications, projects, and artwork.
2. Give visitors a clear way to contact Ashok.
3. Allow the owner to update portfolio content without changing source code.
4. Demonstrate full-stack, mobile, database, cloud-media, and UI engineering capability.

## 2. Current State Summary

### Web client: implemented

- React 18 application bootstrapped with Vite.
- Single-page portfolio assembled in `src/App.jsx`.
- Sections currently rendered in this order:
  1. Navigation
  2. Hero/profile
  3. About
  4. Skills
  5. Experience
  6. Projects
  7. Education
  8. Certifications
  9. Art gallery
  10. Contact
  11. Footer
- Settings modal for admin login and content editing.
- Artwork lightbox and global toast notifications.
- Client fallback data allows the site to render when the API/database is unavailable.
- Public contact submission and admin message viewing.

### Backend/API: implemented

Serverless-style JavaScript handlers are located in `api/`:

| Endpoint                  | Purpose                          | Access        |
| ------------------------- | -------------------------------- | ------------- |
| `/api/portfolio` GET      | Read portfolio content           | Public        |
| `/api/portfolio` PUT/POST | Replace/update portfolio content | Admin         |
| `/api/auth` POST          | Authenticate admin and issue JWT | Public login  |
| `/api/auth` GET           | Verify an admin JWT              | Authenticated |
| `/api/contact` POST       | Submit a visitor message         | Public        |
| `/api/contact` GET        | List messages                    | Admin         |
| `/api/contact` PATCH      | Mark a message read/unread       | Admin         |
| `/api/contact` DELETE     | Delete a message                 | Admin         |
| `/api/artworks` POST      | Add an artwork                   | Admin         |
| `/api/artworks` DELETE    | Delete an artwork                | Admin         |
| `/api/upload` POST        | Upload an image to Cloudinary    | Admin         |

- MongoDB Atlas stores the main portfolio document and contact messages.
- The portfolio document uses the key `main_portfolio`.
- First read can seed MongoDB from default data.
- Cloudinary is intended for artwork media storage.
- API handlers include CORS and preflight handling.

### Android client: implemented, currently local-first

- Kotlin and Jetpack Compose UI.
- Android application id: `com.aistudio.ashokportfolio.qwvf`.
- Minimum SDK 24, target SDK 36, compile SDK 36.1.
- Room database stores projects, skills, experience, certifications, artworks, and contact messages.
- SharedPreferences stores the selected profile image URI.
- ViewModel exposes StateFlows and coordinates UI state, navigation, dialogs, and CRUD operations.
- Settings screen supports admin login, CRUD management, contact-message management, and profile-image changes.
- Portfolio screen includes navigation, section rendering, art filtering, lightbox behavior, and scroll-to-top.
- Retrofit/OkHttp/Moshi dependencies are present, but the current repository flow is primarily local Room persistence.
- Android authentication currently performs credential comparison in the client and is not yet connected to the web JWT/API flow.

## 3. Content Model

The shared conceptual content model consists of:

- **Profile:** name, title, subtitle, email, admin email, phone, location, education, college, CGPA, social links, biography, availability status, avatar.
- **About:** description and highlight statements.
- **Skills:** ordered categories and skill items with level and primary flag.
- **Experience:** title, organization, period, role type, credential, technologies, and achievement bullets.
- **Projects:** title, subtitle, description, problem solved, contribution, technologies, GitHub/live-demo links, featured flag, and category.
- **Education:** degree, institution, location, period, grade, and highlights.
- **Certifications:** title, issuer, issue date, credential id, verification URL, and covered skills.
- **Artworks:** title, category, description, date added, image URL/URI, and sample state.
- **Contact messages:** sender, email, subject, message, timestamp, and read state.

Current seed content includes no projects, six skill groups, two experience records, five certifications, one education record, and two artwork records.

## 4. Technical Architecture

```text
Visitor browser
  -> React/Vite UI
  -> PortfolioContext
  -> /api/* serverless handlers
  -> MongoDB Atlas / Cloudinary

Admin browser
  -> JWT login
  -> authenticated portfolio/contact/upload requests
  -> MongoDB Atlas / Cloudinary

Android device
  -> Jetpack Compose screens
  -> PortfolioViewModel
  -> PortfolioRepository
  -> Room database + SharedPreferences

Future target
  -> Android and web consume the same validated API contracts
  -> shared remote content with offline cache where appropriate
```

### Important implementation locations

- Web composition: `src/App.jsx`
- Web state and API orchestration: `src/context/PortfolioContext.jsx`
- Web seed model: `src/data/portfolioData.js`
- Web components: `src/components/`
- API handlers: `api/`
- API database helper: `api/_lib/mongodb.js`
- API auth helper: `api/_lib/auth.js`
- API default model: `api/_lib/defaultData.js`
- Android entry point: `app/src/main/java/com/example/MainActivity.kt`
- Android state orchestration: `app/src/main/java/com/example/ui/PortfolioViewModel.kt`
- Android data model: `app/src/main/java/com/example/data/model/PortfolioData.kt`
- Android persistence: `app/src/main/java/com/example/data/local/`
- Android repository: `app/src/main/java/com/example/data/repository/PortfolioRepository.kt`

## 5. Run and Build Commands

### Web

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
npm run build
npm run preview
```

The development server is configured for port `3000` and binds to `0.0.0.0`.

### Android

Prerequisites: Android Studio, Android SDK, and a device/emulator.

1. Open the repository in Android Studio.
2. Configure the project environment values from `.env.example` into `.env` where required.
3. Review signing configuration before a release build.
4. Sync Gradle and run the `app` configuration.
5. Run unit, Robolectric, screenshot, and instrumentation tests where the environment supports them.

The existing Android build includes Compose, Room, Coil, Retrofit, OkHttp, Moshi, Firebase/App Check, and Roborazzi-related dependencies.

### Required environment configuration

The exact values must remain outside source control. Expected server-side configuration includes:

- `MONGODB_URI`
- `AUTH_SECRET` or `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Use a strong unique secret and production credentials in deployed environments. Do not rely on application fallback values.

## 6. Roadmap Priorities

Priority meanings:

- **P0:** Security, correctness, or release blocker.
- **P1:** Required for a dependable public product.
- **P2:** High-value product improvement.
- **P3:** Nice-to-have polish or expansion.

## 7. Phase 0: Stabilize and Secure

**Target outcome:** The existing web portfolio can be deployed without known critical configuration or authentication weaknesses.

### P0 tasks

- Remove hardcoded fallback admin passwords from API and Android code.
- Remove the predictable fallback JWT secret and fail clearly when `AUTH_SECRET`/`JWT_SECRET` is missing in production.
- Move all admin authentication to the server/API; Android must not compare production credentials locally.
- Add token expiry handling, logout invalidation strategy, and consistent unauthorized behavior.
- Restrict CORS to known production origins instead of allowing `*` with credentials.
- Validate and sanitize all portfolio update fields, contact fields, URLs, and uploaded image metadata.
- Add rate limiting and abuse protection to login, contact, upload, and write endpoints.
- Confirm secrets are absent from Git history and deployment logs.

### P1 tasks

- Add structured API error responses and request correlation IDs.
- Add MongoDB indexes for the portfolio key, contact timestamp, and contact id.
- Define backup/restore procedure for MongoDB Atlas.
- Document deployment environment variables and production setup in this roadmap.

**Exit criteria:** Production configuration has no credential/secret fallback, unauthorized requests are rejected consistently, CORS is restricted, and security checks pass.

## 8. Phase 1: Establish a Reliable Web Release

**Target outcome:** A visitor can use the public site and the owner can safely maintain content.

- Replace the starter README with product-specific setup and deployment documentation.
- Add automated API tests for public reads, validation errors, auth failures, and authenticated writes.
- Add frontend tests for loading fallback data, successful API hydration, login/logout, save failure, contact submission, and lightbox behavior.
- Add responsive checks at mobile, tablet, and desktop widths.
- Add loading, empty, and error states to every data-dependent section.
- Add confirmation handling for destructive artwork/message actions.
- Improve accessibility: semantic headings, keyboard navigation, focus trapping in modals, labels, alt text, and color contrast.
- Add SEO metadata, Open Graph metadata, canonical URL, sitemap, and robots policy.
- Add image optimization, lazy loading, and broken-image fallback behavior.
- Add a deployment pipeline that builds the web client and runs tests on every change.

**Exit criteria:** The public site builds reproducibly, core visitor flows work without MongoDB using fallback data, and admin changes persist correctly with configured services.

## 9. Phase 2: Unify Web and Android Data

**Target outcome:** Both clients present the same current portfolio content and use one authentication/data contract.

- Publish a documented API contract for profile, content, artwork, upload, auth, and contact messages.
- Create Android API DTOs matching the web/MongoDB schema, including string IDs and nullable fields.
- Add a Retrofit service and remote data source to Android.
- Add repository synchronization: remote-first with Room cache and clear offline behavior.
- Resolve identifier differences between web string IDs and Android numeric Room IDs.
- Add migration handling for existing Room databases.
- Sync profile and education data, which are currently less fully represented in the Android repository flow.
- Replace Android local credential comparison with the shared server authentication flow.
- Store Android tokens securely using encrypted storage rather than plain preferences.
- Decide whether Android and web admin edits are both supported or whether Android is viewer-plus-limited-admin.

**Exit criteria:** A content edit made through the web is visible on Android after synchronization, and Android edits follow the same authorization and validation rules.

## 10. Phase 3: Content Management and Editorial Quality

**Target outcome:** Admin editing is efficient, recoverable, and consistent.

- Add draft and published states for portfolio content.
- Add server-side versioning and an audit log for admin changes.
- Add preview-before-publish for profile, projects, certifications, and artwork.
- Add reorder controls for projects, skills, experience, certifications, and artwork.
- Add bulk import/export for portfolio content using a validated JSON format.
- Add artwork replacement and metadata editing, not only add/delete.
- Add upload constraints: file type allowlist, file-size limit, dimensions, and malware/content scanning strategy.
- Add contact-message pagination, filtering, search, and bulk read/archive actions.
- Add email notification integration for new contact messages, with delivery status and failure handling.

**Exit criteria:** Admin can safely draft, review, publish, recover, and audit content changes without source edits.

## 11. Phase 4: Product and Presentation Improvements

**Target outcome:** The portfolio communicates expertise clearly and converts visitors into meaningful contacts.

- Add downloadable résumé/CV with a controlled version in the admin workflow.
- Add project detail pages or deep links with richer case studies and measurable outcomes.
- Add live demo links where available and validate link health periodically.
- Add analytics that respect privacy and avoid collecting unnecessary personal data.
- Add social sharing previews for projects and artwork.
- Add contact success tracking and spam-resistant form UX.
- Add localization readiness for English and future regional language support.
- Add dark/light theme support only if it remains accessible and visually coherent across both clients.
- Add app links/deep links from web project cards to Android views where useful.

**Exit criteria:** Visitors can understand the strongest work quickly, verify credentials, view artwork, and contact Ashok with minimal friction.

## 12. Phase 5: Release and Operations

**Target outcome:** The product is observable, maintainable, and ready for regular releases.

- Set up separate development, staging, and production environments.
- Add health checks for API, MongoDB, and Cloudinary configuration.
- Add error monitoring for frontend, API, and Android crashes.
- Add uptime monitoring for public endpoints and contact delivery.
- Add dependency update and vulnerability scanning in CI.
- Enable Android release signing through CI-managed secrets.
- Turn on release minification/shrinking after validating Compose, Room, Moshi, and Coil behavior.
- Add release notes and a versioning policy for web and Android.
- Define incident response, rollback, and data recovery steps.

**Exit criteria:** Releases are repeatable, failures are visible, and the owner can recover service and data without ad hoc intervention.

## 13. Testing Strategy

### Web tests

- Unit: data normalization, validation, auth state transitions, content update payloads.
- API: method handling, CORS/preflight, public fallback, MongoDB success/failure, JWT rejection, contact validation, upload rejection.
- Component: navigation, sections, modal focus/close behavior, lightbox, toast, admin settings.
- End-to-end: visitor browse/contact flow and admin login/edit/save/message-management flow.
- Visual: responsive screenshots for key viewport sizes.

### Android tests

- Unit: repository mappings, ViewModel state transitions, validation, category filtering, unread count.
- Robolectric: startup, screen state, dialogs, admin behavior.
- Screenshot: portfolio sections, settings, lightbox, empty/error states.
- Instrumentation: navigation, CRUD, back handling, scrolling, and form submission.
- Integration: remote synchronization, authentication, offline cache, and migration behavior after API unification.

### Minimum release gate

- `npm run build` succeeds.
- API tests pass with and without configured external services where fallback behavior is expected.
- Android debug build and available test suites pass.
- No secrets or hardcoded production credentials are present.
- Public contact, admin save, artwork upload, and artwork deletion are manually smoke-tested in staging.
- Accessibility and responsive checks have no release-blocking issues.

## 14. Risks and Decisions Needed

| Risk or decision                                   | Impact                     | Proposed direction                                     |
| -------------------------------------------------- | -------------------------- | ------------------------------------------------------ |
| Web and Android use different persistence models   | Data divergence            | Make the API canonical; retain Room as Android cache   |
| Client-side Android credential check               | Critical security weakness | Use server JWT authentication                          |
| Default secrets in auth helper                     | Account compromise risk    | Require environment secrets in production              |
| CORS allows all origins with credentials           | Cross-origin abuse risk    | Allowlist deployed origins                             |
| Full portfolio PUT can overwrite content           | Accidental data loss       | Add optimistic concurrency/version checks              |
| Upload endpoint accepts base64 payloads            | Cost and abuse risk        | Enforce size/type limits and rate limiting             |
| Contact messages may contain spam or personal data | Operational/privacy risk   | Add anti-spam, retention, and access policy            |
| Android profile/education sync is incomplete       | Client parity gap          | Include these resources in the API/repository contract |
| Release signing depends on local files/env values  | Release reliability risk   | Move signing to protected CI secrets                   |

## 15. Recommended Delivery Order

1. Secure authentication, secrets, CORS, validation, and write endpoints.
2. Add web/API automated tests and replace the starter documentation.
3. Deploy a staging web release and verify the complete visitor/admin workflow.
4. Define and implement the shared API contract.
5. Connect Android to the API with Room offline caching.
6. Add editorial versioning, drafts, previews, and audit history.
7. Add presentation, analytics, résumé, and project-detail improvements.
8. Add operational monitoring, CI releases, backups, and recovery procedures.

## 16. Definition of Done

The roadmap is complete when:

- Web and Android show the same authoritative portfolio content.
- Public visitors can browse all sections, view artwork, and send a contact message.
- Only securely authenticated administrators can change content or view messages.
- Content writes are validated, recoverable, auditable, and protected against accidental overwrite.
- Images are stored and delivered through a controlled media pipeline.
- The project has reproducible setup, build, test, deployment, monitoring, and rollback documentation.
- Automated checks cover the critical visitor, admin, API, synchronization, and offline behaviors.
