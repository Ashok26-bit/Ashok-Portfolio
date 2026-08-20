package com.example.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface PortfolioDao {

    // --- ARTWORKS ---
    @Query("SELECT * FROM artworks ORDER BY id DESC")
    fun getAllArtworks(): Flow<List<ArtworkEntity>>

    @Query("SELECT COUNT(*) FROM artworks")
    suspend fun getArtworkCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertArtwork(artwork: ArtworkEntity): Long

    @Update
    suspend fun updateArtwork(artwork: ArtworkEntity)

    @Query("DELETE FROM artworks WHERE id = :id")
    suspend fun deleteArtworkById(id: Long)


    // --- PROJECTS ---
    @Query("SELECT * FROM projects ORDER BY id ASC")
    fun getAllProjects(): Flow<List<ProjectEntity>>

    @Query("SELECT COUNT(*) FROM projects")
    suspend fun getProjectCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProject(project: ProjectEntity): Long

    @Update
    suspend fun updateProject(project: ProjectEntity)

    @Query("DELETE FROM projects WHERE id = :id")
    suspend fun deleteProjectById(id: Long)


    // --- SKILLS ---
    @Query("SELECT * FROM skills ORDER BY id ASC")
    fun getAllSkills(): Flow<List<SkillEntity>>

    @Query("SELECT COUNT(*) FROM skills")
    suspend fun getSkillCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSkill(skill: SkillEntity): Long

    @Update
    suspend fun updateSkill(skill: SkillEntity)

    @Query("DELETE FROM skills WHERE id = :id")
    suspend fun deleteSkillById(id: Long)


    // --- EXPERIENCES ---
    @Query("SELECT * FROM experiences ORDER BY id ASC")
    fun getAllExperiences(): Flow<List<ExperienceEntity>>

    @Query("SELECT COUNT(*) FROM experiences")
    suspend fun getExperienceCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExperience(experience: ExperienceEntity): Long

    @Update
    suspend fun updateExperience(experience: ExperienceEntity)

    @Query("DELETE FROM experiences WHERE id = :id")
    suspend fun deleteExperienceById(id: Long)


    // --- CERTIFICATIONS ---
    @Query("SELECT * FROM certifications ORDER BY id ASC")
    fun getAllCertifications(): Flow<List<CertificationEntity>>

    @Query("SELECT COUNT(*) FROM certifications")
    suspend fun getCertificationCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCertification(certification: CertificationEntity): Long

    @Update
    suspend fun updateCertification(certification: CertificationEntity)

    @Query("DELETE FROM certifications WHERE id = :id")
    suspend fun deleteCertificationById(id: Long)


    // --- CONTACT MESSAGES ---
    @Query("SELECT * FROM contact_messages ORDER BY id DESC")
    fun getAllContactMessages(): Flow<List<ContactMessageEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertContactMessage(message: ContactMessageEntity): Long

    @Query("UPDATE contact_messages SET isRead = 1 WHERE id = :id")
    suspend fun markMessageAsRead(id: Long)

    @Query("DELETE FROM contact_messages WHERE id = :id")
    suspend fun deleteContactMessageById(id: Long)

    @Query("SELECT COUNT(*) FROM contact_messages WHERE isRead = 0")
    fun getUnreadMessageCount(): Flow<Int>
}
