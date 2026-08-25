package com.example.ui.components

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
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.outlined.AlternateEmail
import androidx.compose.material.icons.outlined.Mail
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
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
import com.example.ui.theme.SuccessGreen
import com.example.ui.theme.White

@Composable
fun ContactSection(
    name: String,
    email: String,
    subject: String,
    message: String,
    formError: String?,
    showSuccessDialog: Boolean,
    onNameChange: (String) -> Unit,
    onEmailChange: (String) -> Unit,
    onSubjectChange: (String) -> Unit,
    onMessageChange: (String) -> Unit,
    onSubmitForm: () -> Unit,
    onDismissSuccessDialog: () -> Unit,
    onCopyEmail: () -> Unit,
    onEmailAppLaunch: () -> Unit,
    onLinkedInClick: () -> Unit,
    onGitHubClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    if (showSuccessDialog) {
        AlertDialog(
            onDismissRequest = onDismissSuccessDialog,
            icon = {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = SuccessGreen,
                    modifier = Modifier.size(36.dp)
                )
            },
            title = {
                Text(
                    text = "Message Prepared",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = DarkText
                    )
                )
            },
            text = {
                Column {
                    Text(
                        text = "Thank you, $name! Your message has been formatted. You can also send this directly via your email client to Ashok.",
                        style = MaterialTheme.typography.bodyMedium.copy(
                            color = DarkText,
                            lineHeight = 20.sp
                        )
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Recipient: ashokk.profile.in@gmail.com",
                        style = MaterialTheme.typography.labelMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = PrimaryBlueGreyDark
                        )
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        onDismissSuccessDialog()
                        onEmailAppLaunch()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlueGreyDark)
                ) {
                    Text("Open Email Client")
                }
            },
            dismissButton = {
                TextButton(onClick = onDismissSuccessDialog) {
                    Text("Done", color = SecondaryText)
                }
            }
        )
    }

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
            SectionHeader(
                title = "Contact Ashok K",
                subtitle = "Let's Discuss Full-Stack Opportunities, Projects, or Collaboration"
            )

            Spacer(modifier = Modifier.height(18.dp))

            // Direct Contact Cards
            Column(
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                ContactDirectRow(
                    icon = Icons.Outlined.Mail,
                    label = "Email Address",
                    value = "ashokk.profile.in@gmail.com",
                    actionLabel = "Copy",
                    onAction = onCopyEmail,
                    onRowClick = onEmailAppLaunch
                )

                ContactDirectRow(
                    icon = Icons.Default.Email,
                    label = "LinkedIn Profile",
                    value = "linkedin.com/in/ashok-k-cse",
                    actionLabel = "Open",
                    onAction = onLinkedInClick,
                    onRowClick = onLinkedInClick
                )

                ContactDirectRow(
                    icon = Icons.Outlined.AlternateEmail,
                    label = "GitHub Portfolio",
                    value = "github.com/Ashok-K-27",
                    actionLabel = "Open",
                    onAction = onGitHubClick,
                    onRowClick = onGitHubClick
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Contact Form Card
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(LightBlueGreyContainer)
                    .border(1.dp, CardBorderColor, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column(modifier = Modifier.fillMaxWidth()) {
                    Text(
                        text = "Send a Direct Message",
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                            color = DarkText
                        )
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Fill out the fields below with your inquiry.",
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontSize = 12.sp,
                            color = SecondaryText
                        )
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    // Name Input
                    OutlinedTextField(
                        value = name,
                        onValueChange = onNameChange,
                        label = { Text("Your Full Name *") },
                        placeholder = { Text("e.g. John Doe") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("contact_input_name"),
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

                    // Email Input
                    OutlinedTextField(
                        value = email,
                        onValueChange = onEmailChange,
                        label = { Text("Your Email Address *") },
                        placeholder = { Text("e.g. contact@company.com") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("contact_input_email"),
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

                    // Subject Input
                    OutlinedTextField(
                        value = subject,
                        onValueChange = onSubjectChange,
                        label = { Text("Subject *") },
                        placeholder = { Text("e.g. Full-Stack Developer Role / Project Collaboration") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("contact_input_subject"),
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

                    // Message Input
                    OutlinedTextField(
                        value = message,
                        onValueChange = onMessageChange,
                        label = { Text("Your Message *") },
                        placeholder = { Text("Write your message here...") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .heightIn(min = 100.dp)
                            .testTag("contact_input_message"),
                        shape = RoundedCornerShape(10.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = PrimaryBlueGreyDark,
                            unfocusedBorderColor = CardBorderColor,
                            focusedContainerColor = White,
                            unfocusedContainerColor = White
                        ),
                        maxLines = 5
                    )

                    if (formError != null) {
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = formError,
                            color = MaterialTheme.colorScheme.error,
                            style = MaterialTheme.typography.labelMedium
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Send Button
                    Button(
                        onClick = onSubmitForm,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(46.dp)
                            .testTag("contact_btn_send"),
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
                                text = "Send Message",
                                style = MaterialTheme.typography.labelLarge.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = White
                                )
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Icon(
                                imageVector = Icons.Default.Send,
                                contentDescription = null,
                                modifier = Modifier.size(16.dp),
                                tint = White
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ContactDirectRow(
    icon: ImageVector,
    label: String,
    value: String,
    actionLabel: String,
    onAction: () -> Unit,
    onRowClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(LightBlueGreyContainer)
            .border(1.dp, CardBorderColor, RoundedCornerShape(12.dp))
            .clickable { onRowClick() }
            .padding(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.weight(1f)
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
                        imageVector = icon,
                        contentDescription = null,
                        tint = PrimaryBlueGreyDark,
                        modifier = Modifier.size(16.dp)
                    )
                }

                Spacer(modifier = Modifier.width(10.dp))

                Column {
                    Text(
                        text = label,
                        style = MaterialTheme.typography.labelMedium.copy(
                            fontSize = 11.sp,
                            color = SecondaryText
                        )
                    )
                    Text(
                        text = value,
                        style = MaterialTheme.typography.labelLarge.copy(
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = DarkText
                        )
                    )
                }
            }

            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(White)
                    .border(1.dp, PrimaryBlueGrey, RoundedCornerShape(8.dp))
                    .clickable { onAction() }
                    .padding(horizontal = 10.dp, vertical = 5.dp)
            ) {
                Text(
                    text = actionLabel,
                    style = MaterialTheme.typography.labelMedium.copy(
                        fontWeight = FontWeight.Bold,
                        fontSize = 11.sp,
                        color = PrimaryBlueGreyDark
                    )
                )
            }
        }
    }
}
