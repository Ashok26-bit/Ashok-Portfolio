import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  LogOut, 
  Save, 
  RotateCcw, 
  AlertTriangle, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit2, 
  Mail, 
  Check, 
  User, 
  Briefcase, 
  Code, 
  Award, 
  GraduationCap, 
  Palette, 
  Inbox,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertCircle,
  Database,
  Cloud
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { 
    isAdmin, 
    login, 
    logout, 
    profile, 
    about, 
    skillCategories,
    experiences, 
    projects, 
    education, 
    certifications, 
    artworks, 
    contactMessages,
    markMessageRead,
    deleteContactMessage,
    savePortfolioChanges,
    uploadImage,
    lastSaved
  } = usePortfolio();

  // Auth Form State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile');

  // Draft Data States (isolated from public view until explicitly saved)
  const [draftProfile, setDraftProfile] = useState({ ...profile });
  const [draftAbout, setDraftAbout] = useState({ ...about });
  const [draftSkills, setDraftSkills] = useState(JSON.parse(JSON.stringify(skillCategories)));
  const [draftExperiences, setDraftExperiences] = useState(JSON.parse(JSON.stringify(experiences)));
  const [draftProjects, setDraftProjects] = useState(JSON.parse(JSON.stringify(projects)));
  const [draftEducation, setDraftEducation] = useState({ ...education });
  const [draftCertifications, setDraftCertifications] = useState(JSON.parse(JSON.stringify(certifications)));
  const [draftArtworks, setDraftArtworks] = useState(JSON.parse(JSON.stringify(artworks)));

  // Save button status: 'idle' | 'saving' | 'saved' | 'error'
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveErrorMessage, setSaveErrorMessage] = useState('');

  // Unsaved changes confirmation dialog
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Image Uploading state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const artFileInputRef = useRef(null);

  // New Item states for quick additions
  const [newSkillCatIndex, setNewSkillCatIndex] = useState(0);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');

  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState('Sketches');
  const [newArtDescription, setNewArtDescription] = useState('');
  const [newArtImageUrl, setNewArtImageUrl] = useState('');

  // Re-sync draft whenever modal opens or public state updates from server
  useEffect(() => {
    if (isOpen) {
      resetDraftsToDatabase();
    }
  }, [isOpen, profile, about, skillCategories, experiences, projects, education, certifications, artworks]);

  const resetDraftsToDatabase = () => {
    setDraftProfile({ ...profile });
    setDraftAbout({ ...about });
    setDraftSkills(JSON.parse(JSON.stringify(skillCategories)));
    setDraftExperiences(JSON.parse(JSON.stringify(experiences)));
    setDraftProjects(JSON.parse(JSON.stringify(projects)));
    setDraftEducation({ ...education });
    setDraftCertifications(JSON.parse(JSON.stringify(certifications)));
    setDraftArtworks(JSON.parse(JSON.stringify(artworks)));
    setHasUnsavedChanges(false);
    setSaveStatus('idle');
    setSaveErrorMessage('');
  };

  const markDirty = () => {
    setHasUnsavedChanges(true);
    if (saveStatus === 'saved') setSaveStatus('idle');
  };

  // Safe Close with Unsaved Check
  const handleAttemptClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedPrompt(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscardAndClose = () => {
    resetDraftsToDatabase();
    setShowUnsavedPrompt(false);
    onClose();
  };

  // Explicit Save Execution to MongoDB Atlas
  const handleSaveChanges = async () => {
    setSaveStatus('saving');
    setSaveErrorMessage('');

    try {
      const res = await savePortfolioChanges({
        profile: draftProfile,
        about: draftAbout,
        skillCategories: draftSkills,
        experiences: draftExperiences,
        projects: draftProjects,
        education: draftEducation,
        certifications: draftCertifications,
        artworks: draftArtworks
      });

      if (res.success) {
        setSaveStatus('saved');
        setHasUnsavedChanges(false);
        setTimeout(() => {
          setSaveStatus('idle');
        }, 4000);
      } else {
        setSaveStatus('error');
        setSaveErrorMessage(res.error || 'Failed to save changes to MongoDB Atlas.');
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  // Profile Avatar Upload using Cloudinary
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError('');
    try {
      const { url } = await uploadImage(file, 'ashok_portfolio/profile');
      setDraftProfile(prev => ({ ...prev, avatarUrl: url }));
      markDirty();
    } catch (err) {
      console.error('Image upload failed', err);
      setUploadError(err.message || 'Upload to Cloudinary failed.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Artwork Image Upload using Cloudinary
  const handleArtworkImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError('');
    try {
      const { url } = await uploadImage(file, 'ashok_portfolio/artworks');
      setNewArtImageUrl(url);
      markDirty();
    } catch (err) {
      console.error('Artwork upload failed', err);
      setUploadError(err.message || 'Artwork upload to Cloudinary failed.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Auth Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsAuthenticating(true);

    try {
      const res = await login(emailInput, passwordInput);
      if (!res.success) {
        setLoginError(res.message);
      } else {
        setEmailInput('');
        setPasswordInput('');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Helper to add new artwork to draft list
  const handleAddArtworkToDraft = () => {
    if (!newArtTitle || !newArtImageUrl) {
      alert('Please provide both artwork title and image URL (or upload image).');
      return;
    }

    const newArt = {
      id: `art-${Date.now()}`,
      title: newArtTitle.trim(),
      category: newArtCategory,
      description: newArtDescription.trim(),
      imageUrl: newArtImageUrl.trim(),
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setDraftArtworks(prev => [newArt, ...prev]);
    setNewArtTitle('');
    setNewArtDescription('');
    setNewArtImageUrl('');
    markDirty();
  };

  // Helper to remove artwork from draft
  const handleRemoveArtworkFromDraft = (id) => {
    setDraftArtworks(prev => prev.filter(a => a.id !== id));
    markDirty();
  };

  // Helper to add skill to category
  const handleAddSkillToDraft = () => {
    if (!newSkillName.trim()) return;
    setDraftSkills(prev => {
      const updated = [...prev];
      if (updated[newSkillCatIndex]) {
        updated[newSkillCatIndex].skills.push({
          id: `s-${Date.now()}`,
          name: newSkillName.trim(),
          level: newSkillLevel.trim() || 'Proficient',
          primary: true
        });
      }
      return updated;
    });
    setNewSkillName('');
    setNewSkillLevel('');
    markDirty();
  };

  const handleRemoveSkill = (catIdx, skillId) => {
    setDraftSkills(prev => {
      const updated = [...prev];
      if (updated[catIdx]) {
        updated[catIdx].skills = updated[catIdx].skills.filter(s => s.id !== skillId);
      }
      return updated;
    });
    markDirty();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      
      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedPrompt && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#D3E2EB] p-6 max-w-md w-full shadow-dropdown space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-[#17212B]">
                Unsaved Changes
              </h3>
              <p className="text-xs sm:text-sm text-[#52616B]">
                You have staged changes in the admin form. If you close now without clicking "Save Changes", your edits will not be saved to MongoDB Atlas.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowUnsavedPrompt(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#D3E2EB] text-xs font-semibold text-[#17212B] hover:bg-[#F8FAFC]"
              >
                Stay & Keep Editing
              </button>
              <button
                onClick={handleConfirmDiscardAndClose}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Settings Dialog */}
      <div className="bg-white rounded-3xl border border-[#D3E2EB] w-full max-w-5xl shadow-dropdown overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5EDF1] flex items-center justify-between bg-[#F8FAFC]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3A637B] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-[#17212B]">
                  Admin Suite & Portfolio Manager
                </h2>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isAdmin 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-[#E5EDF1] text-[#52616B]'
                }`}>
                  {isAdmin ? 'Authenticated Admin' : 'Visitor Mode'}
                </span>
              </div>
              <p className="text-[11px] text-[#52616B]">
                {isAdmin 
                  ? 'All changes save directly to MongoDB Atlas and are visible to every visitor.' 
                  : 'Log in with admin credentials to unlock real-time portfolio editing & persistence.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#D3E2EB] hover:border-red-300 text-xs font-medium text-[#52616B] hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={handleAttemptClose}
              className="p-2 rounded-xl text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1]/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdmin ? (
          /* Visitor Login View */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#96C2DB]/20 text-[#3A637B] flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-display text-[#17212B]">
                Admin Authentication
              </h3>
              <p className="text-xs text-[#52616B] leading-relaxed">
                Sign in with Ashok K's admin account to modify portfolio bio, projects, technical skills, experiences, and artworks stored in MongoDB Atlas.
              </p>
            </div>

            {loginError && (
              <div className="w-full p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-[#17212B] mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="ashokk.profile.in@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3E2EB] text-xs focus:outline-none focus:ring-2 focus:ring-[#96C2DB] bg-white text-[#17212B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17212B] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3E2EB] text-xs focus:outline-none focus:ring-2 focus:ring-[#96C2DB] bg-white text-[#17212B]"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft hover:shadow-hover transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authenticate as Admin</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-[#E5EDF1] w-full text-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#52616B]">
                <Database className="w-3.5 h-3.5 text-[#3A637B]" />
                <span>Powered by MongoDB Atlas & Cloudinary</span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Management Tabs */
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-[#F8FAFC] border-r border-[#E5EDF1] p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              {[
                { id: 'profile', label: 'Profile & Hero', icon: User },
                { id: 'about', label: 'About & Highlights', icon: Sparkles },
                { id: 'skills', label: 'Skills & Tools', icon: Code },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'experience', label: 'Experience', icon: Award },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'certifications', label: 'Certifications', icon: Award },
                { id: 'artworks', label: 'Traditional Art Gallery', icon: Palette },
                { id: 'inbox', label: `Messages (${contactMessages.filter(m => !m.isRead).length})`, icon: Inbox },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-left whitespace-nowrap md:whitespace-normal ${
                      isActive
                        ? 'bg-[#3A637B] text-white shadow-xs'
                        : 'text-[#52616B] hover:text-[#17212B] hover:bg-[#E5EDF1]/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
              
              {/* TAB 1: Profile & Hero */}
              {activeTab === 'profile' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3">
                    <h3 className="text-sm font-bold text-[#17212B]">Personal & Hero Information</h3>
                    <p className="text-xs text-[#52616B]">Edit headline, titles, status pill, contact details, and links.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={draftProfile.name || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, name: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={draftProfile.title || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, title: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={draftProfile.subtitle || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, subtitle: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Status Pill</label>
                      <input
                        type="text"
                        value={draftProfile.status || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, status: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Public Email</label>
                      <input
                        type="email"
                        value={draftProfile.email || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, email: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={draftProfile.phone || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, phone: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Location</label>
                      <input
                        type="text"
                        value={draftProfile.location || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, location: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Education Summary</label>
                      <input
                        type="text"
                        value={draftProfile.education || ''}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, education: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={draftProfile.github || 'https://github.com/Ashok26-bit'}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, github: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={draftProfile.linkedin || 'https://www.linkedin.com/in/ashok-k-ashok/'}
                        onChange={(e) => {
                          setDraftProfile(p => ({ ...p, linkedin: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                      />
                    </div>
                  </div>

                  {/* Profile Avatar Upload */}
                  <div className="pt-3 border-t border-[#E5EDF1]">
                    <label className="block text-xs font-bold text-[#17212B] mb-2">Profile Portrait Image</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={draftProfile.avatarUrl || draftProfile.defaultAvatar || '/ashok_portrait.jpg'}
                        alt="Avatar Preview"
                        className="w-16 h-16 rounded-2xl object-cover border border-[#D3E2EB] shadow-xs"
                      />
                      <div className="space-y-1.5">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleProfileImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={isUploadingImage}
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D3E2EB] hover:border-[#96C2DB] text-xs font-semibold text-[#17212B] shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#3A637B]" />
                          <span>{isUploadingImage ? 'Uploading to Cloudinary...' : 'Upload New Photo (Cloudinary)'}</span>
                        </button>
                        <p className="text-[11px] text-[#52616B]">Uploads securely to Cloudinary media storage.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1">Short Biography</label>
                    <textarea
                      rows={3}
                      value={draftProfile.bio || ''}
                      onChange={(e) => {
                        setDraftProfile(p => ({ ...p, bio: e.target.value }));
                        markDirty();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: About & Highlights */}
              {activeTab === 'about' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3">
                    <h3 className="text-sm font-bold text-[#17212B]">About Me Section</h3>
                    <p className="text-xs text-[#52616B]">Refine your detailed developer story and bullet point highlights.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1">Detailed Description</label>
                    <textarea
                      rows={5}
                      value={draftAbout.description || ''}
                      onChange={(e) => {
                        setDraftAbout(a => ({ ...a, description: e.target.value }));
                        markDirty();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs focus:ring-2 focus:ring-[#96C2DB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-2">Key Highlights</label>
                    <div className="space-y-2">
                      {(draftAbout.highlights || []).map((hl, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) => {
                              const updated = [...draftAbout.highlights];
                              updated[idx] = e.target.value;
                              setDraftAbout(a => ({ ...a, highlights: updated }));
                              markDirty();
                            }}
                            className="flex-1 px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = draftAbout.highlights.filter((_, i) => i !== idx);
                              setDraftAbout(a => ({ ...a, highlights: updated }));
                              markDirty();
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setDraftAbout(a => ({
                            ...a,
                            highlights: [...(a.highlights || []), "New architectural competency"]
                          }));
                          markDirty();
                        }}
                        className="flex items-center gap-1 text-xs font-bold text-[#3A637B] hover:underline pt-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Highlight</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Skills */}
              {activeTab === 'skills' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3">
                    <h3 className="text-sm font-bold text-[#17212B]">Technical Skills Categorization</h3>
                    <p className="text-xs text-[#52616B]">Add or remove technologies across programming languages, backend, frontend, databases, and core concepts.</p>
                  </div>

                  {/* Add skill input */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF1] space-y-3">
                    <h4 className="text-xs font-bold text-[#17212B]">Quick Add Skill</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <select
                        value={newSkillCatIndex}
                        onChange={(e) => setNewSkillCatIndex(Number(e.target.value))}
                        className="px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white"
                      >
                        {draftSkills.map((cat, i) => (
                          <option key={i} value={i}>{cat.title}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Skill Name (e.g. Spring Boot)"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Level / Description (e.g. Enterprise Backend)"
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSkillToDraft}
                      className="px-4 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill to Category</span>
                    </button>
                  </div>

                  {/* Existing skills categories */}
                  <div className="space-y-4">
                    {draftSkills.map((cat, catIdx) => (
                      <div key={catIdx} className="border border-[#E5EDF1] rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => {
                              const updated = [...draftSkills];
                              updated[catIdx].title = e.target.value;
                              setDraftSkills(updated);
                              markDirty();
                            }}
                            className="font-bold text-xs text-[#17212B] border-b border-dashed border-[#96C2DB] bg-transparent"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((s) => (
                            <span
                              key={s.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5EDF1]/60 border border-[#D3E2EB] text-xs font-medium text-[#17212B]"
                            >
                              <span>{s.name} <span className="text-[#52616B] text-[10px]">({s.level})</span></span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(catIdx, s.id)}
                                className="text-red-500 hover:text-red-700 ml-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#17212B]">Projects Showcase</h3>
                      <p className="text-xs text-[#52616B]">Edit project descriptions, problem solved, contributions, and GitHub links.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newP = {
                          id: `proj-${Date.now()}`,
                          title: "New Full-Stack Project",
                          subtitle: "Architectural Overview",
                          description: "Project description and features.",
                          problemSolved: "Core problem addressed by this platform.",
                          keyContribution: "Full-stack implementation details.",
                          technologies: ["Java", "Spring Boot", "React", "MongoDB"],
                          githubUrl: "https://github.com/Ashok26-bit",
                          liveDemoUrl: "",
                          featured: true,
                          category: "Full Stack"
                        };
                        setDraftProjects(prev => [newP, ...prev]);
                        markDirty();
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#3A637B] text-white text-xs font-semibold shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {draftProjects.map((p, pIdx) => (
                      <div key={p.id} className="border border-[#E5EDF1] rounded-2xl p-4 space-y-3 bg-[#F8FAFC]">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const updated = [...draftProjects];
                              updated[pIdx].title = e.target.value;
                              setDraftProjects(updated);
                              markDirty();
                            }}
                            className="font-bold text-xs text-[#17212B] border-b border-[#96C2DB] bg-transparent flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setDraftProjects(prev => prev.filter((_, i) => i !== pIdx));
                              markDirty();
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Subtitle</label>
                            <input
                              type="text"
                              value={p.subtitle || ''}
                              onChange={(e) => {
                                const updated = [...draftProjects];
                                updated[pIdx].subtitle = e.target.value;
                                setDraftProjects(updated);
                                markDirty();
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">GitHub Repository URL</label>
                            <input
                              type="url"
                              value={p.githubUrl || 'https://github.com/Ashok26-bit'}
                              onChange={(e) => {
                                const updated = [...draftProjects];
                                updated[pIdx].githubUrl = e.target.value;
                                setDraftProjects(updated);
                                markDirty();
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Description</label>
                          <textarea
                            rows={2}
                            value={p.description || ''}
                            onChange={(e) => {
                              const updated = [...draftProjects];
                              updated[pIdx].description = e.target.value;
                              setDraftProjects(updated);
                              markDirty();
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Technologies (comma separated)</label>
                          <input
                            type="text"
                            value={(p.technologies || []).join(', ')}
                            onChange={(e) => {
                              const updated = [...draftProjects];
                              updated[pIdx].technologies = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                              setDraftProjects(updated);
                              markDirty();
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Experience */}
              {activeTab === 'experience' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#17212B]">Work & Project Experience</h3>
                      <p className="text-xs text-[#52616B]">Edit internships, role titles, organizations, and bullet point responsibilities.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {draftExperiences.map((exp, expIdx) => (
                      <div key={exp.id} className="border border-[#E5EDF1] rounded-2xl p-4 space-y-3 bg-[#F8FAFC]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Role Title</label>
                            <input
                              type="text"
                              value={exp.title || ''}
                              onChange={(e) => {
                                const updated = [...draftExperiences];
                                updated[expIdx].title = e.target.value;
                                setDraftExperiences(updated);
                                markDirty();
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Organization / Platform</label>
                            <input
                              type="text"
                              value={exp.organization || ''}
                              onChange={(e) => {
                                const updated = [...draftExperiences];
                                updated[expIdx].organization = e.target.value;
                                setDraftExperiences(updated);
                                markDirty();
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Duration / Period</label>
                            <input
                              type="text"
                              value={exp.period || ''}
                              onChange={(e) => {
                                const updated = [...draftExperiences];
                                updated[expIdx].period = e.target.value;
                                setDraftExperiences(updated);
                                markDirty();
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#52616B] mb-0.5">Credential ID</label>
                            <input
                              type="text"
                              value={exp.credentialId || ''}
                              onChange={(e) => {
                                const updated = [...draftExperiences];
                                updated[expIdx].credentialId = e.target.value;
                                setDraftExperiences(updated);
                                markDirty();
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#52616B] mb-1">Key Responsibilities & Outcomes</label>
                          <div className="space-y-1.5">
                            {(exp.bullets || []).map((b, bIdx) => (
                              <div key={bIdx} className="flex gap-2">
                                <input
                                  type="text"
                                  value={b}
                                  onChange={(e) => {
                                    const updated = [...draftExperiences];
                                    updated[expIdx].bullets[bIdx] = e.target.value;
                                    setDraftExperiences(updated);
                                    markDirty();
                                  }}
                                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] text-xs bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...draftExperiences];
                                    updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bIdx);
                                    setDraftExperiences(updated);
                                    markDirty();
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...draftExperiences];
                                updated[expIdx].bullets = [...(updated[expIdx].bullets || []), "New engineering accomplishment"];
                                setDraftExperiences(updated);
                                markDirty();
                              }}
                              className="text-[11px] font-bold text-[#3A637B] hover:underline flex items-center gap-1 pt-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Bullet Point</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Education */}
              {activeTab === 'education' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3">
                    <h3 className="text-sm font-bold text-[#17212B]">Education Background</h3>
                    <p className="text-xs text-[#52616B]">Degree, college institution, CGPA score, and highlights.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Degree</label>
                      <input
                        type="text"
                        value={draftEducation.degree || ''}
                        onChange={(e) => {
                          setDraftEducation(ed => ({ ...ed, degree: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Institution</label>
                      <input
                        type="text"
                        value={draftEducation.institution || ''}
                        onChange={(e) => {
                          setDraftEducation(ed => ({ ...ed, institution: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Grade / CGPA</label>
                      <input
                        type="text"
                        value={draftEducation.grade || ''}
                        onChange={(e) => {
                          setDraftEducation(ed => ({ ...ed, grade: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17212B] mb-1">Period</label>
                      <input
                        type="text"
                        value={draftEducation.period || ''}
                        onChange={(e) => {
                          setDraftEducation(ed => ({ ...ed, period: e.target.value }));
                          markDirty();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: Certifications */}
              {activeTab === 'certifications' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#17212B]">Certifications & Credentials</h3>
                      <p className="text-xs text-[#52616B]">Java, Spring Boot, Big Data, and Cybersecurity certificates.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCert = {
                          id: `cert-${Date.now()}`,
                          title: "New Professional Certificate",
                          issuer: "Issuing Organization",
                          issueDate: "2026",
                          credentialId: "CERT-ID",
                          verificationUrl: "",
                          skillsCovered: ["Java", "Full Stack"]
                        };
                        setDraftCertifications(prev => [newCert, ...prev]);
                        markDirty();
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#3A637B] text-white text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {draftCertifications.map((c, cIdx) => (
                      <div key={c.id} className="border border-[#E5EDF1] rounded-2xl p-4 space-y-2 bg-[#F8FAFC]">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={c.title}
                            onChange={(e) => {
                              const updated = [...draftCertifications];
                              updated[cIdx].title = e.target.value;
                              setDraftCertifications(updated);
                              markDirty();
                            }}
                            className="font-bold text-xs text-[#17212B] bg-transparent border-b border-[#96C2DB] flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setDraftCertifications(prev => prev.filter((_, i) => i !== cIdx));
                              markDirty();
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <input
                            type="text"
                            placeholder="Issuer (e.g. Great Learning)"
                            value={c.issuer || ''}
                            onChange={(e) => {
                              const updated = [...draftCertifications];
                              updated[cIdx].issuer = e.target.value;
                              setDraftCertifications(updated);
                              markDirty();
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] bg-white"
                          />
                          <input
                            type="text"
                            placeholder="Credential ID"
                            value={c.credentialId || ''}
                            onChange={(e) => {
                              const updated = [...draftCertifications];
                              updated[cIdx].credentialId = e.target.value;
                              setDraftCertifications(updated);
                              markDirty();
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-[#D3E2EB] bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: Traditional Art Gallery */}
              {activeTab === 'artworks' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3">
                    <h3 className="text-sm font-bold text-[#17212B]">Traditional Art & Creativity Gallery</h3>
                    <p className="text-xs text-[#52616B]">Upload artwork images to Cloudinary, curate titles, and store metadata in MongoDB Atlas.</p>
                  </div>

                  {/* Add new artwork panel */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF1] space-y-3">
                    <h4 className="text-xs font-bold text-[#17212B] flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-[#3A637B]" />
                      <span>Upload & Add New Artwork</span>
                    </h4>

                    {uploadError && (
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{uploadError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#52616B] mb-1">Artwork Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Traditional Charcoal Portrait Study"
                          value={newArtTitle}
                          onChange={(e) => setNewArtTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#52616B] mb-1">Category</label>
                        <select
                          value={newArtCategory}
                          onChange={(e) => setNewArtCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white"
                        >
                          <option value="Sketches">Sketches & Graphite</option>
                          <option value="Heritage">Devotional & Heritage</option>
                          <option value="Portraits">Portraits & Anatomy</option>
                          <option value="Creative">Creative Illustrations</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#52616B] mb-1">Artwork Image</label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="file"
                          ref={artFileInputRef}
                          onChange={handleArtworkImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={isUploadingImage}
                          onClick={() => artFileInputRef.current?.click()}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D3E2EB] hover:border-[#96C2DB] text-xs font-semibold text-[#17212B] shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#3A637B]" />
                          <span>{isUploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image to Cloudinary'}</span>
                        </button>
                        
                        <span className="text-xs text-[#52616B]">or enter URL:</span>
                        
                        <input
                          type="url"
                          placeholder="https://res.cloudinary.com/..."
                          value={newArtImageUrl}
                          onChange={(e) => setNewArtImageUrl(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#52616B] mb-1">Description / Artistic Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Medium used, line hatching techniques, artistic inspiration..."
                        value={newArtDescription}
                        onChange={(e) => setNewArtDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#D3E2EB] text-xs bg-white"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddArtworkToDraft}
                      className="px-4 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Artwork Gallery</span>
                    </button>
                  </div>

                  {/* Existing artworks */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#17212B]">Current Gallery Artworks ({draftArtworks.length})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {draftArtworks.map((art) => (
                        <div key={art.id} className="border border-[#E5EDF1] rounded-2xl p-3 flex gap-3 bg-[#F8FAFC]">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-20 h-20 rounded-xl object-cover border border-[#D3E2EB] shrink-0"
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <h5 className="text-xs font-bold text-[#17212B] truncate">{art.title}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5EDF1] text-[#3A637B] font-semibold">
                              {art.category}
                            </span>
                            <p className="text-[11px] text-[#52616B] line-clamp-2">{art.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveArtworkFromDraft(art.id)}
                            className="text-red-500 hover:text-red-700 p-1 self-start"
                            title="Delete artwork"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: Inbox */}
              {activeTab === 'inbox' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-[#E5EDF1] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#17212B]">Contact Messages Received</h3>
                      <p className="text-xs text-[#52616B]">Messages sent by recruiters and visitors via the contact form.</p>
                    </div>
                    <span className="text-xs font-bold text-[#3A637B]">
                      {contactMessages.length} total messages
                    </span>
                  </div>

                  {contactMessages.length === 0 ? (
                    <div className="p-8 text-center text-[#52616B] text-xs">
                      No contact messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {contactMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            msg.isRead
                              ? 'bg-[#F8FAFC] border-[#E5EDF1]'
                              : 'bg-white border-[#96C2DB] shadow-xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-[#17212B]">{msg.name}</h4>
                                {!msg.isRead && (
                                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#3A637B] text-[9px] font-bold">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#52616B]">{msg.email} • {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {!msg.isRead && (
                                <button
                                  onClick={() => markMessageRead(msg.id)}
                                  className="p-1.5 rounded-lg text-[#3A637B] hover:bg-[#E5EDF1] text-xs"
                                  title="Mark as read"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteContactMessage(msg.id)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 text-xs"
                                title="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-[#E5EDF1]/60">
                            <p className="text-xs font-semibold text-[#17212B] mb-1">{msg.subject}</p>
                            <p className="text-xs text-[#52616B] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Action Bar (Admin only) */}
        {isAdmin && (
          <div className="px-6 py-4 border-t border-[#E5EDF1] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              {hasUnsavedChanges ? (
                <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Unsaved edits in form (click Save Changes to commit to MongoDB)</span>
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Synced with MongoDB Atlas ({new Date(lastSaved).toLocaleTimeString()})</span>
                </span>
              ) : (
                <span className="text-[#52616B]">Connected to MongoDB Atlas</span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={resetDraftsToDatabase}
                disabled={saveStatus === 'saving'}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-[#D3E2EB] hover:bg-white text-xs font-semibold text-[#52616B] flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Saved</span>
              </button>

              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={saveStatus === 'saving'}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-soft transition-all duration-200 flex items-center justify-center gap-2 ${
                  saveStatus === 'saved'
                    ? 'bg-emerald-600'
                    : saveStatus === 'error'
                    ? 'bg-red-600'
                    : 'bg-[#3A637B] hover:bg-[#223E4F]'
                }`}
              >
                {saveStatus === 'saving' ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving to MongoDB Atlas...</span>
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved to Database!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
