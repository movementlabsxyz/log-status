// StatusBulb.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';

export interface StatusBulbProps {
    status: 'success' | 'warning' | 'error';
}

export function StatusBulb({ status }: StatusBulbProps) {
    const theme = useTheme();
    
    // Determine the color based on the status
    let color;
    switch (status) {
        case 'success':
            color = theme.palette.success.main;
            break;
        case 'warning':
            color = theme.palette.warning.main;
            break;
        case 'error':
            color = theme.palette.error.main;
            break;
        default:
            color = theme.palette.grey[500]; // Default color
    }

    // Keyframes for fading animation
    const fade = keyframes`
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    `;

    return (
        <Box sx={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            backgroundColor: color,
            marginLeft: theme.spacing(1),
            animation: `${fade} 2s ease-in-out infinite` // Apply the fade animation
        }} />
    );
}
