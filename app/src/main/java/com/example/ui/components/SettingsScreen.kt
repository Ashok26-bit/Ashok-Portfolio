package com.example.ui.components

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AddPhotoAlternate
import androidx.compose.material.icons.filled.AdminPanelSettings
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.LockOpen
import androidx.compose.material.icons.filled.Mail
import androidx.compose.material.icons.filled.MarkEmailRead
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.R
import com.example.data.model.Artwork
import com.example.data.model.CertificationItem
import com.example.data.model.ContactMessage
import com.example.data.model.ExperienceItem
import com.example.data.model.ProjectItem
import com.example.data.model.SkillCategory
import com.example.data.model.SkillItem
import com.example.ui.theme.CardBorderColor
import com.example.ui.theme.DarkText
import com.example.ui.theme.LightBlueGreyBg
import com.example.ui.theme.LightBlueGreyContainer
import com.example.ui.theme.PrimaryBlueGrey
import com.example.ui.theme.PrimaryBlueGreyDark
import com.example.ui.theme.SecondaryText
import com.example.ui.theme.SuccessGreen
import com.example.ui.theme.TagBgColor
import com.example.ui.theme.TagTextColor
import com.example.ui.theme.White

@Composable
fun SettingsScreen(
    isAdminLoggedIn: Boolean,
    loginEmail: String,
    loginPassword: String,
    loginError: String?,
    unreadCount: Int,
    contactMessages: List<ContactMessage>,
    projects: List<ProjectItem>,
    skillCategories: List<SkillCategory>,
    experiences: List<ExperienceItem>,
    certifications: List<CertificationItem>,
    artworks: List<Artwork>,
    profileImageUri: String? = null,
    onUpdateProfileImage: (String?) -> Unit,
    onResetProfileImage: () -> Unit,
    onLoginEmailChange: (String) -> Unit,
    onLoginPasswordChange: (String) -> Unit,
    onLoginSubmit: () -> Unit,
    onLogout: () -> Unit,
    onBackToPortfolio: () -> Unit,
    onMarkMessageRead: (Long) -> Unit,
    onDeleteMessage: (Long) -> Unit,
    onAddProjectClick: () -> Unit,
    onEditProjectClick: (ProjectItem) -> Unit,
    onDeleteProjectClick: (Long) -> Unit,
    onAddSkillClick: () -> Unit,
    onEditSkillClick: (SkillItem) -> Unit,
    onDeleteSkillClick: (Long) -> Unit,
    onAddExperienceClick: () -> Unit,
    onEditExperienceClick: (ExperienceItem) -> Unit,
    onDeleteExperienceClick: (Long) -> Unit,
    onAddCertClick: () -> Unit,
    onEditCertClick: (CertificationItem) -> Unit,
    onDeleteCertClick: (Long) -> Unit,
    onAddArtworkClick: () -> Unit,
    onDeleteArtworkClick: (Long) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Profile Photo", "Inbox ($unreadCount)", "Projects", "Skills", "Experience", "Certifications", "Art")

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(White)
    ) {
        // Top App Bar
        Surface(
            color = White,
            tonalElevation = 2.dp,
            border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = androidx.compose.ui.graphics.SolidColor(CardBorderColor))
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(
                        onClick = onBackToPortfolio,
                        modifier = Modifier.testTag("settings_btn_back")
                    ) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Back to Portfolio",
                            tint = DarkText
                        )
                    }

                    Spacer(modifier = Modifier.width(6.dp))

                    Text(
                        text = "Settings & Admin Portal",
                        style = MaterialTheme.typography.titleLarge.copy(
                            fontWeight = FontWeight.Bold,
                            color = DarkText,
                            fontSize = 18.sp
                        )
                    )
                }

                if (isAdminLoggedIn) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(LightBlueGreyBg)
                            .border(1.dp, PrimaryBlueGrey, RoundedCornerShape(8.dp))
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(6.dp)
                                    .clip(CircleShape)
                                    .background(SuccessGreen)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "Admin",
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp,
                                    color = DarkText
                                )
                            )
                        }
                    }
                }
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // Admin Authentication Card
            item {
                if (!isAdminLoggedIn) {
                    AdminLoginCard(
                        email = loginEmail,
                        password = loginPassword,
                        error = loginError,
                        onEmailChange = onLoginEmailChange,
                        onPasswordChange = onLoginPasswordChange,
                        onLogin = onLoginSubmit
                    )
                } else {
                    AdminLoggedInCard(
                        onLogout = onLogout
                    )
                }
            }

            if (isAdminLoggedIn) {
                // Section Tabs
                item {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .horizontalScroll(rememberScrollState()),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        tabs.forEachIndexed { index, tabName ->
                            val isSelected = selectedTab == index
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(if (isSelected) PrimaryBlueGreyDark else LightBlueGreyContainer)
                                    .border(1.dp, if (isSelected) PrimaryBlueGreyDark else CardBorderColor, RoundedCornerShape(10.dp))
                                    .clickable { selectedTab = index }
                                    .padding(horizontal = 12.dp, vertical = 8.dp)
                            ) {
                                Text(
                                    text = tabName,
                                    style = MaterialTheme.typography.labelMedium.copy(
                                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                        color = if (isSelected) White else DarkText,
                                        fontSize = 12.sp
                                    )
                                )
                            }
                        }
                    }
                }

                // Selected Tab Content
                when (selectedTab) {
                    0 -> {
                        // Profile Photo Manager
                        item {
                            ProfilePhotoManagerSection(
                                profileImageUri = profileImageUri,
                                onUpdateProfileImage = onUpdateProfileImage,
                                onResetProfileImage = onResetProfileImage
                            )
                        }
                    }
                    1 -> {
                        // Contact Messages Inbox
                        item {
                            MessagesInboxSection(
                                messages = contactMessages,
                                onMarkRead = onMarkMessageRead,
                                onDelete = onDeleteMessage
                            )
                        }
                    }
                    2 -> {
                        // Projects CRUD Manager
                        item {
                            ProjectsManagerSection(
                                projects = projects,
                                onAddClick = onAddProjectClick,
                                onEditClick = onEditProjectClick,
                                onDeleteClick = onDeleteProjectClick
                            )
                        }
                    }
                    3 -> {
                        // Skills CRUD Manager
                        item {
                            SkillsManagerSection(
                                skillCategories = skillCategories,
                                onAddClick = onAddSkillClick,
                                onEditClick = onEditSkillClick,
                                onDeleteClick = onDeleteSkillClick
                            )
                        }
                    }
                    4 -> {
                        // Experience CRUD Manager
                        item {
                            ExperienceManagerSection(
                                experiences = experiences,
                                onAddClick = onAddExperienceClick,
                                onEditClick = onEditExperienceClick,
                                onDeleteClick = onDeleteExperienceClick
                            )
                        }
                    }
                    5 -> {
                        // Certifications CRUD Manager
                        item {
                            CertificationsManagerSection(
                                certifications = certifications,
                                onAddClick = onAddCertClick,
                                onEditClick = onEditCertClick,
                                onDeleteClick = onDeleteCertClick
                            )
                        }
                    }
                    6 -> {
                        // Artwork CRUD Manager
                        item {
                            ArtworkManagerSection(
                                artworks = artworks,
                                onAddClick = onAddArtworkClick,
                                onDeleteClick = onDeleteArtworkClick
                            )
                        }
                    }
                }
            } else {
                // Viewer Mode Info
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(14.dp))
                            .background(LightBlueGreyContainer)
                            .border(1.dp, CardBorderColor, RoundedCornerShape(14.dp))
                            .padding(16.dp)
                    ) {
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.Security,
                                    contentDescription = null,
                                    tint = PrimaryBlueGreyDark,
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = "Public Viewer Mode",
                                    style = MaterialTheme.typography.titleMedium.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = DarkText
                                    )
                                )
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = "You are viewing the portfolio as a visitor. All information and projects are open for browsing. To edit, add, or delete portfolio content, please authenticate using Ashok's admin credentials above.",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontSize = 12.sp,
                                    lineHeight = 18.sp,
                                    color = SecondaryText
                                )
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun AdminLoginCard(
    email: String,
    password: String,
    error: String?,
    onEmailChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onLogin: () -> Unit
) {
    var passwordVisible by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = LightBlueGreyContainer),
        border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = androidx.compose.ui.graphics.SolidColor(CardBorderColor))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(18.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(LightBlueGreyBg)
                        .border(1.dp, PrimaryBlueGrey, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Lock,
                        contentDescription = null,
                        tint = PrimaryBlueGreyDark,
                        modifier = Modifier.size(16.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Owner Admin Access",
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = DarkText
                        )
                    )
                    Text(
                        text = "Enter admin credentials to manage content and CRUD operations",
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = SecondaryText,
                            fontSize = 11.sp
                        )
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Email Field
            OutlinedTextField(
                value = email,
                onValueChange = onEmailChange,
                label = { Text("Admin Email") },
                placeholder = { Text("ashokk.profile.in@gmail.com") },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("admin_input_email"),
                shape = RoundedCornerShape(10.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = PrimaryBlueGreyDark,
                    unfocusedBorderColor = CardBorderColor,
                    focusedContainerColor = White,
                    unfocusedContainerColor = White
                ),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(10.dp))

            // Password Field
            OutlinedTextField(
                value = password,
                onValueChange = onPasswordChange,
                label = { Text("Admin Password") },
                placeholder = { Text("Enter password") },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("admin_input_password"),
                shape = RoundedCornerShape(10.dp),
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                trailingIcon = {
                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                        Icon(
                            imageVector = if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                            contentDescription = if (passwordVisible) "Hide password" else "Show password",
                            tint = SecondaryText
                        )
                    }
                },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = PrimaryBlueGreyDark,
                    unfocusedBorderColor = CardBorderColor,
                    focusedContainerColor = White,
                    unfocusedContainerColor = White
                ),
                singleLine = true
            )

            if (error != null) {
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = error,
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp)
                )
            }

            Spacer(modifier = Modifier.height(14.dp))

            Button(
                onClick = onLogin,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(44.dp)
                    .testTag("admin_btn_login"),
                shape = RoundedCornerShape(10.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = PrimaryBlueGreyDark,
                    contentColor = White
                )
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.LockOpen,
                        contentDescription = null,
                        tint = White,
                        modifier = Modifier.size(15.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Unlock Admin Mode",
                        style = MaterialTheme.typography.labelLarge.copy(
                            fontWeight = FontWeight.Bold,
                            color = White
                        )
                    )
                }
            }
        }
    }
}

@Composable
fun AdminLoggedInCard(
    onLogout: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = LightBlueGreyContainer),
        border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = androidx.compose.ui.graphics.SolidColor(PrimaryBlueGrey))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(LightBlueGreyBg)
                        .border(1.5.dp, PrimaryBlueGreyDark, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AdminPanelSettings,
                        contentDescription = null,
                        tint = PrimaryBlueGreyDark,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Ashok K (Owner & Admin)",
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = DarkText,
                            fontSize = 14.sp
                        )
                    )
                    Text(
                        text = "ashokk.profile.in@gmail.com",
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = PrimaryBlueGreyDark,
                            fontSize = 11.sp
                        )
                    )
                }
            }

            OutlinedButton(
                onClick = onLogout,
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.outlinedButtonColors(contentColor = DarkText),
                modifier = Modifier.testTag("admin_btn_logout")
            ) {
                Text("Log Out", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun MessagesInboxSection(
    messages: List<ContactMessage>,
    onMarkRead: (Long) -> Unit,
    onDelete: (Long) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = "Contact Inquiries Inbox (${messages.size})",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold,
                color = DarkText
            )
        )
        Spacer(modifier = Modifier.height(8.dp))

        if (messages.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(LightBlueGreyContainer)
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Mail,
                        contentDescription = null,
                        tint = PrimaryBlueGrey,
                        modifier = Modifier.size(32.dp)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "No contact messages received yet.",
                        style = MaterialTheme.typography.bodyMedium.copy(color = SecondaryText)
                    )
                }
            }
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                messages.forEach { msg ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = if (msg.isRead) LightBlueGreyContainer else White),
                        border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = androidx.compose.ui.graphics.SolidColor(if (msg.isRead) CardBorderColor else PrimaryBlueGrey))
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.Top
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = msg.senderName,
                                        style = MaterialTheme.typography.titleMedium.copy(
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 14.sp,
                                            color = DarkText
                                        )
                                    )
                                    Text(
                                        text = msg.senderEmail,
                                        style = MaterialTheme.typography.bodySmall.copy(
                                            color = PrimaryBlueGreyDark,
                                            fontSize = 11.sp
                                        )
                                    )
                                }

                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    if (!msg.isRead) {
                                        IconButton(
                                            onClick = { onMarkRead(msg.id) },
                                            modifier = Modifier.size(28.dp)
                                        ) {
                                            Icon(
                                                imageVector = Icons.Default.MarkEmailRead,
                                                contentDescription = "Mark as read",
                                                tint = PrimaryBlueGreyDark,
                                                modifier = Modifier.size(16.dp)
                                            )
                                        }
                                    }

                                    IconButton(
                                        onClick = { onDelete(msg.id) },
                                        modifier = Modifier.size(28.dp)
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.Delete,
                                            contentDescription = "Delete",
                                            tint = MaterialTheme.colorScheme.error,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.height(6.dp))

                            Text(
                                text = "Subject: ${msg.subject}",
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp,
                                    color = DarkText
                                )
                            )

                            Spacer(modifier = Modifier.height(4.dp))

                            Text(
                                text = msg.message,
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontSize = 12.sp,
                                    lineHeight = 17.sp,
                                    color = DarkText
                                )
                            )

                            Spacer(modifier = Modifier.height(6.dp))

                            Text(
                                text = msg.timestamp,
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontSize = 10.sp,
                                    color = SecondaryText
                                )
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ProjectsManagerSection(
    projects: List<ProjectItem>,
    onAddClick: () -> Unit,
    onEditClick: (ProjectItem) -> Unit,
    onDeleteClick: (Long) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Projects CRUD (${projects.size})",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = DarkText
                )
            )

            Button(
                onClick = onAddClick,
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark),
                modifier = Modifier.testTag("admin_btn_add_project")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(14.dp), tint = White)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Project", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            projects.forEach { proj ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(LightBlueGreyContainer)
                        .border(1.dp, CardBorderColor, RoundedCornerShape(12.dp))
                        .padding(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = proj.title,
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = DarkText
                                )
                            )
                            Text(
                                text = proj.technologies.joinToString(", "),
                                style = MaterialTheme.typography.bodySmall.copy(
                                    fontSize = 11.sp,
                                    color = PrimaryBlueGreyDark
                                )
                            )
                        }

                        Row {
                            IconButton(
                                onClick = { onEditClick(proj) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Edit, contentDescription = "Edit", tint = DarkText, modifier = Modifier.size(16.dp))
                            }
                            IconButton(
                                onClick = { onDeleteClick(proj.id) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun SkillsManagerSection(
    skillCategories: List<SkillCategory>,
    onAddClick: () -> Unit,
    onEditClick: (SkillItem) -> Unit,
    onDeleteClick: (Long) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Skills CRUD",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = DarkText
                )
            )

            Button(
                onClick = onAddClick,
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark),
                modifier = Modifier.testTag("admin_btn_add_skill")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(14.dp), tint = White)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Skill", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            skillCategories.forEach { cat ->
                Text(
                    text = cat.title,
                    style = MaterialTheme.typography.titleSmall.copy(
                        fontWeight = FontWeight.Bold,
                        color = PrimaryBlueGreyDark
                    )
                )

                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    cat.skills.forEach { skill ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(LightBlueGreyContainer)
                                .border(1.dp, CardBorderColor, RoundedCornerShape(8.dp))
                                .padding(horizontal = 10.dp, vertical = 6.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(
                                        text = skill.name,
                                        style = MaterialTheme.typography.labelLarge.copy(
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 12.sp,
                                            color = DarkText
                                        )
                                    )
                                    Text(
                                        text = skill.level,
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            fontSize = 10.sp,
                                            color = SecondaryText
                                        )
                                    )
                                }

                                Row {
                                    IconButton(
                                        onClick = { onEditClick(skill) },
                                        modifier = Modifier.size(26.dp)
                                    ) {
                                        Icon(Icons.Default.Edit, contentDescription = "Edit", tint = DarkText, modifier = Modifier.size(14.dp))
                                    }
                                    IconButton(
                                        onClick = { onDeleteClick(skill.id) },
                                        modifier = Modifier.size(26.dp)
                                    ) {
                                        Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error, modifier = Modifier.size(14.dp))
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ExperienceManagerSection(
    experiences: List<ExperienceItem>,
    onAddClick: () -> Unit,
    onEditClick: (ExperienceItem) -> Unit,
    onDeleteClick: (Long) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Experience CRUD (${experiences.size})",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = DarkText
                )
            )

            Button(
                onClick = onAddClick,
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark),
                modifier = Modifier.testTag("admin_btn_add_exp")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(14.dp), tint = White)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Experience", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            experiences.forEach { exp ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(LightBlueGreyContainer)
                        .border(1.dp, CardBorderColor, RoundedCornerShape(12.dp))
                        .padding(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = exp.title,
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = DarkText
                                )
                            )
                            Text(
                                text = "${exp.organization} • ${exp.period}",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    fontSize = 11.sp,
                                    color = SecondaryText
                                )
                            )
                        }

                        Row {
                            IconButton(
                                onClick = { onEditClick(exp) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Edit, contentDescription = "Edit", tint = DarkText, modifier = Modifier.size(16.dp))
                            }
                            IconButton(
                                onClick = { onDeleteClick(exp.id) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun CertificationsManagerSection(
    certifications: List<CertificationItem>,
    onAddClick: () -> Unit,
    onEditClick: (CertificationItem) -> Unit,
    onDeleteClick: (Long) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Certifications CRUD (${certifications.size})",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = DarkText
                )
            )

            Button(
                onClick = onAddClick,
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark),
                modifier = Modifier.testTag("admin_btn_add_cert")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(14.dp), tint = White)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Cert", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            certifications.forEach { cert ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(LightBlueGreyContainer)
                        .border(1.dp, CardBorderColor, RoundedCornerShape(12.dp))
                        .padding(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = cert.title,
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = DarkText
                                )
                            )
                            Text(
                                text = "${cert.issuer} • ${cert.issueDate}",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    fontSize = 11.sp,
                                    color = SecondaryText
                                )
                            )
                        }

                        Row {
                            IconButton(
                                onClick = { onEditClick(cert) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Edit, contentDescription = "Edit", tint = DarkText, modifier = Modifier.size(16.dp))
                            }
                            IconButton(
                                onClick = { onDeleteClick(cert.id) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ArtworkManagerSection(
    artworks: List<Artwork>,
    onAddClick: () -> Unit,
    onDeleteClick: (Long) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Artworks Gallery CRUD (${artworks.size})",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = DarkText
                )
            )

            Button(
                onClick = onAddClick,
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark),
                modifier = Modifier.testTag("admin_btn_add_art")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(14.dp), tint = White)
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Art", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        if (artworks.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(LightBlueGreyContainer)
                    .padding(20.dp),
                contentAlignment = Alignment.Center
            ) {
                Text("No artworks in database. Click + Add Art to upload from device.", color = SecondaryText, fontSize = 12.sp)
            }
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                artworks.forEach { art ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(LightBlueGreyContainer)
                            .border(1.dp, CardBorderColor, RoundedCornerShape(12.dp))
                            .padding(12.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = art.title,
                                    style = MaterialTheme.typography.titleMedium.copy(
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = DarkText
                                    )
                                )
                                Text(
                                    text = "${art.category} • ${art.dateAdded}",
                                    style = MaterialTheme.typography.bodySmall.copy(
                                        fontSize = 11.sp,
                                        color = SecondaryText
                                    )
                                )
                            }

                            IconButton(
                                onClick = { onDeleteClick(art.id) },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ProfilePhotoManagerSection(
    profileImageUri: String?,
    onUpdateProfileImage: (String?) -> Unit,
    onResetProfileImage: () -> Unit
) {
    val context = LocalContext.current
    val photoPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        if (uri != null) {
            onUpdateProfileImage(uri.toString())
        }
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = White),
        border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = androidx.compose.ui.graphics.SolidColor(CardBorderColor))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(18.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(LightBlueGreyBg)
                        .border(1.dp, PrimaryBlueGrey, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AccountCircle,
                        contentDescription = null,
                        tint = PrimaryBlueGreyDark,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Profile Photo Management",
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = DarkText,
                            fontSize = 15.sp
                        )
                    )
                    Text(
                        text = "Customize the profile portrait displayed across your website",
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = SecondaryText,
                            fontSize = 11.sp
                        )
                    )
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Photo Preview with decorative frame
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.padding(vertical = 8.dp)
            ) {
                // Outer subtle ring
                Box(
                    modifier = Modifier
                        .size(136.dp)
                        .clip(CircleShape)
                        .background(LightBlueGreyBg)
                        .border(2.5.dp, PrimaryBlueGrey, CircleShape)
                )

                // Avatar
                if (!profileImageUri.isNullOrBlank()) {
                    AsyncImage(
                        model = ImageRequest.Builder(context)
                            .data(Uri.parse(profileImageUri))
                            .crossfade(true)
                            .build(),
                        contentDescription = "Current Profile Photo",
                        modifier = Modifier
                            .size(120.dp)
                            .clip(CircleShape)
                            .border(3.dp, White, CircleShape),
                        contentScale = ContentScale.Crop
                    )
                } else {
                    Image(
                        painter = painterResource(id = R.drawable.img_ashok_portrait),
                        contentDescription = "Default Profile Portrait",
                        modifier = Modifier
                            .size(120.dp)
                            .clip(CircleShape)
                            .border(3.dp, White, CircleShape),
                        contentScale = ContentScale.Crop
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Current State Badge
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = if (!profileImageUri.isNullOrBlank()) PrimaryBlueGreyDark else LightBlueGreyBg,
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(if (!profileImageUri.isNullOrBlank()) SuccessGreen else PrimaryBlueGreyDark)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (!profileImageUri.isNullOrBlank()) "Custom Photo Active" else "Default Portrait Active",
                        style = MaterialTheme.typography.labelSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = if (!profileImageUri.isNullOrBlank()) White else DarkText,
                            fontSize = 11.sp
                        )
                    )
                }
            }

            // Action Buttons
            Button(
                onClick = { photoPickerLauncher.launch("image/*") },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("btn_change_profile_photo"),
                colors = ButtonDefaults.buttonColors(
                    containerColor = PrimaryBlueGreyDark,
                    contentColor = White
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AddPhotoAlternate,
                        contentDescription = null,
                        tint = White,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Choose New Photo from Device",
                        style = MaterialTheme.typography.labelLarge.copy(
                            fontWeight = FontWeight.Bold,
                            color = White
                        )
                    )
                }
            }

            if (!profileImageUri.isNullOrBlank()) {
                Spacer(modifier = Modifier.height(10.dp))

                OutlinedButton(
                    onClick = onResetProfileImage,
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("btn_reset_profile_photo"),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = DarkText
                    ),
                    border = CardDefaults.outlinedCardBorder().copy(
                        brush = androidx.compose.ui.graphics.SolidColor(CardBorderColor)
                    )
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = null,
                            tint = SecondaryText,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Reset to Original Portrait",
                            style = MaterialTheme.typography.labelMedium.copy(
                                fontWeight = FontWeight.SemiBold,
                                color = DarkText
                            )
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Helpful note
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(LightBlueGreyContainer)
                    .padding(12.dp)
            ) {
                Text(
                    text = "💡 Tip: Any photo you choose will instantly update your Hero Section portrait across the entire portfolio website and remain saved on your device.",
                    style = MaterialTheme.typography.bodySmall.copy(
                        fontSize = 11.sp,
                        lineHeight = 16.sp,
                        color = SecondaryText
                    )
                )
            }
        }
    }
}

