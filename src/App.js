import "./App.css";
import HomePage from "./components/pages/HomePage/HomePage";
import AboutPage from "./components/pages/AboutPage/AboutPage";
import PostPage from "./components/pages/PostPage/PostPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePostPage from "./components/pages/CreatePostPage.js/CreatePostPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import facebookIcon from "./assets/images/facebook.png"
import instagramIcon from "./assets/images/instagram.png"
import ContactPage from "./components/pages/ContactPage/ContactPage";
import EditPostPage from "./components/pages/PostPage/EditPostPage";
import SearchResults from "./components/pages/PostPage/SearchResults";
import Navbar from "./components/UI/Navbar";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar/>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search/:id" element={<SearchResults />} />
            <Route path="/post/:id/edit" element={<EditPostPage />} />
          </Routes>
        </div>
        <footer className="footer">
          <div className="footer-links">
            <a
              href="https://www.facebook.com/egle.znutaite"
              target="_blank"
              rel="noopener noreferrer"
            >
          <img className="footer-icons" src={facebookIcon} alt="Facebook" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/witches_corner_by_egle"
              target="_blank"
              rel="noopener noreferrer"
            >
            <img className="footer-icons" src={instagramIcon} alt="Instagram" />
              Instagram
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
