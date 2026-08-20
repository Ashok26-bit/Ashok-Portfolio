package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val PortfolioColorScheme = lightColorScheme(
    primary = PrimaryBlueGreyDark,
    onPrimary = White,
    primaryContainer = LightBlueGreyBg,
    onPrimaryContainer = DarkText,
    secondary = PrimaryBlueGrey,
    onSecondary = DarkText,
    secondaryContainer = LightBlueGreyContainer,
    onSecondaryContainer = DarkText,
    tertiary = TagTextColor,
    onTertiary = White,
    background = BackgroundWhite,
    onBackground = DarkText,
    surface = SurfaceWhite,
    onSurface = DarkText,
    surfaceVariant = LightBlueGreyBg,
    onSurfaceVariant = SecondaryText,
    outline = CardBorderColor,
    outlineVariant = LightBlueGreyBg
)

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = PortfolioColorScheme,
        typography = Typography,
        content = content
    )
}
