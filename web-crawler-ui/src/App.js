import React, { useState } from 'react';
import axios from 'axios';
import URLTable from './components/URLTable';
import { Typography, TextField, Button, Box, Snackbar, Alert, Avatar } from '@mui/material';
import logo from './logo.svg';

function App() {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
  const handleAddUrl = async (e) => {
    e.preventDefault();
    const trimmedUrl = newUrl.trim();
    if (trimmedUrl === '') {
      return;
    }
    if (isValidURL(trimmedUrl) === false) {
      setError('Invalid URL format. Please enter a valid URL.');
      setShowError(true);
      return;
    }

    try {
      // Send the URL to the backend for analysis
      
      const response = await axios.post('http://localhost:8080/analyze', { url: trimmedUrl });
      // Add the entry with the data from the backend
      console.log('Response from backend:', response.data);
      setUrls(prevUrls => [...prevUrls, { ...response.data, status: 'done' }]);
      setNewUrl('');
    } catch (error) {
      console.error('Error analyzing URL:', error);
      setError('Failed to analyze URL. Please try again.');
      setShowError(true);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', p: 0, m: 0 }}>
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 6, pb: 3 }}>
        <Avatar src={logo} alt="Logo" sx={{ width: 80, height: 80, bgcolor: 'rgba(255, 255, 255, 0.1)', boxShadow: 3, mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#fff', mb: 2, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Web Crawler
        </Typography>
        <Box
          component="form"
          onSubmit={handleAddUrl}
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            maxWidth: 700,
            mb: 3,
            p: 3,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <TextField
            fullWidth
            label="Enter a website URL"
            variant="outlined"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 2,
              boxShadow: 1,
              input: { color: '#fff' },
              label: { color: '#bbb' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366f1',
                },
              },
            }}
            InputLabelProps={{ style: { color: '#bbb' } }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              px: 4,
              boxShadow: 3,
              background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
              whiteSpace: 'nowrap',
              minWidth: 140,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Add URL
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: 1, height: 'calc(100vh - 220px)' }}>
        <URLTable urls={urls} />
      </Box>
    </Box>
  );
}

export default App;