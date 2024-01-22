import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  onPageChange? : (page: number) => void;
}

export function PageSelector({ currentPage, totalPages, onPageChange = ()=>{} }: PageSelectorProps) {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr 1fr',
      alignItems: 'center', 
      justifyItems: 'center',
      gap: 2 
    }}>
      <Button 
        variant="outlined" 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>

      <Typography>
        Page {currentPage} of {totalPages}
      </Typography>

      <Button 
        variant="outlined" 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </Box>
  );
}
