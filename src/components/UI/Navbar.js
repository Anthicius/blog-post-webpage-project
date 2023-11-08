import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/egles-knittings3.png";
import SearchBar from '../pages/PostPage/SearchBar';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../services/firebase/config';
import "./Navbar.css"



const Navbar = () => {

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
            <li>
              <SearchBar/>
            </li>
          </ul>
        </nav>
  )
}

export default Navbar