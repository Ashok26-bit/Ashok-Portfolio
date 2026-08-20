package com.example.ui.components

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddPhotoAlternate
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.data.model.CertificationItem
import com.example.data.model.ExperienceItem
import com.example.data.model.ProjectItem
import com.example.data.model.SkillItem
import com.example.ui.theme.CardBorderColor
import com.example.ui.theme.DarkText
import com.example.ui.theme.LightBlueGreyBg
import com.example.ui.theme.LightBlueGreyContainer
import com.example.ui.theme.PrimaryBlueGrey
import com.example.ui.theme.PrimaryBlueGreyDark
import com.example.ui.theme.SecondaryText
import com.example.ui.theme.White

// --- PROJECT DIALOG ---
@Composable
fun ProjectCrudDialog(
    project: ProjectItem?,
    onDismiss: () -> Unit,
    onSave: (id: Long, title: String, subtitle: String, description: String, problemSolved: String, keyContribution: String, technologies: List<String>, githubUrl: String?, isFeatured: Boolean) -> Unit
) {
    var title by remember { mutableStateOf(project?.title ?: "") }
    var subtitle by remember { mutableStateOf(project?.subtitle ?: "") }
    var description by remember { mutableStateOf(project?.description ?: "") }
    var problemSolved by remember { mutableStateOf(project?.problemSolved ?: "") }
    var keyContribution by remember { mutableStateOf(project?.keyContribution ?: "") }
    var technologies by remember { mutableStateOf(project?.technologies?.joinToString(", ") ?: "") }
    var githubUrl by remember { mutableStateOf(project?.githubUrl ?: "") }
    var isFeatured by remember { mutableStateOf(project?.isFeatured ?: true) }
    var error by remember { mutableStateOf<String?>(null) }

    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = White)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
                    .verticalScroll(rememberScrollState())
            ) {
                Text(
                    text = if (project == null) "Add New Project" else "Edit Project",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = DarkText,
                        fontSize = 18.sp
                    )
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Project Title") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = subtitle,
                    onValueChange = { subtitle = it },
                    label = { Text("Subtitle / Short Tagline") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = description,
                    onValueChange = { description = it },
                    label = { Text("Full Description") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2,
                    shape = RoundedCornerShape(10.dp)
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = problemSolved,
                    onValueChange = { problemSolved = it },
                    label = { Text("Problem Solved") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2,
                    shape = RoundedCornerShape(10.dp)
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = keyContribution,
                    onValueChange = { keyContribution = it },
                    label = { Text("Key Technical Contribution") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2,
                    shape = RoundedCornerShape(10.dp)
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = technologies,
                    onValueChange = { technologies = it },
                    label = { Text("Technologies (comma separated)") },
                    placeholder = { Text("Java, Spring Boot, React, SQL") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )
                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = githubUrl,
                    onValueChange = { githubUrl = it },
                    label = { Text("GitHub Repo URL (optional)") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(10.dp))

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(
                        checked = isFeatured,
                        onCheckedChange = { isFeatured = it },
                        colors = CheckboxDefaults.colors(checkedColor = PrimaryBlueGreyDark)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Featured Project", fontSize = 13.sp, color = DarkText)
                }

                if (error != null) {
                    Text(text = error!!, color = MaterialTheme.colorScheme.error, fontSize = 12.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    OutlinedButton(onClick = onDismiss, shape = RoundedCornerShape(8.dp)) {
                        Text("Cancel", color = DarkText)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            if (title.isBlank()) {
                                error = "Title cannot be empty"
                                return@Button
                            }
                            val techList = technologies.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                            onSave(
                                project?.id ?: 0L,
                                title,
                                subtitle,
                                description,
                                problemSolved,
                                keyContribution,
                                techList,
                                if (githubUrl.isBlank()) null else githubUrl,
                                isFeatured
                            )
                        },
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark)
                    ) {
                        Text("Save Project", color = White)
                    }
                }
            }
        }
    }
}

// --- SKILL DIALOG ---
@Composable
fun SkillCrudDialog(
    skill: SkillItem?,
    onDismiss: () -> Unit,
    onSave: (id: Long, categoryTitle: String, name: String, level: String, isPrimary: Boolean) -> Unit
) {
    var categoryTitle by remember { mutableStateOf(skill?.categoryTitle ?: "Programming Languages") }
    var name by remember { mutableStateOf(skill?.name ?: "") }
    var level by remember { mutableStateOf(skill?.level ?: "Proficient") }
    var isPrimary by remember { mutableStateOf(skill?.isPrimary ?: false) }
    var error by remember { mutableStateOf<String?>(null) }

    val categories = listOf(
        "Programming Languages",
        "Frameworks & Development",
        "Web Technologies",
        "Database & Cloud",
        "Tools & Platforms",
        "Core Concepts"
    )

    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = White)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
            ) {
                Text(
                    text = if (skill == null) "Add New Skill" else "Edit Skill",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = DarkText,
                        fontSize = 18.sp
                    )
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = categoryTitle,
                    onValueChange = { categoryTitle = it },
                    label = { Text("Category") },
                    placeholder = { Text("e.g. Programming Languages") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Skill Name") },
                    placeholder = { Text("e.g. Java") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = level,
                    onValueChange = { level = it },
                    label = { Text("Proficiency / Subtitle") },
                    placeholder = { Text("e.g. Core & Advanced") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(
                        checked = isPrimary,
                        onCheckedChange = { isPrimary = it },
                        colors = CheckboxDefaults.colors(checkedColor = PrimaryBlueGreyDark)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Highlight as Primary Skill", fontSize = 13.sp, color = DarkText)
                }

                if (error != null) {
                    Text(text = error!!, color = MaterialTheme.colorScheme.error, fontSize = 12.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    OutlinedButton(onClick = onDismiss, shape = RoundedCornerShape(8.dp)) {
                        Text("Cancel", color = DarkText)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            if (name.isBlank() || categoryTitle.isBlank()) {
                                error = "Category and Skill Name are required."
                                return@Button
                            }
                            onSave(skill?.id ?: 0L, categoryTitle, name, level, isPrimary)
                        },
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark)
                    ) {
                        Text("Save Skill", color = White)
                    }
                }
            }
        }
    }
}

// --- EXPERIENCE DIALOG ---
@Composable
fun ExperienceCrudDialog(
    experience: ExperienceItem?,
    onDismiss: () -> Unit,
    onSave: (id: Long, title: String, organization: String, period: String, roleType: String, bullets: List<String>, technologies: List<String>, credentialId: String?) -> Unit
) {
    var title by remember { mutableStateOf(experience?.title ?: "") }
    var organization by remember { mutableStateOf(experience?.organization ?: "") }
    var period by remember { mutableStateOf(experience?.period ?: "") }
    var roleType by remember { mutableStateOf(experience?.roleType ?: "Internship") }
    var bullets by remember { mutableStateOf(experience?.bullets?.joinToString("\n\n") ?: "") }
    var technologies by remember { mutableStateOf(experience?.technologies?.joinToString(", ") ?: "") }
    var credentialId by remember { mutableStateOf(experience?.credentialId ?: "") }
    var error by remember { mutableStateOf<String?>(null) }

    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = White)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
                    .verticalScroll(rememberScrollState())
            ) {
                Text(
                    text = if (experience == null) "Add Experience" else "Edit Experience",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = DarkText,
                        fontSize = 18.sp
                    )
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Job Title / Role") },
                    placeholder = { Text("Web Development Intern") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = organization,
                    onValueChange = { organization = it },
                    label = { Text("Company / Organization") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = period,
                    onValueChange = { period = it },
                    label = { Text("Duration / Period") },
                    placeholder = { Text("Oct 2025 – Jan 2026") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = roleType,
                    onValueChange = { roleType = it },
                    label = { Text("Role Type") },
                    placeholder = { Text("Internship / Full-time") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = bullets,
                    onValueChange = { bullets = it },
                    label = { Text("Key Achievements (separate each point with empty line)") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 3,
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = technologies,
                    onValueChange = { technologies = it },
                    label = { Text("Technologies (comma separated)") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = credentialId,
                    onValueChange = { credentialId = it },
                    label = { Text("Credential ID (optional)") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                if (error != null) {
                    Text(text = error!!, color = MaterialTheme.colorScheme.error, fontSize = 12.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    OutlinedButton(onClick = onDismiss, shape = RoundedCornerShape(8.dp)) {
                        Text("Cancel", color = DarkText)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            if (title.isBlank() || organization.isBlank()) {
                                error = "Title and Organization are required."
                                return@Button
                            }
                            val bulletList = bullets.split("\n\n").map { it.trim() }.filter { it.isNotEmpty() }
                            val techList = technologies.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                            onSave(
                                experience?.id ?: 0L,
                                title,
                                organization,
                                period,
                                roleType,
                                bulletList,
                                techList,
                                if (credentialId.isBlank()) null else credentialId
                            )
                        },
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark)
                    ) {
                        Text("Save Experience", color = White)
                    }
                }
            }
        }
    }
}

// --- CERTIFICATION DIALOG ---
@Composable
fun CertificationCrudDialog(
    cert: CertificationItem?,
    onDismiss: () -> Unit,
    onSave: (id: Long, title: String, issuer: String, issueDate: String, credentialId: String?, verificationUrl: String?, skillsCovered: List<String>) -> Unit
) {
    var title by remember { mutableStateOf(cert?.title ?: "") }
    var issuer by remember { mutableStateOf(cert?.issuer ?: "") }
    var issueDate by remember { mutableStateOf(cert?.issueDate ?: "") }
    var credentialId by remember { mutableStateOf(cert?.credentialId ?: "") }
    var verificationUrl by remember { mutableStateOf(cert?.verificationUrl ?: "") }
    var skillsCovered by remember { mutableStateOf(cert?.skillsCovered?.joinToString(", ") ?: "") }
    var error by remember { mutableStateOf<String?>(null) }

    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = White)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
                    .verticalScroll(rememberScrollState())
            ) {
                Text(
                    text = if (cert == null) "Add Certification" else "Edit Certification",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = DarkText,
                        fontSize = 18.sp
                    )
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Certificate Title") },
                    placeholder = { Text("Java Programming") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = issuer,
                    onValueChange = { issuer = it },
                    label = { Text("Issuer / Organization") },
                    placeholder = { Text("Great Learning Academy") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = issueDate,
                    onValueChange = { issueDate = it },
                    label = { Text("Issue Date") },
                    placeholder = { Text("November 2024") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = credentialId,
                    onValueChange = { credentialId = it },
                    label = { Text("Credential ID (optional)") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = verificationUrl,
                    onValueChange = { verificationUrl = it },
                    label = { Text("Verification Link URL (optional)") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = skillsCovered,
                    onValueChange = { skillsCovered = it },
                    label = { Text("Skills Covered (comma separated)") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp)
                )

                if (error != null) {
                    Text(text = error!!, color = MaterialTheme.colorScheme.error, fontSize = 12.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    OutlinedButton(onClick = onDismiss, shape = RoundedCornerShape(8.dp)) {
                        Text("Cancel", color = DarkText)
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            if (title.isBlank() || issuer.isBlank()) {
                                error = "Title and Issuer are required."
                                return@Button
                            }
                            val skillList = skillsCovered.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                            onSave(
                                cert?.id ?: 0L,
                                title,
                                issuer,
                                issueDate,
                                if (credentialId.isBlank()) null else credentialId,
                                if (verificationUrl.isBlank()) null else verificationUrl,
                                skillList
                            )
                        },
                        shape = RoundedCornerShape(8.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark)
                    ) {
                        Text("Save Certification", color = White)
                    }
                }
            }
        }
    }
}
