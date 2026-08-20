package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "artworks")
data class ArtworkEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val description: String,
    val category: String,
    val dateAdded: String,
    val imageUri: String? = null,
    val drawableRes: Int? = null,
    val isSample: Boolean = false
)

@Entity(tableName = "projects")
data class ProjectEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val subtitle: String,
    val description: String,
    val problemSolved: String,
    val keyContribution: String,
    val technologies: String, // Comma-separated or pipe-separated
    val githubUrl: String? = null,
    val liveDemoUrl: String? = null,
    val isFeatured: Boolean = true
)

@Entity(tableName = "skills")
data class SkillEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val categoryTitle: String,
    val name: String,
    val level: String = "Proficient",
    val isPrimary: Boolean = false
)

@Entity(tableName = "experiences")
data class ExperienceEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val organization: String,
    val period: String,
    val roleType: String,
    val bullets: String, // Double-newline or pipe separated
    val technologies: String, // Comma separated
    val credentialId: String? = null
)

@Entity(tableName = "certifications")
data class CertificationEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val issuer: String,
    val issueDate: String,
    val credentialId: String? = null,
    val verificationUrl: String? = null,
    val skillsCovered: String = "" // Comma separated
)

@Entity(tableName = "contact_messages")
data class ContactMessageEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val senderName: String,
    val senderEmail: String,
    val subject: String,
    val message: String,
    val timestamp: String,
    val isRead: Boolean = false
)
