package com.example.data.repository

import com.example.data.local.ArtworkEntity
import com.example.data.local.CertificationEntity
import com.example.data.local.ContactMessageEntity
import com.example.data.local.ExperienceEntity
import com.example.data.local.PortfolioDao
import com.example.data.local.ProjectEntity
import com.example.data.local.SkillEntity
import com.example.data.model.Artwork
import com.example.data.model.CertificationItem
import com.example.data.model.ContactMessage
import com.example.data.model.EducationItem
import com.example.data.model.ExperienceItem
import com.example.data.model.ProjectItem
import com.example.data.model.SkillCategory
import com.example.data.model.SkillItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class PortfolioRepository(private val dao: PortfolioDao) {

    // --- ARTWORKS ---
    val artworksFlow: Flow<List<Artwork>> = dao.getAllArtworks().map { entities ->
        entities.map { entity ->
            Artwork(
                id = entity.id,
                title = entity.title,
                description = entity.description,
                category = entity.category,
                dateAdded = entity.dateAdded,
                imageUri = entity.imageUri,
                drawableRes = entity.drawableRes,
                isSample = entity.isSample
            )
        }
    }

    suspend fun addArtwork(artwork: Artwork): Long {
        return dao.insertArtwork(
            ArtworkEntity(
                id = artwork.id,
                title = artwork.title,
                description = artwork.description,
                category = artwork.category,
                dateAdded = artwork.dateAdded,
                imageUri = artwork.imageUri,
                drawableRes = artwork.drawableRes,
                isSample = artwork.isSample
            )
        )
    }

    suspend fun updateArtwork(artwork: Artwork) {
        dao.updateArtwork(
            ArtworkEntity(
                id = artwork.id,
                title = artwork.title,
                description = artwork.description,
                category = artwork.category,
                dateAdded = artwork.dateAdded,
                imageUri = artwork.imageUri,
                drawableRes = artwork.drawableRes,
                isSample = artwork.isSample
            )
        )
    }

    suspend fun deleteArtwork(artworkId: Long) {
        dao.deleteArtworkById(artworkId)
    }


    // --- PROJECTS ---
    val projectsFlow: Flow<List<ProjectItem>> = dao.getAllProjects().map { entities ->
        entities.map { entity ->
            ProjectItem(
                id = entity.id,
                title = entity.title,
                subtitle = entity.subtitle,
                description = entity.description,
                problemSolved = entity.problemSolved,
                keyContribution = entity.keyContribution,
                technologies = entity.technologies.split(",").map { it.trim() }.filter { it.isNotEmpty() },
                githubUrl = entity.githubUrl,
                liveDemoUrl = entity.liveDemoUrl,
                isFeatured = entity.isFeatured
            )
        }
    }

    suspend fun addProject(project: ProjectItem): Long {
        return dao.insertProject(
            ProjectEntity(
                id = project.id,
                title = project.title,
                subtitle = project.subtitle,
                description = project.description,
                problemSolved = project.problemSolved,
                keyContribution = project.keyContribution,
                technologies = project.technologies.joinToString(", "),
                githubUrl = project.githubUrl,
                liveDemoUrl = project.liveDemoUrl,
                isFeatured = project.isFeatured
            )
        )
    }

    suspend fun updateProject(project: ProjectItem) {
        dao.updateProject(
            ProjectEntity(
                id = project.id,
                title = project.title,
                subtitle = project.subtitle,
                description = project.description,
                problemSolved = project.problemSolved,
                keyContribution = project.keyContribution,
                technologies = project.technologies.joinToString(", "),
                githubUrl = project.githubUrl,
                liveDemoUrl = project.liveDemoUrl,
                isFeatured = project.isFeatured
            )
        )
    }

    suspend fun deleteProject(projectId: Long) {
        dao.deleteProjectById(projectId)
    }


    // --- SKILLS ---
    val skillsFlow: Flow<List<SkillCategory>> = dao.getAllSkills().map { entities ->
        val grouped = entities.groupBy { it.categoryTitle }
        val categoryOrder = listOf(
            "Programming Languages",
            "Frameworks & Development",
            "Web Technologies",
            "Database & Cloud",
            "Tools & Platforms",
            "Core Concepts"
        )
        val orderedCategories = mutableListOf<SkillCategory>()
        for (cat in categoryOrder) {
            val list = grouped[cat] ?: emptyList()
            if (list.isNotEmpty()) {
                orderedCategories.add(
                    SkillCategory(
                        title = cat,
                        skills = list.map {
                            SkillItem(
                                id = it.id,
                                name = it.name,
                                categoryTitle = it.categoryTitle,
                                level = it.level,
                                isPrimary = it.isPrimary
                            )
                        }
                    )
                )
            }
        }
        // Add any custom categories added by user
        grouped.forEach { (cat, list) ->
            if (cat !in categoryOrder && list.isNotEmpty()) {
                orderedCategories.add(
                    SkillCategory(
                        title = cat,
                        skills = list.map {
                            SkillItem(
                                id = it.id,
                                name = it.name,
                                categoryTitle = it.categoryTitle,
                                level = it.level,
                                isPrimary = it.isPrimary
                            )
                        }
                    )
                )
            }
        }
        orderedCategories
    }

    suspend fun addSkill(skill: SkillItem): Long {
        return dao.insertSkill(
            SkillEntity(
                id = skill.id,
                categoryTitle = skill.categoryTitle,
                name = skill.name,
                level = skill.level,
                isPrimary = skill.isPrimary
            )
        )
    }

    suspend fun updateSkill(skill: SkillItem) {
        dao.updateSkill(
            SkillEntity(
                id = skill.id,
                categoryTitle = skill.categoryTitle,
                name = skill.name,
                level = skill.level,
                isPrimary = skill.isPrimary
            )
        )
    }

    suspend fun deleteSkill(skillId: Long) {
        dao.deleteSkillById(skillId)
    }


    // --- EXPERIENCES ---
    val experiencesFlow: Flow<List<ExperienceItem>> = dao.getAllExperiences().map { entities ->
        entities.map { entity ->
            ExperienceItem(
                id = entity.id,
                title = entity.title,
                organization = entity.organization,
                period = entity.period,
                roleType = entity.roleType,
                bullets = entity.bullets.split("\n\n").map { it.trim() }.filter { it.isNotEmpty() },
                technologies = entity.technologies.split(",").map { it.trim() }.filter { it.isNotEmpty() },
                credentialId = entity.credentialId
            )
        }
    }

    suspend fun addExperience(experience: ExperienceItem): Long {
        return dao.insertExperience(
            ExperienceEntity(
                id = experience.id,
                title = experience.title,
                organization = experience.organization,
                period = experience.period,
                roleType = experience.roleType,
                bullets = experience.bullets.joinToString("\n\n"),
                technologies = experience.technologies.joinToString(", "),
                credentialId = experience.credentialId
            )
        )
    }

    suspend fun updateExperience(experience: ExperienceItem) {
        dao.updateExperience(
            ExperienceEntity(
                id = experience.id,
                title = experience.title,
                organization = experience.organization,
                period = experience.period,
                roleType = experience.roleType,
                bullets = experience.bullets.joinToString("\n\n"),
                technologies = experience.technologies.joinToString(", "),
                credentialId = experience.credentialId
            )
        )
    }

    suspend fun deleteExperience(experienceId: Long) {
        dao.deleteExperienceById(experienceId)
    }


    // --- CERTIFICATIONS ---
    val certificationsFlow: Flow<List<CertificationItem>> = dao.getAllCertifications().map { entities ->
        entities.map { entity ->
            CertificationItem(
                id = entity.id,
                title = entity.title,
                issuer = entity.issuer,
                issueDate = entity.issueDate,
                credentialId = entity.credentialId,
                verificationUrl = entity.verificationUrl,
                skillsCovered = entity.skillsCovered.split(",").map { it.trim() }.filter { it.isNotEmpty() }
            )
        }
    }

    suspend fun addCertification(cert: CertificationItem): Long {
        return dao.insertCertification(
            CertificationEntity(
                id = cert.id,
                title = cert.title,
                issuer = cert.issuer,
                issueDate = cert.issueDate,
                credentialId = cert.credentialId,
                verificationUrl = cert.verificationUrl,
                skillsCovered = cert.skillsCovered.joinToString(", ")
            )
        )
    }

    suspend fun updateCertification(cert: CertificationItem) {
        dao.updateCertification(
            CertificationEntity(
                id = cert.id,
                title = cert.title,
                issuer = cert.issuer,
                issueDate = cert.issueDate,
                credentialId = cert.credentialId,
                verificationUrl = cert.verificationUrl,
                skillsCovered = cert.skillsCovered.joinToString(", ")
            )
        )
    }

    suspend fun deleteCertification(certId: Long) {
        dao.deleteCertificationById(certId)
    }


    // --- CONTACT MESSAGES ---
    val contactMessagesFlow: Flow<List<ContactMessage>> = dao.getAllContactMessages().map { entities ->
        entities.map { entity ->
            ContactMessage(
                id = entity.id,
                senderName = entity.senderName,
                senderEmail = entity.senderEmail,
                subject = entity.subject,
                message = entity.message,
                timestamp = entity.timestamp,
                isRead = entity.isRead
            )
        }
    }

    val unreadMessageCountFlow: Flow<Int> = dao.getUnreadMessageCount()

    suspend fun saveContactMessage(name: String, email: String, subject: String, message: String, timestamp: String): Long {
        return dao.insertContactMessage(
            ContactMessageEntity(
                senderName = name,
                senderEmail = email,
                subject = subject,
                message = message,
                timestamp = timestamp,
                isRead = false
            )
        )
    }

    suspend fun markMessageAsRead(id: Long) {
        dao.markMessageAsRead(id)
    }

    suspend fun deleteContactMessage(id: Long) {
        dao.deleteContactMessageById(id)
    }


    // --- EDUCATION (Static verified background from Resume) ---
    fun getEducation(): EducationItem {
        return EducationItem(
            degree = "B.E. Computer Science and Engineering",
            institution = "M.A.M College of Engineering and Technology",
            location = "Tamil Nadu, India",
            period = "2023 – 2027",
            grade = "CGPA: 7.53",
            keyHighlights = listOf(
                "Focus on Core Software Engineering, Full-Stack Architecture, and Systems Design",
                "Active participation in coding contests, technical symposiums, and software workshops",
                "Strong academic foundation in OOPs, Data Structures, Algorithms, and DBMS"
            )
        )
    }


    // --- INITIALIZATION ---
    suspend fun initializeDatabaseIfEmpty() {
        dao.deleteStarterProjects()

        // 1. Skills
        if (dao.getSkillCount() == 0) {
            val initialSkills = listOf(
                SkillEntity(categoryTitle = "Programming Languages", name = "Java", level = "Core & Advanced", isPrimary = true),
                SkillEntity(categoryTitle = "Programming Languages", name = "SQL", level = "Relational Queries", isPrimary = true),
                SkillEntity(categoryTitle = "Frameworks & Development", name = "Spring Boot", level = "Enterprise Backend", isPrimary = true),
                SkillEntity(categoryTitle = "Frameworks & Development", name = "React", level = "Frontend UI", isPrimary = true),
                SkillEntity(categoryTitle = "Frameworks & Development", name = "Android Studio", level = "Native Development", isPrimary = true),
                SkillEntity(categoryTitle = "Frameworks & Development", name = "Flutter / Dart", level = "Cross-Platform", isPrimary = false),
                SkillEntity(categoryTitle = "Web Technologies", name = "REST APIs", level = "API Architecture", isPrimary = true),
                SkillEntity(categoryTitle = "Web Technologies", name = "HTML5", level = "Semantic Markup", isPrimary = false),
                SkillEntity(categoryTitle = "Web Technologies", name = "CSS3", level = "Modern Styling", isPrimary = false),
                SkillEntity(categoryTitle = "Database & Cloud", name = "MongoDB", level = "NoSQL Document DB", isPrimary = true),
                SkillEntity(categoryTitle = "Database & Cloud", name = "Cloudinary", level = "Cloud Media Storage", isPrimary = false),
                SkillEntity(categoryTitle = "Tools & Platforms", name = "Git", level = "Version Control", isPrimary = true),
                SkillEntity(categoryTitle = "Tools & Platforms", name = "GitHub", level = "Collaboration", isPrimary = true),
                SkillEntity(categoryTitle = "Tools & Platforms", name = "Postman", level = "API Testing", isPrimary = true),
                SkillEntity(categoryTitle = "Tools & Platforms", name = "Maven", level = "Build Automation", isPrimary = false),
                SkillEntity(categoryTitle = "Tools & Platforms", name = "Linux", level = "Environment & CLI", isPrimary = false),
                SkillEntity(categoryTitle = "Core Concepts", name = "OOPs", level = "Design Principles", isPrimary = true),
                SkillEntity(categoryTitle = "Core Concepts", name = "Data Structures & Algorithms", level = "Problem Solving", isPrimary = true),
                SkillEntity(categoryTitle = "Core Concepts", name = "DBMS", level = "Database Management", isPrimary = true)
            )
            for (s in initialSkills) {
                dao.insertSkill(s)
            }
        }

        // 3. Experiences
        if (dao.getExperienceCount() == 0) {
            dao.insertExperience(
                ExperienceEntity(
                    title = "Web Development Intern",
                    organization = "Corizo",
                    period = "October 2025 – January 2026",
                    roleType = "Internship",
                    bullets = "Developed a full-stack E-commerce website using modern software architecture.\n\nBuilt responsive, interactive frontend user interfaces using React.\n\nEngineered robust enterprise backend microservices and controllers using Spring Boot.\n\nImplemented end-to-end CRUD operations for comprehensive product and inventory management.\n\nImplemented secure user authentication and access control mechanisms.\n\nCollaborated with team members on responsive UI components and API integration.",
                    technologies = "Java, Spring Boot, React, REST APIs, SQL, Git",
                    credentialId = "Corizo Dice ID: CRZ136399"
                )
            )
            dao.insertExperience(
                ExperienceEntity(
                    title = "Solo Full-Stack Developer",
                    organization = "ArtIn – Professional Network for Artists & Artisans",
                    period = "Project Experience",
                    roleType = "Independent Development",
                    bullets = "Built a professional networking platform dedicated to connecting artists, artisans, and clients.\n\nDirectly addressed digital visibility and market outreach challenges faced by local traditional artisans.\n\nDesigned and implemented backend services for detailed artist profiles, portfolios, and artwork showcases.\n\nSupported real-time connectivity and interaction between artisans and prospective patrons.\n\nArchitected a scalable, high-performance media-upload and delivery pipeline using cloud media storage.",
                    technologies = "Java, Spring Boot, Flutter, Dart, MongoDB, Cloudinary",
                    credentialId = null
                )
            )
        }

        // 4. Certifications
        if (dao.getCertificationCount() == 0) {
            dao.insertCertification(
                CertificationEntity(
                    title = "Java Programming",
                    issuer = "Great Learning Academy",
                    issueDate = "November 2024",
                    credentialId = "ZMQBBOET",
                    verificationUrl = "https://www.mygreatlearning.com/certificate/ZMQBBOET",
                    skillsCovered = "Core Java, OOPs, Exception Handling, Collections"
                )
            )
            dao.insertCertification(
                CertificationEntity(
                    title = "Web Development Internship & Training",
                    issuer = "Corizo (in association with IIT Bombay Mood Indigo)",
                    issueDate = "Nov – Dec 2025",
                    credentialId = "CRZ136399",
                    verificationUrl = null,
                    skillsCovered = "Full-Stack Web Dev, Spring Boot, React, REST APIs"
                )
            )
            dao.insertCertification(
                CertificationEntity(
                    title = "Cybersecurity Analyst Job Simulation",
                    issuer = "Tata & Forage",
                    issueDate = "December 19, 2025",
                    credentialId = "6944d281d7a9b049d8ee1a94",
                    verificationUrl = null,
                    skillsCovered = "IAM Fundamentals, Strategy Assessment, Custom IAM Solutions, Platform Integration"
                )
            )
            dao.insertCertification(
                CertificationEntity(
                    title = "Big Data",
                    issuer = "Infosys Springboard",
                    issueDate = "Verified Credential",
                    credentialId = null,
                    verificationUrl = null,
                    skillsCovered = "Big Data Concepts, Data Processing, Distributed Analytics"
                )
            )
            dao.insertCertification(
                CertificationEntity(
                    title = "Introduction to Cybersecurity Awareness",
                    issuer = "HP LIFE & HP Foundation",
                    issueDate = "Verified Credential",
                    credentialId = null,
                    verificationUrl = null,
                    skillsCovered = "Cybersecurity Fundamentals, Threat Awareness, Digital Safety"
                )
            )
        }
    }
}
