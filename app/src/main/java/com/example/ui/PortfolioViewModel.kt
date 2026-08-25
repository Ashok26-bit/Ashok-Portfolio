package com.example.ui

import android.app.Application
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.AppDatabase
import com.example.data.model.Artwork
import com.example.data.model.CertificationItem
import com.example.data.model.ContactMessage
import com.example.data.model.EducationItem
import com.example.data.model.ExperienceItem
import com.example.data.model.ProjectItem
import com.example.data.model.SkillCategory
import com.example.data.model.SkillItem
import com.example.data.repository.PortfolioRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class PortfolioViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: PortfolioRepository
    private val prefs = application.getSharedPreferences("portfolio_prefs", Context.MODE_PRIVATE)

    // --- PROFILE PHOTO STATE ---
    private val _profileImageUri = MutableStateFlow<String?>(prefs.getString("profile_image_uri", null))
    val profileImageUri: StateFlow<String?> = _profileImageUri.asStateFlow()

    // --- AUTHENTICATION STATE ---
    private val _isAdminLoggedIn = MutableStateFlow(false)
    val isAdminLoggedIn: StateFlow<Boolean> = _isAdminLoggedIn.asStateFlow()

    private val _loginEmail = MutableStateFlow("")
    val loginEmail: StateFlow<String> = _loginEmail.asStateFlow()

    private val _loginPassword = MutableStateFlow("")
    val loginPassword: StateFlow<String> = _loginPassword.asStateFlow()

    private val _loginError = MutableStateFlow<String?>(null)
    val loginError: StateFlow<String?> = _loginError.asStateFlow()

    // --- VIEW / NAVIGATION STATE ---
    private val _currentScreen = MutableStateFlow("portfolio") // "portfolio" or "settings"
    val currentScreen: StateFlow<String> = _currentScreen.asStateFlow()

    // --- ARTWORK GALLERY STATE ---
    private val _selectedArtCategory = MutableStateFlow("All")
    val selectedArtCategory: StateFlow<String> = _selectedArtCategory.asStateFlow()

    private val _lightboxArtwork = MutableStateFlow<Artwork?>(null)
    val lightboxArtwork: StateFlow<Artwork?> = _lightboxArtwork.asStateFlow()

    private val _showAddArtworkDialog = MutableStateFlow(false)
    val showAddArtworkDialog: StateFlow<Boolean> = _showAddArtworkDialog.asStateFlow()

    // --- CRUD DIALOG STATES ---
    private val _showAddProjectDialog = MutableStateFlow(false)
    val showAddProjectDialog: StateFlow<Boolean> = _showAddProjectDialog.asStateFlow()
    private val _editingProject = MutableStateFlow<ProjectItem?>(null)
    val editingProject: StateFlow<ProjectItem?> = _editingProject.asStateFlow()

    private val _showAddSkillDialog = MutableStateFlow(false)
    val showAddSkillDialog: StateFlow<Boolean> = _showAddSkillDialog.asStateFlow()
    private val _editingSkill = MutableStateFlow<SkillItem?>(null)
    val editingSkill: StateFlow<SkillItem?> = _editingSkill.asStateFlow()

    private val _showAddExperienceDialog = MutableStateFlow(false)
    val showAddExperienceDialog: StateFlow<Boolean> = _showAddExperienceDialog.asStateFlow()
    private val _editingExperience = MutableStateFlow<ExperienceItem?>(null)
    val editingExperience: StateFlow<ExperienceItem?> = _editingExperience.asStateFlow()

    private val _showAddCertDialog = MutableStateFlow(false)
    val showAddCertDialog: StateFlow<Boolean> = _showAddCertDialog.asStateFlow()
    private val _editingCert = MutableStateFlow<CertificationItem?>(null)
    val editingCert: StateFlow<CertificationItem?> = _editingCert.asStateFlow()

    // --- CONTACT FORM STATE ---
    private val _contactName = MutableStateFlow("")
    val contactName: StateFlow<String> = _contactName.asStateFlow()

    private val _contactEmail = MutableStateFlow("")
    val contactEmail: StateFlow<String> = _contactEmail.asStateFlow()

    private val _contactSubject = MutableStateFlow("")
    val contactSubject: StateFlow<String> = _contactSubject.asStateFlow()

    private val _contactMessage = MutableStateFlow("")
    val contactMessage: StateFlow<String> = _contactMessage.asStateFlow()

    private val _contactFormError = MutableStateFlow<String?>(null)
    val contactFormError: StateFlow<String?> = _contactFormError.asStateFlow()

    private val _contactSuccessDialog = MutableStateFlow(false)
    val contactSuccessDialog: StateFlow<Boolean> = _contactSuccessDialog.asStateFlow()

    // --- REPOSITORY FLOWS ---
    val projects: StateFlow<List<ProjectItem>>
    val skillCategories: StateFlow<List<SkillCategory>>
    val experiences: StateFlow<List<ExperienceItem>>
    val certifications: StateFlow<List<CertificationItem>>
    val contactMessages: StateFlow<List<ContactMessage>>
    val unreadMessageCount: StateFlow<Int>
    val filteredArtworks: StateFlow<List<Artwork>>
    val education: EducationItem

    init {
        val database = AppDatabase.getDatabase(application)
        repository = PortfolioRepository(database.portfolioDao())
        education = repository.getEducation()

        viewModelScope.launch {
            repository.initializeDatabaseIfEmpty()
        }

        projects = repository.projectsFlow.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )

        skillCategories = repository.skillsFlow.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )

        experiences = repository.experiencesFlow.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )

        certifications = repository.certificationsFlow.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )

        contactMessages = repository.contactMessagesFlow.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )

        unreadMessageCount = repository.unreadMessageCountFlow.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            0
        )

        filteredArtworks = combine(repository.artworksFlow, _selectedArtCategory) { artworks, category ->
            if (category == "All") {
                artworks
            } else {
                artworks.filter { it.category.equals(category, ignoreCase = true) }
            }
        }.stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )
    }

    // --- AUTHENTICATION METHODS ---
    fun onLoginEmailChange(email: String) {
        _loginEmail.value = email
        _loginError.value = null
    }

    fun onLoginPasswordChange(password: String) {
        _loginPassword.value = password
        _loginError.value = null
    }

    fun login() {
        val email = _loginEmail.value.trim()
        val password = _loginPassword.value.trim()

        if (email == "ashokk.profile.in@gmail.com" && password == "2006@ashok") {
            _isAdminLoggedIn.value = true
            _loginError.value = null
            Toast.makeText(getApplication(), "Welcome back, Ashok! Admin Mode Unlocked.", Toast.LENGTH_SHORT).show()
        } else {
            _loginError.value = "Invalid credentials. Please enter the correct email and password."
        }
    }

    fun logout() {
        _isAdminLoggedIn.value = false
        _loginPassword.value = ""
        Toast.makeText(getApplication(), "Logged out. Switched to Guest Viewer Mode.", Toast.LENGTH_SHORT).show()
    }

    fun navigateTo(screen: String) {
        _currentScreen.value = screen
    }

    // --- PROFILE PHOTO METHODS ---
    fun updateProfileImage(uriString: String?) {
        if (!_isAdminLoggedIn.value) {
            Toast.makeText(getApplication(), "Please log in as Admin to change profile photo.", Toast.LENGTH_SHORT).show()
            return
        }
        _profileImageUri.value = uriString
        prefs.edit().putString("profile_image_uri", uriString).apply()
        Toast.makeText(getApplication(), "Profile photo updated successfully!", Toast.LENGTH_SHORT).show()
    }

    fun resetProfileImage() {
        if (!_isAdminLoggedIn.value) {
            Toast.makeText(getApplication(), "Please log in as Admin to change profile photo.", Toast.LENGTH_SHORT).show()
            return
        }
        _profileImageUri.value = null
        prefs.edit().remove("profile_image_uri").apply()
        Toast.makeText(getApplication(), "Profile photo reset to original portrait.", Toast.LENGTH_SHORT).show()
    }

    // --- ARTWORK METHODS ---
    fun setArtCategory(category: String) {
        _selectedArtCategory.value = category
    }

    fun openArtworkLightbox(artwork: Artwork) {
        _lightboxArtwork.value = artwork
    }

    fun closeArtworkLightbox() {
        _lightboxArtwork.value = null
    }

    fun openAddArtworkDialog() {
        if (!_isAdminLoggedIn.value) {
            Toast.makeText(getApplication(), "Please log in as Admin to add artwork.", Toast.LENGTH_SHORT).show()
            _currentScreen.value = "settings"
            return
        }
        _showAddArtworkDialog.value = true
    }

    fun closeAddArtworkDialog() {
        _showAddArtworkDialog.value = false
    }

    fun addArtwork(title: String, description: String, category: String, imageUri: String?) {
        viewModelScope.launch {
            val dateFormat = SimpleDateFormat("MMM yyyy", Locale.getDefault())
            val dateStr = dateFormat.format(Date())
            val newArt = Artwork(
                title = title.trim(),
                description = description.trim(),
                category = category.trim(),
                dateAdded = dateStr,
                imageUri = imageUri,
                drawableRes = null,
                isSample = false
            )
            repository.addArtwork(newArt)
            _showAddArtworkDialog.value = false
            Toast.makeText(getApplication(), "Artwork added successfully!", Toast.LENGTH_SHORT).show()
        }
    }

    fun deleteArtwork(artworkId: Long) {
        if (!_isAdminLoggedIn.value) {
            Toast.makeText(getApplication(), "Only Ashok K (Admin) can delete artwork.", Toast.LENGTH_SHORT).show()
            return
        }
        viewModelScope.launch {
            repository.deleteArtwork(artworkId)
            _lightboxArtwork.value = null
            Toast.makeText(getApplication(), "Artwork deleted.", Toast.LENGTH_SHORT).show()
        }
    }

    // --- PROJECTS CRUD ---
    fun openAddProjectDialog(project: ProjectItem? = null) {
        _editingProject.value = project
        _showAddProjectDialog.value = true
    }

    fun closeProjectDialog() {
        _showAddProjectDialog.value = false
        _editingProject.value = null
    }

    fun saveProject(
        id: Long,
        title: String,
        subtitle: String,
        description: String,
        problemSolved: String,
        keyContribution: String,
        technologies: List<String>,
        githubUrl: String?,
        isFeatured: Boolean
    ) {
        viewModelScope.launch {
            val project = ProjectItem(
                id = id,
                title = title.trim(),
                subtitle = subtitle.trim(),
                description = description.trim(),
                problemSolved = problemSolved.trim(),
                keyContribution = keyContribution.trim(),
                technologies = technologies,
                githubUrl = githubUrl?.trim(),
                liveDemoUrl = null,
                isFeatured = isFeatured
            )
            if (id == 0L) {
                repository.addProject(project)
                Toast.makeText(getApplication(), "Project created!", Toast.LENGTH_SHORT).show()
            } else {
                repository.updateProject(project)
                Toast.makeText(getApplication(), "Project updated!", Toast.LENGTH_SHORT).show()
            }
            closeProjectDialog()
        }
    }

    fun deleteProject(id: Long) {
        if (!_isAdminLoggedIn.value) return
        viewModelScope.launch {
            repository.deleteProject(id)
            Toast.makeText(getApplication(), "Project removed.", Toast.LENGTH_SHORT).show()
        }
    }

    // --- SKILLS CRUD ---
    fun openAddSkillDialog(skill: SkillItem? = null) {
        _editingSkill.value = skill
        _showAddSkillDialog.value = true
    }

    fun closeSkillDialog() {
        _showAddSkillDialog.value = false
        _editingSkill.value = null
    }

    fun saveSkill(id: Long, categoryTitle: String, name: String, level: String, isPrimary: Boolean) {
        viewModelScope.launch {
            val skill = SkillItem(
                id = id,
                categoryTitle = categoryTitle.trim(),
                name = name.trim(),
                level = level.trim(),
                isPrimary = isPrimary
            )
            if (id == 0L) {
                repository.addSkill(skill)
                Toast.makeText(getApplication(), "Skill added!", Toast.LENGTH_SHORT).show()
            } else {
                repository.updateSkill(skill)
                Toast.makeText(getApplication(), "Skill updated!", Toast.LENGTH_SHORT).show()
            }
            closeSkillDialog()
        }
    }

    fun deleteSkill(id: Long) {
        if (!_isAdminLoggedIn.value) return
        viewModelScope.launch {
            repository.deleteSkill(id)
            Toast.makeText(getApplication(), "Skill removed.", Toast.LENGTH_SHORT).show()
        }
    }

    // --- EXPERIENCE CRUD ---
    fun openAddExperienceDialog(exp: ExperienceItem? = null) {
        _editingExperience.value = exp
        _showAddExperienceDialog.value = true
    }

    fun closeExperienceDialog() {
        _showAddExperienceDialog.value = false
        _editingExperience.value = null
    }

    fun saveExperience(
        id: Long,
        title: String,
        organization: String,
        period: String,
        roleType: String,
        bullets: List<String>,
        technologies: List<String>,
        credentialId: String?
    ) {
        viewModelScope.launch {
            val item = ExperienceItem(
                id = id,
                title = title.trim(),
                organization = organization.trim(),
                period = period.trim(),
                roleType = roleType.trim(),
                bullets = bullets,
                technologies = technologies,
                credentialId = credentialId?.trim()
            )
            if (id == 0L) {
                repository.addExperience(item)
                Toast.makeText(getApplication(), "Experience added!", Toast.LENGTH_SHORT).show()
            } else {
                repository.updateExperience(item)
                Toast.makeText(getApplication(), "Experience updated!", Toast.LENGTH_SHORT).show()
            }
            closeExperienceDialog()
        }
    }

    fun deleteExperience(id: Long) {
        if (!_isAdminLoggedIn.value) return
        viewModelScope.launch {
            repository.deleteExperience(id)
            Toast.makeText(getApplication(), "Experience removed.", Toast.LENGTH_SHORT).show()
        }
    }

    // --- CERTIFICATIONS CRUD ---
    fun openAddCertDialog(cert: CertificationItem? = null) {
        _editingCert.value = cert
        _showAddCertDialog.value = true
    }

    fun closeCertDialog() {
        _showAddCertDialog.value = false
        _editingCert.value = null
    }

    fun saveCertification(
        id: Long,
        title: String,
        issuer: String,
        issueDate: String,
        credentialId: String?,
        verificationUrl: String?,
        skillsCovered: List<String>
    ) {
        viewModelScope.launch {
            val item = CertificationItem(
                id = id,
                title = title.trim(),
                issuer = issuer.trim(),
                issueDate = issueDate.trim(),
                credentialId = credentialId?.trim(),
                verificationUrl = verificationUrl?.trim(),
                skillsCovered = skillsCovered
            )
            if (id == 0L) {
                repository.addCertification(item)
                Toast.makeText(getApplication(), "Certification added!", Toast.LENGTH_SHORT).show()
            } else {
                repository.updateCertification(item)
                Toast.makeText(getApplication(), "Certification updated!", Toast.LENGTH_SHORT).show()
            }
            closeCertDialog()
        }
    }

    fun deleteCertification(id: Long) {
        if (!_isAdminLoggedIn.value) return
        viewModelScope.launch {
            repository.deleteCertification(id)
            Toast.makeText(getApplication(), "Certification removed.", Toast.LENGTH_SHORT).show()
        }
    }

    // --- CONTACT MESSAGES INBOX ---
    fun markMessageAsRead(id: Long) {
        viewModelScope.launch {
            repository.markMessageAsRead(id)
        }
    }

    fun deleteContactMessage(id: Long) {
        viewModelScope.launch {
            repository.deleteContactMessage(id)
            Toast.makeText(getApplication(), "Message deleted.", Toast.LENGTH_SHORT).show()
        }
    }

    // --- CONTACT FORM STATE & VALIDATION ---
    fun onContactNameChange(name: String) {
        _contactName.value = name
        if (_contactFormError.value != null) _contactFormError.value = null
    }

    fun onContactEmailChange(email: String) {
        _contactEmail.value = email
        if (_contactFormError.value != null) _contactFormError.value = null
    }

    fun onContactSubjectChange(subject: String) {
        _contactSubject.value = subject
        if (_contactFormError.value != null) _contactFormError.value = null
    }

    fun onContactMessageChange(message: String) {
        _contactMessage.value = message
        if (_contactFormError.value != null) _contactFormError.value = null
    }

    fun validateAndSubmitContactForm(): Boolean {
        val name = _contactName.value.trim()
        val email = _contactEmail.value.trim()
        val subject = _contactSubject.value.trim()
        val message = _contactMessage.value.trim()

        val emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$".toRegex()

        if (name.isEmpty()) {
            _contactFormError.value = "Please enter your full name."
            return false
        }
        if (name.length < 2) {
            _contactFormError.value = "Name must be at least 2 characters long."
            return false
        }
        if (email.isEmpty()) {
            _contactFormError.value = "Please enter your email address."
            return false
        }
        if (!emailRegex.matches(email)) {
            _contactFormError.value = "Please enter a valid email address (e.g. name@example.com)."
            return false
        }
        if (subject.isEmpty()) {
            _contactFormError.value = "Please enter a message subject."
            return false
        }
        if (subject.length < 3) {
            _contactFormError.value = "Subject must be at least 3 characters long."
            return false
        }
        if (message.isEmpty()) {
            _contactFormError.value = "Please write your message."
            return false
        }
        if (message.length < 10) {
            _contactFormError.value = "Message must be at least 10 characters long."
            return false
        }

        // Valid form -> save to local database for admin inbox
        viewModelScope.launch {
            val sdf = SimpleDateFormat("MMM dd, yyyy 'at' hh:mm a", Locale.getDefault())
            val timestamp = sdf.format(Date())
            repository.saveContactMessage(name, email, subject, message, timestamp)
        }

        _contactFormError.value = null
        _contactSuccessDialog.value = true
        return true
    }

    fun dismissContactSuccessDialog() {
        _contactSuccessDialog.value = false
        _contactName.value = ""
        _contactEmail.value = ""
        _contactSubject.value = ""
        _contactMessage.value = ""
    }

    // --- SYSTEM INTENTS & HELPERS ---
    fun openEmailIntent(context: Context, subject: String = "Inquiry from Portfolio Website", body: String = "") {
        try {
            val intent = Intent(Intent.ACTION_SENDTO).apply {
                data = Uri.parse("mailto:ashokk.profile.in@gmail.com")
                putExtra(Intent.EXTRA_SUBJECT, subject)
                putExtra(Intent.EXTRA_TEXT, body)
                addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT)
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            copyToClipboard("Email", "ashokk.profile.in@gmail.com")
            Toast.makeText(context, "Email copied: ashokk.profile.in@gmail.com", Toast.LENGTH_SHORT).show()
        }
    }

    fun openUrl(context: Context, url: String) {
        try {
            val validUrl = if (!url.startsWith("http://") && !url.startsWith("https://")) {
                "https://$url"
            } else {
                url
            }
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(validUrl)).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT)
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            copyToClipboard("Link", url)
            Toast.makeText(context, "Link copied: $url", Toast.LENGTH_SHORT).show()
        }
    }

    fun copyToClipboard(label: String, text: String) {
        val clipboard = getApplication<Application>().getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText(label, text)
        clipboard.setPrimaryClip(clip)
        Toast.makeText(getApplication(), "$label copied to clipboard", Toast.LENGTH_SHORT).show()
    }
}
