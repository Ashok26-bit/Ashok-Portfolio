package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.DeveloperMode
import androidx.compose.material.icons.filled.Dns
import androidx.compose.material.icons.filled.Memory
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Speed
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.CardBorderColor
import com.example.ui.theme.DarkText
import com.example.ui.theme.LightBlueGreyBg
import com.example.ui.theme.LightBlueGreyContainer
import com.example.ui.theme.PrimaryBlueGrey
import com.example.ui.theme.PrimaryBlueGreyDark
import com.example.ui.theme.SecondaryText
import com.example.ui.theme.White

@Composable
fun AboutSection(modifier: Modifier = Modifier) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = White),
        border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = androidx.compose.ui.graphics.SolidColor(CardBorderColor))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp)
        ) {
            // Section Header
            SectionHeader(
                title = "About Me",
                subtitle = "Crafting Scalable Full-Stack Solutions with Engineering Rigor"
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Main about narrative
            Text(
                text = "I am a Software Developer | Full Stack & App Development and Computer Science and Engineering student at M.A.M College of Engineering and Technology (2023–2027), Tamil Nadu.",
                style = MaterialTheme.typography.bodyLarge.copy(
                    fontWeight = FontWeight.Medium,
                    color = DarkText,
                    lineHeight = 22.sp
                )
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "My core expertise centers around enterprise backend development with Java and Spring Boot, paired with modern responsive frontend web architecture using React and native mobile technologies. I specialize in designing REST APIs, structuring database schemas with MongoDB and SQL, and architecting scalable full-stack applications that solve real-world problems.",
                style = MaterialTheme.typography.bodyLarge.copy(
                    color = SecondaryText,
                    lineHeight = 22.sp
                )
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "With a solid foundation in Object-Oriented Programming (OOPs), Data Structures, Algorithms, and Database Management Systems (DBMS), I approach development with a strong focus on clean code, debugging efficiency, and dependable performance.",
                style = MaterialTheme.typography.bodyLarge.copy(
                    color = SecondaryText,
                    lineHeight = 22.sp
                )
            )

            Spacer(modifier = Modifier.height(20.dp))

            // Developer Highlights Cards Grid
            Text(
                text = "Core Competencies",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = DarkText
                )
            )

            Spacer(modifier = Modifier.height(12.dp))

            val highlights = listOf(
                HighlightData(
                    icon = Icons.Default.Dns,
                    title = "Backend & Spring Boot",
                    desc = "Robust RESTful controllers, service layers, and business logic using Java & Spring Boot."
                ),
                HighlightData(
                    icon = Icons.Default.DeveloperMode,
                    title = "Frontend & React",
                    desc = "Modern component-based user interfaces with state synchronization and responsive UI design."
                ),
                HighlightData(
                    icon = Icons.Default.BugReport,
                    title = "Debugging & Problem Solving",
                    desc = "Systematic root-cause identification, test-driven logic, and structural bug fixes."
                ),
                HighlightData(
                    icon = Icons.Default.Speed,
                    title = "Scalable Application Design",
                    desc = "Optimized database transactions, media cloud storage pipelines, and modular architecture."
                )
            )

            Column(
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                highlights.forEach { highlight ->
                    HighlightCard(highlight)
                }
            }
        }
    }
}

data class HighlightData(
    val icon: ImageVector,
    val title: String,
    val desc: String
)

@Composable
fun HighlightCard(item: HighlightData) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(LightBlueGreyContainer)
            .border(1.dp, CardBorderColor, RoundedCornerShape(14.dp))
            .padding(14.dp)
    ) {
        Row(
            verticalAlignment = Alignment.Top
        ) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(LightBlueGreyBg)
                    .border(1.dp, PrimaryBlueGrey, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = item.icon,
                    contentDescription = null,
                    tint = PrimaryBlueGreyDark,
                    modifier = Modifier.size(18.dp)
                )
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column {
                Text(
                    text = item.title,
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = DarkText
                    )
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = item.desc,
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontSize = 12.sp,
                        color = SecondaryText,
                        lineHeight = 17.sp
                    )
                )
            }
        }
    }
}

@Composable
fun SectionHeader(
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .width(4.dp)
                    .height(20.dp)
                    .clip(RoundedCornerShape(2.dp))
                    .background(PrimaryBlueGreyDark)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp,
                    color = DarkText
                )
            )
        }
        if (subtitle.isNotBlank()) {
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodyMedium.copy(
                    color = SecondaryText,
                    fontSize = 13.sp
                )
            )
        }
    }
}
