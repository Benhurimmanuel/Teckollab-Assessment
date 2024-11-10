import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './LAYOUT';
import Home from './PAGES/HOME';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProviderWrapper } from './CONTEXT/themeContext.jsx';

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <CssBaseline />
        <Layout>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Layout>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
