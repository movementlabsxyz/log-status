import React, { useState } from 'react';
import { HealthCheck } from '@/util';
import { HealthCheckStd } from '../HealthCheckStd';
import { StatusIndicator } from '../StatusIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as chroma from "chroma.ts";

interface HealthCheckGroupProps {
  healthChecks: HealthCheck[];
  group: string;
}

export function HealthCheckGroupStd({ healthChecks, group }: HealthCheckGroupProps) {
    const theme = useTheme();
    const background = chroma.color(theme.palette.background.paper).brighter(0.4);

    const [expanded, setExpanded] = useState<boolean>(false);

    const totalChecks = healthChecks.length;
    const passingChecks = healthChecks.filter(check => check.status === 'PASS').length;
    const allPassing = totalChecks === passingChecks;

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Accordion sx={{
            width: '100%',
            background: background.hex(),
            borderRadius: theme.spacing(.5),
        }} expanded={expanded} onChange={handleExpand}>
            <AccordionSummary 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    gap: theme.spacing(1),
                }}
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}>
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 2fr',
                    alignItems: 'center', 
                    gap: theme.spacing(2) 
                }}>
                    <Typography variant="subtitle1">
                        {group}
                    </Typography>
                    <StatusIndicator size='sm' status={allPassing ? 'PASS' : 'FAIL'} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {passingChecks}/{totalChecks} checks passing
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: 'column', gap: 2 }}>
                {healthChecks.map((check, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <HealthCheckStd healthCheck={check} />
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
}
