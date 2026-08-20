import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Check } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// 1. PROJECT CRUD MODAL
export const ProjectCrudModal = ({ isOpen, onClose, editingProject }) => {
  const { addProject, editProject } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    problemSolved: '',
    keyContribution: '',
    category: 'Full Stack',
    technologies: '',
    githubUrl: 'https://github.com/Ashok26-bit',
    liveDemoUrl: '',
    featured: true
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || '',
        subtitle: editingProject.subtitle || '',
        description: editingProject.description || '',
        problemSolved: editingProject.problemSolved || '',
        keyContribution: editingProject.keyContribution || '',
        category: editingProject.category || 'Full Stack',
        technologies: editingProject.technologies?.join(', ') || '',
        githubUrl: editingProject.githubUrl || '',
        liveDemoUrl: editingProject.liveDemoUrl || '',
        featured: editingProject.featured ?? true
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        problemSolved: '',
        keyContribution: '',
        category: 'Full Stack',
        technologies: 'Java, Spring Boot, React, MongoDB',
        githubUrl: 'https://github.com/Ashok26-bit',
        liveDemoUrl: '',
        featured: true
      });
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingProject) {
      editProject({ ...payload, id: editingProject.id });
    } else {
      addProject(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#D3E2EB] shadow-dropdown w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#E5EDF1] flex items-center justify-between bg-[#F8FAFC]">
          <h3 className="text-base font-bold text-[#17212B]">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#52616B] hover:text-[#17212B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Smart Utility System"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Microservices Backend & Modern Dashboard"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Web & Enterprise">Web & Enterprise</option>
              <option value="Mobile Application">Mobile Application</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="Detailed description of the project architecture and features..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Problem Solved</label>
            <input
              type="text"
              value={formData.problemSolved}
              onChange={(e) => setFormData({ ...formData, problemSolved: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="What core challenge does this application address?"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Architectural Contribution</label>
            <input
              type="text"
              value={formData.keyContribution}
              onChange={(e) => setFormData({ ...formData, keyContribution: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="Your specific design contribution (e.g. Spring controllers, React hooks)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="Java, Spring Boot, React, MongoDB"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17212B] mb-1">GitHub Repo URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17212B] mb-1">Live Demo URL (Optional)</label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EDF1] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs font-bold text-[#52616B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft"
            >
              {editingProject ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. ARTWORK CRUD MODAL
export const ArtworkCrudModal = ({ isOpen, onClose }) => {
  const { addArtwork } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Sketches',
    description: '',
    imageUrl: ''
  });

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) return;

    addArtwork(formData);
    setFormData({ title: '', category: 'Sketches', description: '', imageUrl: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#D3E2EB] shadow-dropdown w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#E5EDF1] flex items-center justify-between bg-[#F8FAFC]">
          <h3 className="text-base font-bold text-[#17212B]">Upload Traditional Artwork</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#52616B] hover:text-[#17212B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Artwork Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Traditional Temple Charcoal Study"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
            >
              <option value="Sketches">Sketches</option>
              <option value="Heritage">Heritage</option>
              <option value="Portraits">Portraits</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="Medium, inspiration, drawing techniques used..."
            />
          </div>

          {/* Image Picker */}
          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Artwork Image *</label>
            <div className="space-y-3">
              <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#96C2DB] rounded-2xl bg-[#F8FAFC] hover:bg-[#E5EDF1]/60 cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-[#3A637B] mb-2" />
                <span className="text-xs font-bold text-[#17212B]">Select image from device</span>
                <span className="text-[10px] text-[#52616B]">Supports JPG, PNG, WEBP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </label>

              <div className="text-center text-[11px] text-[#52616B]">or enter image URL</div>

              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {formData.imageUrl && (
              <div className="mt-3 p-2 rounded-xl border border-[#D3E2EB] bg-white text-center">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-32 mx-auto object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E5EDF1] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs font-bold text-[#52616B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.imageUrl}
              className="px-5 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft disabled:opacity-50"
            >
              Upload to Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. SKILL CRUD MODAL
export const SkillCrudModal = ({ isOpen, onClose, editingSkillInfo }) => {
  const { addSkill, editSkill } = usePortfolio();

  const [category, setCategory] = useState('Programming Languages');
  const [skillName, setSkillName] = useState('');
  const [level, setLevel] = useState('Proficient');

  useEffect(() => {
    if (editingSkillInfo) {
      setCategory(editingSkillInfo.categoryTitle || 'Programming Languages');
      setSkillName(editingSkillInfo.skill?.name || '');
      setLevel(editingSkillInfo.skill?.level || 'Proficient');
    } else {
      setSkillName('');
      setLevel('Proficient');
    }
  }, [editingSkillInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    if (editingSkillInfo) {
      editSkill(category, {
        ...editingSkillInfo.skill,
        name: skillName.trim(),
        level: level.trim()
      });
    } else {
      addSkill(category, skillName.trim(), level.trim(), true);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#D3E2EB] shadow-dropdown w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#E5EDF1] flex items-center justify-between bg-[#F8FAFC]">
          <h3 className="text-base font-bold text-[#17212B]">
            {editingSkillInfo ? 'Edit Skill' : 'Add New Skill'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#52616B] hover:text-[#17212B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
            >
              <option value="Programming Languages">Programming Languages</option>
              <option value="Frameworks & Development">Frameworks & Development</option>
              <option value="Web Technologies">Web Technologies</option>
              <option value="Database & Cloud">Database & Cloud</option>
              <option value="Tools & Platforms">Tools & Platforms</option>
              <option value="Core Concepts">Core Concepts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Skill Name *</label>
            <input
              type="text"
              required
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Kotlin, Docker, GraphQL"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Proficiency Level / Description</label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Core & Advanced, Microservices"
            />
          </div>

          <div className="pt-4 border-t border-[#E5EDF1] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs font-bold text-[#52616B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft"
            >
              Save Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. EXPERIENCE CRUD MODAL
export const ExperienceCrudModal = ({ isOpen, onClose, editingExperience }) => {
  const { addExperience, editExperience } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    period: '',
    roleType: 'Internship',
    credentialId: '',
    technologies: '',
    bullets: ''
  });

  useEffect(() => {
    if (editingExperience) {
      setFormData({
        title: editingExperience.title || '',
        organization: editingExperience.organization || '',
        period: editingExperience.period || '',
        roleType: editingExperience.roleType || 'Internship',
        credentialId: editingExperience.credentialId || '',
        technologies: editingExperience.technologies?.join(', ') || '',
        bullets: editingExperience.bullets?.join('\n') || ''
      });
    } else {
      setFormData({
        title: '',
        organization: '',
        period: '2025 - 2026',
        roleType: 'Internship',
        credentialId: '',
        technologies: 'Java, Spring Boot, React, REST APIs',
        bullets: 'Developed scalable microservices.\nIntegrated responsive frontend UI components.'
      });
    }
  }, [editingExperience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.organization.trim()) return;

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      bullets: formData.bullets.split('\n').map(b => b.trim()).filter(Boolean)
    };

    if (editingExperience) {
      editExperience({ ...payload, id: editingExperience.id });
    } else {
      addExperience(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#D3E2EB] shadow-dropdown w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#E5EDF1] flex items-center justify-between bg-[#F8FAFC]">
          <h3 className="text-base font-bold text-[#17212B]">
            {editingExperience ? 'Edit Experience' : 'Add Experience Entry'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#52616B] hover:text-[#17212B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Role Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Web Development Intern"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17212B] mb-1">Organization / Company *</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
                placeholder="e.g. Corizo"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17212B] mb-1">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
                placeholder="e.g. Oct 2025 – Jan 2026"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Credential ID (Optional)</label>
            <input
              type="text"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Corizo Dice ID: CRZ136399"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Key Contributions (one per line)</label>
            <textarea
              rows={4}
              value={formData.bullets}
              onChange={(e) => setFormData({ ...formData, bullets: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="Engineered backend controllers...&#10;Built reactive UI..."
            />
          </div>

          <div className="pt-4 border-t border-[#E5EDF1] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs font-bold text-[#52616B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft"
            >
              Save Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. CERTIFICATION CRUD MODAL
export const CertificationCrudModal = ({ isOpen, onClose, editingCert }) => {
  const { addCertification, editCertification } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    verificationUrl: '',
    skillsCovered: ''
  });

  useEffect(() => {
    if (editingCert) {
      setFormData({
        title: editingCert.title || '',
        issuer: editingCert.issuer || '',
        issueDate: editingCert.issueDate || '',
        credentialId: editingCert.credentialId || '',
        verificationUrl: editingCert.verificationUrl || '',
        skillsCovered: editingCert.skillsCovered?.join(', ') || ''
      });
    } else {
      setFormData({
        title: '',
        issuer: 'Great Learning / Infosys / Corizo',
        issueDate: '2025',
        credentialId: '',
        verificationUrl: '',
        skillsCovered: 'Core Java, REST APIs, Security'
      });
    }
  }, [editingCert, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim()) return;

    const payload = {
      ...formData,
      skillsCovered: formData.skillsCovered.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingCert) {
      editCertification({ ...payload, id: editingCert.id });
    } else {
      addCertification(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#D3E2EB] shadow-dropdown w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#E5EDF1] flex items-center justify-between bg-[#F8FAFC]">
          <h3 className="text-base font-bold text-[#17212B]">
            {editingCert ? 'Edit Certification' : 'Add Certification'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#52616B] hover:text-[#17212B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Certification Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. Java Programming"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17212B] mb-1">Issuer *</label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
                placeholder="e.g. Great Learning"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17212B] mb-1">Issue Date</label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
                placeholder="e.g. Nov 2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Credential ID</label>
            <input
              type="text"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="e.g. ZMQBBOET"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Verification URL (Optional)</label>
            <input
              type="url"
              value={formData.verificationUrl}
              onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17212B] mb-1">Skills Covered (comma separated)</label>
            <input
              type="text"
              value={formData.skillsCovered}
              onChange={(e) => setFormData({ ...formData, skillsCovered: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#96C2DB]"
              placeholder="Core Java, OOPs, Collections"
            />
          </div>

          <div className="pt-4 border-t border-[#E5EDF1] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#D3E2EB] text-xs font-bold text-[#52616B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3A637B] hover:bg-[#223E4F] text-white text-xs font-bold shadow-soft"
            >
              Save Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
