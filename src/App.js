import "./App.css";
import HomePage from "./components/pages/HomePage/HomePage";
import { auth } from "./services/firebase/config";
import { useEffect, useState } from "react";
import AboutPage from "./components/pages/AboutPage/AboutPage";
import PostPage from "./components/pages/PostPage/PostPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePostPage from "./components/pages/CreatePostPage.js/CreatePostPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import logo from "./assets/images/egles-knittings3.png";
import facebookIcon from "./assets/images/facebook.png"
import instagramIcon from "./assets/images/instagram.png"
import { onAuthStateChanged, signOut } from "firebase/auth";
import ContactPage from "./components/pages/ContactPage/ContactPage";
import EditPostPage from "./components/pages/PostPage/EditPostPage";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Sign-out error: ", error);
      });
  };

  return (
    <Router>
      <div className="wrapper">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <ul className="ul-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contacts</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/create">Create Post</Link>
                </li>
                <li>
                  <button className="log-out" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
