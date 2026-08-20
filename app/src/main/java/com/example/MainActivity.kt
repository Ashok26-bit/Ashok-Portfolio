package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.PortfolioViewModel
import com.example.ui.components.AboutSection
import com.example.ui.components.AddArtworkDialog
import com.example.ui.components.AdditionalInfoSection
import com.example.ui.components.ArtGallerySection
import com.example.ui.components.CertificationCrudDialog
import com.example.ui.components.CertificationsSection
import com.example.ui.components.ContactSection
import com.example.ui.components.EducationSection
import com.example.ui.components.ExperienceCrudDialog
import com.example.ui.components.ExperienceSection
import com.example.ui.components.FooterSection
import com.example.ui.components.HeroSection
import com.example.ui.components.LightboxModal
import com.example.ui.components.ProjectCrudDialog
import com.example.ui.components.ProjectsSection
import com.example.ui.components.SettingsScreen
import com.example.ui.components.SkillCrudDialog
import com.example.ui.components.SkillsSection
import com.example.ui.components.TopNavBar
import com.example.ui.theme.BackgroundWhite
import com.example.ui.theme.DarkText
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.PrimaryBlueGreyDark
import com.example.ui.theme.White
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private val viewModel: PortfolioViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                PortfolioApp(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun PortfolioApp(
    viewModel: PortfolioViewModel,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    val listState = rememberLazyListState()

    val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()
    val isAdminLoggedIn by viewModel.isAdminLoggedIn.collectAsStateWithLifecycle()
    val loginEmail by viewModel.loginEmail.collectAsStateWithLifecycle()
    val loginPassword by viewModel.loginPassword.collectAsStateWithLifecycle()
    val loginError by viewModel.loginError.collectAsStateWithLifecycle()
    val profileImageUri by viewModel.profileImageUri.collectAsStateWithLifecycle()

    val filteredArtworks by viewModel.filteredArtworks.collectAsStateWithLifecycle()
    val selectedCategory by viewModel.selectedArtCategory.collectAsStateWithLifecycle()
    val lightboxArtwork by viewModel.lightboxArtwork.collectAsStateWithLifecycle()
    val showAddArtworkDialog by viewModel.showAddArtworkDialog.collectAsStateWithLifecycle()

    val projects by viewModel.projects.collectAsStateWithLifecycle()
    val skillCategories by viewModel.skillCategories.collectAsStateWithLifecycle()
    val experiences by viewModel.experiences.collectAsStateWithLifecycle()
    val certifications by viewModel.certifications.collectAsStateWithLifecycle()
    val contactMessages by viewModel.contactMessages.collectAsStateWithLifecycle()
    val unreadMessageCount by viewModel.unreadMessageCount.collectAsStateWithLifecycle()

    val showAddProjectDialog by viewModel.showAddProjectDialog.collectAsStateWithLifecycle()
    val editingProject by viewModel.editingProject.collectAsStateWithLifecycle()

    val showAddSkillDialog by viewModel.showAddSkillDialog.collectAsStateWithLifecycle()
    val editingSkill by viewModel.editingSkill.collectAsStateWithLifecycle()

    val showAddExperienceDialog by viewModel.showAddExperienceDialog.collectAsStateWithLifecycle()
    val editingExperience by viewModel.editingExperience.collectAsStateWithLifecycle()

    val showAddCertDialog by viewModel.showAddCertDialog.collectAsStateWithLifecycle()
    val editingCert by viewModel.editingCert.collectAsStateWithLifecycle()

    val contactName by viewModel.contactName.collectAsStateWithLifecycle()
    val contactEmail by viewModel.contactEmail.collectAsStateWithLifecycle()
    val contactSubject by viewModel.contactSubject.collectAsStateWithLifecycle()
    val contactMessage by viewModel.contactMessage.collectAsStateWithLifecycle()
    val contactFormError by viewModel.contactFormError.collectAsStateWithLifecycle()
    val contactSuccessDialog by viewModel.contactSuccessDialog.collectAsStateWithLifecycle()

    val activeSectionIndex by remember {
        derivedStateOf {
            listState.firstVisibleItemIndex
        }
    }

    val showScrollToTop by remember {
        derivedStateOf {
            listState.firstVisibleItemIndex > 1
        }
    }

    // Handle back button on settings screen
    BackHandler(enabled = currentScreen == "settings") {
        viewModel.navigateTo("portfolio")
    }

    // --- CRUD DIALOGS ---

    // 1. Lightbox modal if active
    if (lightboxArtwork != null) {
        LightboxModal(
            artwork = lightboxArtwork!!,
            isAdmin = isAdminLoggedIn,
            onDismiss = { viewModel.closeArtworkLightbox() },
            onDelete = { id -> viewModel.deleteArtwork(id) }
        )
    }

    // 2. Add Artwork Dialog if active
    if (showAddArtworkDialog) {
        AddArtworkDialog(
            onDismiss = { viewModel.closeAddArtworkDialog() },
            onAddArtwork = { title, desc, cat, uri ->
                viewModel.addArtwork(title, desc, cat, uri)
            }
        )
    }

    // 3. Project CRUD Dialog
    if (showAddProjectDialog) {
        ProjectCrudDialog(
            project = editingProject,
            onDismiss = { viewModel.closeProjectDialog() },
            onSave = { id, title, subtitle, desc, prob, keyCont, tech, git, feat ->
                viewModel.saveProject(id, title, subtitle, desc, prob, keyCont, tech, git, feat)
            }
        )
    }

    // 4. Skill CRUD Dialog
    if (showAddSkillDialog) {
        SkillCrudDialog(
            skill = editingSkill,
            onDismiss = { viewModel.closeSkillDialog() },
            onSave = { id, cat, name, level, isPri ->
                viewModel.saveSkill(id, cat, name, level, isPri)
            }
        )
    }

    // 5. Experience CRUD Dialog
    if (showAddExperienceDialog) {
        ExperienceCrudDialog(
            experience = editingExperience,
            onDismiss = { viewModel.closeExperienceDialog() },
            onSave = { id, title, org, period, roleType, bullets, tech, credId ->
                viewModel.saveExperience(id, title, org, period, roleType, bullets, tech, credId)
            }
        )
    }

    // 6. Certification CRUD Dialog
    if (showAddCertDialog) {
        CertificationCrudDialog(
            cert = editingCert,
            onDismiss = { viewModel.closeCertDialog() },
            onSave = { id, title, issuer, date, credId, url, skills ->
                viewModel.saveCertification(id, title, issuer, date, credId, url, skills)
            }
        )
    }

    // --- MAIN SCREEN RENDERING ---
    if (currentScreen == "settings") {
        SettingsScreen(
            isAdminLoggedIn = isAdminLoggedIn,
            loginEmail = loginEmail,
            loginPassword = loginPassword,
            loginError = loginError,
            unreadCount = unreadMessageCount,
            contactMessages = contactMessages,
            projects = projects,
            skillCategories = skillCategories,
            experiences = experiences,
            certifications = certifications,
            artworks = filteredArtworks,
            profileImageUri = profileImageUri,
            onUpdateProfileImage = { viewModel.updateProfileImage(it) },
            onResetProfileImage = { viewModel.resetProfileImage() },
            onLoginEmailChange = { viewModel.onLoginEmailChange(it) },
            onLoginPasswordChange = { viewModel.onLoginPasswordChange(it) },
            onLoginSubmit = { viewModel.login() },
            onLogout = { viewModel.logout() },
            onBackToPortfolio = { viewModel.navigateTo("portfolio") },
            onMarkMessageRead = { viewModel.markMessageAsRead(it) },
            onDeleteMessage = { viewModel.deleteContactMessage(it) },
            onAddProjectClick = { viewModel.openAddProjectDialog(null) },
            onEditProjectClick = { viewModel.openAddProjectDialog(it) },
            onDeleteProjectClick = { viewModel.deleteProject(it) },
            onAddSkillClick = { viewModel.openAddSkillDialog(null) },
            onEditSkillClick = { viewModel.openAddSkillDialog(it) },
            onDeleteSkillClick = { viewModel.deleteSkill(it) },
            onAddExperienceClick = { viewModel.openAddExperienceDialog(null) },
            onEditExperienceClick = { viewModel.openAddExperienceDialog(it) },
            onDeleteExperienceClick = { viewModel.deleteExperience(it) },
            onAddCertClick = { viewModel.openAddCertDialog(null) },
            onEditCertClick = { viewModel.openAddCertDialog(it) },
            onDeleteCertClick = { viewModel.deleteCertification(it) },
            onAddArtworkClick = { viewModel.openAddArtworkDialog() },
            onDeleteArtworkClick = { viewModel.deleteArtwork(it) },
            modifier = Modifier.statusBarsPadding()
        )
    } else {
        Scaffold(
            modifier = modifier
                .fillMaxSize()
                .background(BackgroundWhite),
            topBar = {
                TopNavBar(
                    activeSectionIndex = activeSectionIndex,
                    isAdminLoggedIn = isAdminLoggedIn,
                    unreadMessageCount = unreadMessageCount,
                    onSectionClick = { targetIndex ->
                        coroutineScope.launch {
                            listState.animateScrollToItem(targetIndex)
                        }
                    },
                    onEmailClick = {
                        viewModel.openEmailIntent(context)
                    },
                    onSettingsClick = {
                        viewModel.navigateTo("settings")
                    },
                    modifier = Modifier.statusBarsPadding()
                )
            },
            floatingActionButton = {
                AnimatedVisibility(
                    visible = showScrollToTop,
                    enter = fadeIn(),
                    exit = fadeOut()
                ) {
                    FloatingActionButton(
                        onClick = {
                            coroutineScope.launch {
                                listState.animateScrollToItem(0)
                            }
                        },
                        containerColor = PrimaryBlueGreyDark,
                        contentColor = White,
                        elevation = FloatingActionButtonDefaults.elevation(4.dp),
                        modifier = Modifier
                            .navigationBarsPadding()
                            .testTag("fab_scroll_top")
                    ) {
                        Icon(
                            imageVector = Icons.Default.KeyboardArrowUp,
                            contentDescription = "Scroll to top",
                            tint = White
                        )
                    }
                }
            }
        ) { innerPadding ->
            LazyColumn(
                state = listState,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .background(BackgroundWhite)
            ) {
                // Index 0: Hero Section
                item(key = "hero") {
                    HeroSection(
                        profileImageUri = profileImageUri,
                        onViewWorkClick = {
                            coroutineScope.launch {
                                listState.animateScrollToItem(4) // Scroll to Projects
                            }
                        },
                        onContactClick = {
                            coroutineScope.launch {
                                listState.animateScrollToItem(8) // Scroll to Contact
                            }
                        },
                        onEmailClick = {
                            viewModel.openEmailIntent(context)
                        },
                        onLinkedInClick = {
                            viewModel.openUrl(context, "https://linkedin.com/in/ashok-k-cse")
                        },
                        onGitHubClick = {
                            viewModel.openUrl(context, "https://github.com/Ashok-K-27")
                        }
                    )
                }

                // Index 1: About Section
                item(key = "about") {
                    AboutSection()
                }

                // Index 2: Technical Skills
                item(key = "skills") {
                    SkillsSection(categories = skillCategories)
                }

                // Index 3: Experience & Internships
                item(key = "experience") {
                    ExperienceSection(experiences = experiences)
                }

                // Index 4: Featured Projects
                item(key = "projects") {
                    ProjectsSection(
                        projects = projects,
                        onProjectLinkClick = { url ->
                            viewModel.copyToClipboard("Project link", url)
                        }
                    )
                }

                // Index 5: Traditional Art & Creativity
                item(key = "art") {
                    ArtGallerySection(
                        artworks = filteredArtworks,
                        selectedCategory = selectedCategory,
                        onCategorySelect = { cat -> viewModel.setArtCategory(cat) },
                        onAddArtworkClick = { viewModel.openAddArtworkDialog() },
                        onArtworkClick = { art -> viewModel.openArtworkLightbox(art) }
                    )
                }

                // Index 6: Education
                item(key = "education") {
                    EducationSection(education = viewModel.education)
                }

                // Index 7: Certifications & Credentials
                item(key = "certifications") {
                    CertificationsSection(
                        certifications = certifications,
                        onVerifyClick = { url -> viewModel.openUrl(context, url) }
                    )
                }

                // Index 8: Additional Info (Languages/Interests) & Contact Section
                item(key = "contact") {
                    Column {
                        AdditionalInfoSection()

                        ContactSection(
                            name = contactName,
                            email = contactEmail,
                            subject = contactSubject,
                            message = contactMessage,
                            formError = contactFormError,
                            showSuccessDialog = contactSuccessDialog,
                            onNameChange = { viewModel.onContactNameChange(it) },
                            onEmailChange = { viewModel.onContactEmailChange(it) },
                            onSubjectChange = { viewModel.onContactSubjectChange(it) },
                            onMessageChange = { viewModel.onContactMessageChange(it) },
                            onSubmitForm = { viewModel.validateAndSubmitContactForm() },
                            onDismissSuccessDialog = { viewModel.dismissContactSuccessDialog() },
                            onCopyEmail = { viewModel.copyToClipboard("Email", "ashokk.cse.27@gmail.com") },
                            onEmailAppLaunch = {
                                viewModel.openEmailIntent(
                                    context = context,
                                    subject = contactSubject.ifBlank { "Inquiry for Ashok K" },
                                    body = contactMessage
                                )
                            },
                            onLinkedInClick = {
                                viewModel.openUrl(context, "https://linkedin.com/in/ashok-k-cse")
                            },
                            onGitHubClick = {
                                viewModel.openUrl(context, "https://github.com/Ashok-K-27")
                            }
                        )
                    }
                }

                // Index 9: Footer
                item(key = "footer") {
                    FooterSection(
                        onLinkedInClick = { viewModel.openUrl(context, "https://linkedin.com/in/ashok-k-cse") },
                        onGitHubClick = { viewModel.openUrl(context, "https://github.com/Ashok-K-27") },
                        onEmailClick = { viewModel.openEmailIntent(context) }
                    )
                }
            }
        }
    }
}
