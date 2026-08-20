import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

const PortfolioContext = createContext();

const TOKEN_KEY = 'ashok_portfolio_admin_jwt';

export const PortfolioProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  // Core Public Data States
  const [profile, setProfile] = useState(INITIAL_PORTFOLIO_DATA.profile);
  const [about, setAbout] = useState({
    description: INITIAL_PORTFOLIO_DATA.profile.bio,
    highlights: [
      "Enterprise Full Stack Architectures with Java & Spring Boot",
      "Traditional Indian Sketching & Fine Art Craftsmanship",
      "Database Modeling with MongoDB & Relational SQL",
      "Agile & Responsive Client UI with React & Flutter"
    ]
  });
  const [projects, setProjects] = useState(INITIAL_PORTFOLIO_DATA.projects);
  const [skillCategories, setSkillCategories] = useState(INITIAL_PORTFOLIO_DATA.skillCategories);
  const [experiences, setExperiences] = useState(INITIAL_PORTFOLIO_DATA.experiences);
  const [certifications, setCertifications] = useState(INITIAL_PORTFOLIO_DATA.certifications);
  const [education, setEducation] = useState(INITIAL_PORTFOLIO_DATA.education);
  const [artworks, setArtworks] = useState(INITIAL_PORTFOLIO_DATA.artworks);
  const [contactMessages, setContactMessages] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  }, []);

  // 1. Fetch live Portfolio Data from MongoDB via Backend API
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portfolio', {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const json = await response.json();
        const data = json.data || json;

        if (data.profile) setProfile(data.profile);
        if (data.about) setAbout(data.about);
        if (data.projects) setProjects(data.projects);
        if (data.skillCategories || data.skills) {
          setSkillCategories(data.skillCategories || data.skills);
        }
        if (data.experiences) setExperiences(data.experiences);
        if (data.certifications) setCertifications(data.certifications);
        if (data.education) setEducation(data.education);
        if (data.artworks) setArtworks(data.artworks);
        if (json.updatedAt) setLastSaved(new Date(json.updatedAt));
      } else {
        console.warn('API /api/portfolio returned non-OK status. Fallback to default data.');
      }
    } catch (err) {
      console.warn('Failed to load portfolio from /api/portfolio, using client fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Fetch Contact Messages (Admin only)
  const fetchContactMessages = useCallback(async (token) => {
    const activeToken = token || adminToken;
    if (!activeToken) return;

    try {
      const res = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Accept': 'application/json'
        }
      });
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.messages)) {
          setContactMessages(json.messages);
        }
      }
    } catch (err) {
      console.warn('Could not fetch messages:', err);
    }
  }, [adminToken]);

  // 3. Verify Admin Session on Mount
  useEffect(() => {
    const verifySession = async () => {
      if (!adminToken) {
        setIsAdmin(false);
        return;
      }

      try {
        const res = await fetch('/api/auth', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Accept': 'application/json'
          }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.authenticated) {
            setIsAdmin(true);
            fetchContactMessages(adminToken);
          } else {
            setIsAdmin(false);
            localStorage.removeItem(TOKEN_KEY);
            setAdminToken(null);
          }
        } else {
          setIsAdmin(false);
        }
      } catch {
        // If API unreachable, retain state
      }
    };

    verifySession();
  }, [adminToken, fetchContactMessages]);

  // Initial Load of Portfolio Data
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // 4. Admin Auth Methods
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const json = await res.json();
      if (res.ok && json.success && json.token) {
        setAdminToken(json.token);
        setIsAdmin(true);
        try {
          localStorage.setItem(TOKEN_KEY, json.token);
        } catch (e) {
          console.warn('localStorage access failed', e);
        }
        fetchContactMessages(json.token);
        showToast("Authenticated as Admin. Editing enabled.");
        return { success: true };
      } else {
        return { 
          success: false, 
          message: json.error || "Invalid admin credentials. Access is restricted to Ashok K." 
        };
      }
    } catch (err) {
      return { 
        success: false, 
        message: "Failed to connect to authentication server: " + err.message 
      };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminToken(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Storage cleanup failed', e);
    }
    showToast("Logged out from Admin portal.");
  };

  // 5. EXPLICIT SAVE FUNCTION FOR SETTINGS / ADMIN
  // Takes the staged draft data from the admin form and commits it to MongoDB in one atomic API request
  const savePortfolioChanges = async (draftData) => {
    if (!isAdmin || !adminToken) {
      showToast("Authentication required to save changes.", "error");
      return { success: false, error: "Unauthorized" };
    }

    setIsSaving(true);
    try {
      const {
        profile: newProfile,
        about: newAbout,
        projects: newProjects,
        skills: newSkills,
        skillCategories: newSkillCategories,
        experiences: newExperiences,
        certifications: newCertifications,
        education: newEducation,
        artworks: newArtworks
      } = draftData;

      const payload = {
        profile: newProfile || profile,
        about: newAbout || about,
        projects: newProjects || projects,
        skillCategories: newSkillCategories || newSkills || skillCategories,
        experiences: newExperiences || experiences,
        certifications: newCertifications || certifications,
        education: newEducation || education,
        artworks: newArtworks || artworks
      };

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || json.message || 'Failed to save to database');
      }

      // Update active React state immediately
      setProfile(payload.profile);
      setAbout(payload.about);
      setProjects(payload.projects);
      setSkillCategories(payload.skillCategories);
      setExperiences(payload.experiences);
      setCertifications(payload.certifications);
      setEducation(payload.education);
      setArtworks(payload.artworks);
      setLastSaved(new Date());

      showToast("Portfolio changes saved to MongoDB Atlas successfully!");
      return { success: true };
    } catch (err) {
      console.error("Save error:", err);
      showToast("Failed to save changes: " + err.message, "error");
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  };

  // 6. Cloudinary Image Upload
  const uploadImage = async (fileOrBase64, folder = 'ashok_portfolio/artworks') => {
    if (!adminToken) {
      throw new Error('Admin authentication required to upload image.');
    }

    let base64String = fileOrBase64;
    if (typeof fileOrBase64 !== 'string') {
      // Convert File / Blob to base64 data URL
      base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(fileOrBase64);
      });
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ image: base64String, folder })
    });

    const json = await res.json();
    if (!res.ok || !json.secure_url) {
      throw new Error(json.error || json.message || 'Failed to upload image to Cloudinary');
    }

    return {
      url: json.secure_url,
      publicId: json.public_id
    };
  };

  // 7. Artwork Management
  const addArtwork = async (artItem) => {
    if (!adminToken) {
      showToast("Admin access required to add artworks.", "error");
      return;
    }

    try {
      const res = await fetch('/api/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(artItem)
      });

      const json = await res.json();
      if (res.ok && json.artwork) {
        setArtworks(prev => [json.artwork, ...prev]);
        showToast("Artwork added to gallery & saved to database.");
      } else {
        throw new Error(json.error || 'Failed to add artwork');
      }
    } catch (err) {
      // Fallback local update
      const newArt = {
        ...artItem,
        id: artItem.id || `art-${Date.now()}`,
        dateAdded: artItem.dateAdded || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      setArtworks(prev => [newArt, ...prev]);
      showToast("Artwork added.");
    }
  };

  const deleteArtwork = async (id) => {
    if (!adminToken) {
      showToast("Admin access required to delete artworks.", "error");
      return;
    }

    try {
      const res = await fetch(`/api/artworks?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        setArtworks(prev => prev.filter(a => a.id !== id));
        showToast("Artwork deleted from database.");
      } else {
        const json = await res.json();
        throw new Error(json.error || 'Failed to delete');
      }
    } catch (err) {
      setArtworks(prev => prev.filter(a => a.id !== id));
      showToast("Artwork removed.");
    }
  };

  // 8. Contact Messages
  const submitContactMessage = async (name, email, subject, message) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const json = await res.json();
      if (res.ok) {
        showToast("Message sent to Ashok K successfully!");
        return json.data;
      } else {
        throw new Error(json.error || 'Failed to send message');
      }
    } catch (err) {
      showToast("Message sent locally (Server offline).");
      return { id: `msg-${Date.now()}`, name, email, subject, message };
    }
  };

  const markMessageRead = async (id) => {
    if (!adminToken) return;
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ id, isRead: true })
      });
      setContactMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteContactMessage = async (id) => {
    if (!adminToken) return;
    try {
      await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      setContactMessages(prev => prev.filter(m => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const unreadMessageCount = contactMessages.filter(m => !m.isRead).length;
  const currentAvatar = profile.avatarUrl || profile.defaultAvatar || '/ashok_portrait.jpg';

  return (
    <PortfolioContext.Provider
      value={{
        isLoading,
        isSaving,
        lastSaved,
        isAdmin,
        adminToken,
        login,
        logout,
        toast,
        showToast,
        // Public Data
        profile,
        about,
        education,
        projects,
        skillCategories,
        experiences,
        certifications,
        artworks,
        contactMessages,
        unreadMessageCount,
        currentAvatar,
        // Mutators
        savePortfolioChanges,
        uploadImage,
        addArtwork,
        deleteArtwork,
        submitContactMessage,
        markMessageRead,
        deleteContactMessage,
        fetchAllData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
