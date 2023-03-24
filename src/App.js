import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Login from "./pages/login";
import Reg from "./pages/reg";
import Homepage from "./pages/homepage"
import Explore from "./pages/explore"
import Bookmark_page from "./pages/bookmark_page"
import "./index.css";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Homepage />} 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/reg" 
          element={<Reg />} 
        />
        <Route 
          path="/explore" 
          element={<Explore />} 
        />
        <Route 
          path="/bookmark" 
          element={<Bookmark_page />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
