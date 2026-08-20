package com.example.data.model

import androidx.annotation.DrawableRes

data class SkillCategory(
    val title: String,
    val skills: List<SkillItem>
)

data class SkillItem(
    val id: Long = 0,
    val name: String,
    val categoryTitle: String = "Programming Languages",
    val level: String = "Proficient",
    val isPrimary: Boolean = false
)

data class ExperienceItem(
    val id: Long = 0,
    val title: String,
    val organization: String,
    val period: String,
    val roleType: String,
    val bullets: List<String>,
    val technologies: List<String>,
    val credentialId: String? = null
)

data class ProjectItem(
    val id: Long = 0,
    val title: String,
    val subtitle: String,
    val description: String,
    val problemSolved: String,
    val keyContribution: String,
    val technologies: List<String>,
    val githubUrl: String? = null,
    val liveDemoUrl: String? = null,
    val isFeatured: Boolean = true
)

data class EducationItem(
    val degree: String,
    val institution: String,
    val location: String,
    val period: String,
    val grade: String,
    val keyHighlights: List<String>
)

data class CertificationItem(
    val id: Long = 0,
    val title: String,
    val issuer: String,
    val issueDate: String,
    val credentialId: String? = null,
    val verificationUrl: String? = null,
    val skillsCovered: List<String> = emptyList()
)

data class Artwork(
    val id: Long = 0,
    val title: String,
    val description: String = "",
    val category: String = "Traditional Indian Art",
    val dateAdded: String = "",
    val imageUri: String? = null,
    @DrawableRes val drawableRes: Int? = null,
    val isSample: Boolean = false
)

data class ContactMessage(
    val id: Long = 0,
    val senderName: String,
    val senderEmail: String,
    val subject: String,
    val message: String,
    val timestamp: String,
    val isRead: Boolean = false
)
