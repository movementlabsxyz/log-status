// GeographicRegionDisplay.tsx
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { 
    FaGlobeAfrica,
    FaGlobeAmericas,
    FaGlobeAsia,
    FaGlobeEurope,
    FaGlobe, 
} from 'react-icons/fa';
import { GiAustralia } from 'react-icons/gi';
import { Region } from '@/util';

export const RegionToIcons : {
    [key in Region] : React.ReactNode
} = {
    Global: <FaGlobe />,
    'North America': <FaGlobeAmericas />,
    'South America': <FaGlobeAmericas />,
    Europe: <FaGlobeEurope />,
    Africa: <FaGlobeAfrica />,
    'Central Asia': <FaGlobeAsia />,
    'Southeast Asia': <FaGlobeAsia />,
    'East Asia': <FaGlobeAsia />,
    Oceania: <GiAustralia />
};

export type RegionStd = {
    region: Region;
}

export const RegionStd = ({ region }: RegionStd) => {
    const theme = useTheme();
    const IconComponent = RegionToIcons[region];
    const background = theme.palette.background.paper;

    return (
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            alignContent: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            backgroundColor: background, 
            padding: theme.spacing(1), 
            borderRadius: theme.shape.borderRadius, 
            marginRight: theme.spacing(2) 
        }}>
            {IconComponent}&ensp;
            <Typography variant="body2" color="textSecondary">
                {region}
            </Typography>
        </Box>
    );
};
