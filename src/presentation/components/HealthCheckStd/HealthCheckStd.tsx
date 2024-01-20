// HealthCheckStd.tsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { StatusIndicator } from '..';
import { HealthCheck } from '@/util';
import { useTheme } from '@mui/material/styles';
import * as chroma from "chroma.ts";
import ReactMarkdown from 'react-markdown';

interface HealthCheckProps {
    healthCheck: HealthCheck;
}

export function HealthCheckStd({ healthCheck }: HealthCheckProps) {
  const theme = useTheme();

  return (
      <Paper sx={{
        padding : '1rem',
        width : '100%'
      }}>
        <Typography variant="subtitle2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          {healthCheck.health_check}
          <Box sx={{ flexGrow: 1 }} />
          <StatusIndicator status={healthCheck.status} size="sm" />
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          <ReactMarkdown>
            {healthCheck.reason}
          </ReactMarkdown>
        </Typography>
      </Paper>
  );
}
