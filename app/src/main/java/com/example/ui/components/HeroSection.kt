package com.example.ui.components

import android.net.Uri
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
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
import androidx.compose.material.icons.filled.ArrowDownward
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.outlined.Code
import androidx.compose.material.icons.outlined.Send
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.R
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

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun HeroSection(
    profileImageUri: String? = null,
    onViewWorkClick: () -> Unit,
    onContactClick: () -> Unit,
    onEmailClick: () -> Unit,
    onLinkedInClick: () -> Unit,
    onGitHubClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .shadow(4.dp, shape = RoundedCornerShape(20.dp), spotColor = PrimaryBlueGrey.copy(alpha = 0.25f)),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = White),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.verticalGradient(listOf(CardBorderColor, LightBlueGreyBg)))
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(LightBlueGreyContainer, White)
                    )
                )
                .padding(20.dp)
        ) {
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Status Chip: Open for Full Stack Opportunities
                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = LightBlueGreyBg,
                    border = CardDefaults.outlinedCardBorder().copy(width = 1.dp, brush = Brush.horizontalGradient(listOf(PrimaryBlueGrey, PrimaryBlueGreyDark))),
                    modifier = Modifier.padding(bottom = 16.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(SuccessGreen)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Available for Full-Stack Roles & Internships",
                            style = MaterialTheme.typography.labelMedium.copy(
                                fontWeight = FontWeight.SemiBold,
                                color = DarkText,
                                fontSize = 11.sp
                            )
                        )
                    }
                }

                // Profile Image with decorative geometric blue-grey frame
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.padding(vertical = 4.dp)
                ) {
                    // Outer subtle ring
                    Box(
                        modifier = Modifier
                            .size(116.dp)
                            .clip(CircleShape)
                            .background(LightBlueGreyBg)
                            .border(2.dp, PrimaryBlueGrey, CircleShape)
                    )

                    // Inner profile avatar (Dynamic custom image or original portrait)
                    if (!profileImageUri.isNullOrBlank()) {
                        AsyncImage(
                            model = ImageRequest.Builder(context)
                                .data(Uri.parse(profileImageUri))
                                .crossfade(true)
                                .build(),
                            contentDescription = "Ashok K Profile Portrait",
                            modifier = Modifier
                                .size(104.dp)
                                .clip(CircleShape)
                                .border(2.dp, White, CircleShape),
                            contentScale = ContentScale.Crop
                        )
                    } else {
                        Image(
                            painter = painterResource(id = R.drawable.img_ashok_portrait),
                            contentDescription = "Ashok K Profile Portrait",
                            modifier = Modifier
                                .size(104.dp)
                                .clip(CircleShape)
                                .border(2.dp, White, CircleShape),
                            contentScale = ContentScale.Crop
                        )
                    }

                    // Monogram tech badge
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomEnd)
                            .size(30.dp)
                            .clip(CircleShape)
                            .background(PrimaryBlueGreyDark)
                            .border(2.dp, White, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Outlined.Code,
                            contentDescription = "Code",
                            tint = White,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                // Name
                Text(
                    text = "ASHOK K",
                    style = MaterialTheme.typography.displayLarge.copy(
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp,
                        color = DarkText
                    ),
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(4.dp))

                // Title Banner
                Text(
                    text = "Software Developer | Full Stack & App Development",
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = PrimaryBlueGreyDark
                    ),
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(8.dp))

                // Supporting Text
                Text(
                    text = "Building scalable full-stack applications and solving real-world problems through modern software technologies.",
                    style = MaterialTheme.typography.bodyLarge.copy(
                        lineHeight = 22.sp,
                        fontSize = 14.sp,
                        color = DarkText
                    ),
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(horizontal = 8.dp)
                )

                Spacer(modifier = Modifier.height(6.dp))

                // Academic detail
                Text(
                    text = "Computer Science and Engineering Student • M.A.M College of Engineering and Technology, Tamil Nadu",
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontSize = 12.sp,
                        color = SecondaryText,
                        fontWeight = FontWeight.Medium
                    ),
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(horizontal = 12.dp)
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Core Tech Tags
                FlowRow(
                    horizontalArrangement = Arrangement.Center,
                    verticalArrangement = Arrangement.spacedBy(6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    val keyPills = listOf("Java", "Spring Boot", "React", "REST APIs", "Android Studio", "MongoDB")
                    keyPills.forEach { pill ->
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = TagBgColor,
                            border = CardDefaults.outlinedCardBorder().copy(width = 0.5.dp, brush = Brush.horizontalGradient(listOf(CardBorderColor, PrimaryBlueGrey))),
                            modifier = Modifier.padding(horizontal = 3.dp)
                        ) {
                            Text(
                                text = pill,
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = FontWeight.SemiBold,
                                    fontSize = 11.sp,
                                    color = TagTextColor
                                ),
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // CTA Buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Button(
                        onClick = onViewWorkClick,
                        modifier = Modifier
                            .weight(1f)
                            .height(46.dp)
                            .testTag("hero_btn_view_work"),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = PrimaryBlueGreyDark,
                            contentColor = White
                        )
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "View My Work",
                                style = MaterialTheme.typography.labelLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = White
                                )
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Icon(
                                imageVector = Icons.Default.ArrowDownward,
                                contentDescription = null,
                                modifier = Modifier.size(16.dp),
                                tint = White
                            )
                        }
                    }

                    OutlinedButton(
                        onClick = onContactClick,
                        modifier = Modifier
                            .weight(1f)
                            .height(46.dp)
                            .testTag("hero_btn_contact_me"),
                        shape = RoundedCornerShape(12.dp),
                        border = ButtonDefaults.outlinedButtonBorder().copy(
                            brush = Brush.horizontalGradient(listOf(PrimaryBlueGreyDark, PrimaryBlueGrey))
                        ),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = DarkText
                        )
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Contact Me",
                                style = MaterialTheme.typography.labelLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = DarkText
                                )
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Icon(
                                imageVector = Icons.Outlined.Send,
                                contentDescription = null,
                                modifier = Modifier.size(15.dp),
                                tint = PrimaryBlueGreyDark
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Social Links Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // LinkedIn
                    SocialChip(
                        label = "LinkedIn",
                        onClick = onLinkedInClick,
                        tag = "hero_social_linkedin"
                    )

                    Spacer(modifier = Modifier.width(8.dp))

                    // GitHub
                    SocialChip(
                        label = "GitHub",
                        onClick = onGitHubClick,
                        tag = "hero_social_github"
                    )

                    Spacer(modifier = Modifier.width(8.dp))

                    // Email
                    SocialChip(
                        label = "Email",
                        onClick = onEmailClick,
                        tag = "hero_social_email"
                    )
                }
            }
        }
    }
}

@Composable
fun SocialChip(
    label: String,
    onClick: () -> Unit,
    tag: String
) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(LightBlueGreyBg)
            .border(1.dp, CardBorderColor, RoundedCornerShape(8.dp))
            .clickable { onClick() }
            .padding(horizontal = 10.dp, vertical = 6.dp)
            .testTag(tag)
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelMedium.copy(
                fontWeight = FontWeight.SemiBold,
                fontSize = 11.sp,
                color = DarkText
            )
        )
    }
}
