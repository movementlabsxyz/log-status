import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub'; // Replace with actual GitHub icon
import NoContactIcon from '@mui/icons-material/Block'; // Icon indicating no contact
import { StatusBulb, StatusBulbProps } from '../StatusBulb'; // Assuming StatusBulb is in the same directory
import * as chroma from "chroma.ts";
import { RegionStd } from "../RegionStd";
import { Region } from "@/util";
import { FaDiscord, FaAtlassian } from 'react-icons/fa';

interface HeaderStdProps {
    title: string;
    logoUrl: string;
    status: StatusBulbProps['status'];
    region: Region;
    contactOptions: {
        discord?: string;
        atlassian?: string;
        github?: string;
        email?: string;
    };
}

export function HeaderStd({ title, logoUrl, status, region, contactOptions }: HeaderStdProps) {
    const theme = useTheme();
    const { discord, atlassian, github, email } = contactOptions;
    const hasContact = discord || atlassian || github || email;
    const color = chroma.color(theme.palette.background.paper);
    const background = color.brighter(0.6);
    const logoBackground = color.brighter(1.5);

    return (
        <AppBar position="static" color="default" sx={{ 
            padding: theme.spacing(1),
            background: background.hex(),
            color: theme.palette.primary.main,
            width: '100vw',
        }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap : theme.spacing(2),
                }}>
                    <Box sx={{ 
                        borderRadius: theme.spacing(1),
                        background: logoBackground.hex(),
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        marginRight: theme.spacing(2),
                        padding: theme.spacing(1),
                        gap: theme.spacing(1),
                    }}>
                        <img src={logoUrl} alt="Logo" style={{ height: '34px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignContent : 'center', alignItems : 'center', gap: theme.spacing(1) }}>
                        <StatusBulb status={status} />
                        <Typography variant="h6">
                            {title}
                        </Typography>
                    </Box>
                    <RegionStd region={region} />
                    <Typography variant="body2" color="textSecondary">
                        Powered by LogStatus
                    </Typography>
                </Box>
                <Box>
                    {hasContact ? (
                        <>
                            {discord && <IconButton color="inherit"><FaDiscord /></IconButton>}
                            {atlassian && <IconButton color="inherit"><FaAtlassian /></IconButton>}
                            {github && <IconButton color="inherit"><GitHubIcon /></IconButton>}
                            {email && <IconButton color="inherit"><MailIcon /></IconButton>}
                        </>
                    ) : (
                        <IconButton color="inherit">
                            <NoContactIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

