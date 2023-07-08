import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { Feed } from './components';
import { NavBar } from './components';
import { VideoDetail } from './components';
import { ChannelDetail } from './components';
import { SearchFeed } from './components';
import { PageNotFound } from './components';


function App() {
  return (
    <BrowserRouter>
    <Box sx={{ background: "#000" }}>
      <NavBar/>
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail /> } />
        <Route path="/channel/:id" element={<ChannelDetail/> } />
        <Route path="/search/:searchTerm" element={<SearchFeed /> } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
