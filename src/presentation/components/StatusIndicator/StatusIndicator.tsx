import React from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StatusIndicatorProps extends BoxProps {
  status: 'PASS' | 'FAIL';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 'md', ...boxProps }) => {
  const isPass = status === 'PASS';

  const sizeStyles = {
    sm: { fontSize: '0.75rem', padding: '2px 6px' },
    md: { fontSize: '1rem', padding: '4px 8px' },
    lg: { fontSize: '1.25rem', padding: '6px 10px' },
    xl: { fontSize: '1.5rem', padding: '8px 12px' },
  }[size];

  const theme = useTheme();

  return (
    <Box
      {...boxProps}
      sx={{
        backgroundColor: isPass ? theme.palette.success.light : theme.palette.error.light,
        color: isPass ? theme.palette.success.contrastText : theme.palette.error.contrastText,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sizeStyles,
        ...boxProps.sx,
      }}
    >
      <Typography variant="body1" component="span">
        {status}
      </Typography>
    </Box>
  );
};
