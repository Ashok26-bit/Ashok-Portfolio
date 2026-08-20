package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Work
import androidx.compose.material.icons.outlined.Assessment
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.Construction
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.CardBorderColor
import com.example.ui.theme.DarkText
import com.example.ui.theme.LightBlueGreyBg
import com.example.ui.theme.PrimaryBlueGrey
import com.example.ui.theme.PrimaryBlueGreyDark
import com.example.ui.theme.SecondaryText
import com.example.ui.theme.White

data class NavSectionItem(
    val id: String,
    val title: String,
    val icon: ImageVector,
    val targetIndex: Int
)

val NAV_SECTIONS = listOf(
    NavSectionItem("home", "Home", Icons.Default.Person, 0),
    NavSectionItem("about", "About", Icons.Default.Person, 1),
    NavSectionItem("skills", "Skills", Icons.Outlined.Construction, 2),
    NavSectionItem("experience", "Experience", Icons.Default.Work, 3),
    NavSectionItem("projects", "Projects", Icons.Default.Code, 4),
    NavSectionItem("art", "Art", Icons.Default.Palette, 5),
    NavSectionItem("education", "Education", Icons.Default.School, 6),
    NavSectionItem("certifications", "Certifications", Icons.Outlined.CheckCircle, 7),
    NavSectionItem("contact", "Contact", Icons.Default.Email, 8)
)

@Composable
fun TopNavBar(
    activeSectionIndex: Int,
    isAdminLoggedIn: Boolean,
    unreadMessageCount: Int,
    onSectionClick: (Int) -> Unit,
    onEmailClick: () -> Unit,
    onSettingsClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier
            .fillMaxWidth()
            .shadow(elevation = 3.dp, spotColor = PrimaryBlueGrey.copy(alpha = 0.3f)),
        color = White,
        tonalElevation = 1.dp
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 10.dp)
        ) {
            // Top branding row
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                // Logo & Name
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .clickable { onSectionClick(0) }
                        .padding(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(34.dp)
                            .clip(CircleShape)
                            .background(LightBlueGreyBg)
                            .border(1.5.dp, PrimaryBlueGrey, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "AK",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = PrimaryBlueGreyDark
                        )
                    }

                    Spacer(modifier = Modifier.width(10.dp))

                    Column {
                        Text(
                            text = "Ashok K",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = DarkText
                            )
                        )
                        Text(
                            text = "Java Full Stack Developer",
                            style = MaterialTheme.typography.labelMedium.copy(
                                fontSize = 11.sp,
                                color = SecondaryText
                            )
                        )
                    }
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    // Settings / Admin Button
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (isAdminLoggedIn) PrimaryBlueGreyDark else LightBlueGreyBg)
                            .border(1.dp, PrimaryBlueGrey, RoundedCornerShape(20.dp))
                            .clickable { onSettingsClick() }
                            .padding(horizontal = 10.dp, vertical = 6.dp)
                            .testTag("nav_btn_settings")
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = if (isAdminLoggedIn) "Admin Mode" else "Settings",
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = FontWeight.SemiBold,
                                    color = if (isAdminLoggedIn) White else DarkText,
                                    fontSize = 11.sp
                                )
                            )
                            if (unreadMessageCount > 0) {
                                Spacer(modifier = Modifier.width(4.dp))
                                Box(
                                    modifier = Modifier
                                        .size(16.dp)
                                        .clip(CircleShape)
                                        .background(if (isAdminLoggedIn) White else PrimaryBlueGreyDark),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "$unreadMessageCount",
                                        color = if (isAdminLoggedIn) PrimaryBlueGreyDark else White,
                                        fontSize = 9.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }
                        }
                    }

                    // Quick Contact Action
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(LightBlueGreyBg)
                            .border(1.dp, PrimaryBlueGrey, RoundedCornerShape(20.dp))
                            .clickable { onEmailClick() }
                            .padding(horizontal = 10.dp, vertical = 6.dp)
                            .testTag("nav_quick_contact")
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Email,
                                contentDescription = "Contact Ashok",
                                tint = PrimaryBlueGreyDark,
                                modifier = Modifier.size(13.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "Contact",
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = FontWeight.SemiBold,
                                    color = DarkText,
                                    fontSize = 11.sp
                                )
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Scrollable section navigation pills
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState())
                    .padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                NAV_SECTIONS.forEach { item ->
                    val isSelected = activeSectionIndex == item.targetIndex
                    val pillBg = if (isSelected) PrimaryBlueGrey else LightBlueGreyBg
                    val pillTextColor = if (isSelected) White else DarkText
                    val pillBorder = if (isSelected) PrimaryBlueGreyDark else CardBorderColor

                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(16.dp))
                            .background(pillBg)
                            .border(1.dp, pillBorder, RoundedCornerShape(16.dp))
                            .clickable { onSectionClick(item.targetIndex) }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                            .testTag("nav_pill_${item.id}"),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = item.icon,
                                contentDescription = null,
                                tint = if (isSelected) White else SecondaryText,
                                modifier = Modifier.size(13.dp)
                            )
                            Spacer(modifier = Modifier.width(5.dp))
                            Text(
                                text = item.title,
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                    color = pillTextColor,
                                    fontSize = 12.sp
                                )
                            )
                        }
                    }
                }
            }
        }
    }
}
