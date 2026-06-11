import React, { useState, useRef, useEffect } from 'react'; 
import adminlogo from '../../assets/Admin.jpeg'; 
import { Link, useNavigate } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5"; 
import { useAuth } from '../../Context/AuthContext';
import './Navbar.css'; 

const Navbar = () => { 
  const navigate = useNavigate(); 
  const { user, logout } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  
  const profileRef = useRef(null); 

  const handleLogout = async () => { 
    try {
      await logout(); 
    } catch (error) {
      console.error("Logout navigation intercept error:", error);
    } finally {
      setIsProfileOpen(false); 
      closeMobileMenu();
      navigate("/login"); 
    }
  };

  const closeMobileMenu = () => { 
    setIsMobileMenuOpen(false); 
  }; 

  useEffect(() => { 
    const handleClickOutside = (event) => { 
      if (profileRef.current && !profileRef.current.contains(event.target)) { 
        setIsProfileOpen(false); 
      } 
    }; 
    document.addEventListener("mousedown", handleClickOutside); 
    return () => document.removeEventListener("mousedown", handleClickOutside); 
  }, []); 

  return ( 
    <nav className="navbar"> 
      <div className="nav-brand-container"> 
        <button 
          className="hamburger-btn" 
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        > 
          {isMobileMenuOpen ? <IoClose /> : <IoMenu />} 
        </button> 
        <Link to="/" className="nav-brand" onClick={closeMobileMenu}>CRITIVERSE</Link> 
      </div> 

      <div className={`nav-collapse-menu ${isMobileMenuOpen ? 'active' : ''}`}> 
        <div className="nav-links"> 
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link> 
          <Link to="/browse" className="nav-link" onClick={closeMobileMenu}>Browse Games</Link> 
          <Link to="/about" className="nav-link" onClick={closeMobileMenu}>About</Link> 
        </div> 
      </div>

      <div className="nav-static-actions"> 
        {!user ? ( 
          <> 
            <Link to="/login" className="nav-link nav-login-desktop" onClick={closeMobileMenu}>Sign In</Link> 
            <Link to="/signup" onClick={closeMobileMenu}> 
              <button className="nav-btn">Sign Up</button> 
            </Link> 
          </> 
        ) : (
          <div className="profile-wrapper" ref={profileRef}> 
            <div className="profile-trigger" onClick={() => setIsProfileOpen(!isProfileOpen)}> 
              <img 
                src={user.role === 'admin' ? adminlogo : (user.avatarURL || user.avatar)} 
                alt="Profile" 
                className="profile-avatar" 
                loading="lazy"
              /> 
            </div> 
            {isProfileOpen && (
              <div className="profile-dropdown-menu">
               
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="dropdown-link"
                    onClick={() => {
                      setIsProfileOpen(false);
                      closeMobileMenu();
                    }}
                  >
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="dropdown-link"
                  onClick={() => {
                    setIsProfileOpen(false);
                    closeMobileMenu();
                  }}
                >
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/myreviews"
                  className="dropdown-link"
                  onClick={() => {
                    setIsProfileOpen(false);
                    closeMobileMenu();
                  }}
                >
                  <span>My Reviews</span>
                </Link>

                <Link
                  to="/mylist"
                  className="dropdown-link"
                  onClick={() => {
                    setIsProfileOpen(false);
                    closeMobileMenu();
                  }}
                >
                  <span>My Lists</span>
                </Link>

                <div className="dropdown-divider"></div>

                <button
                  onClick={handleLogout}
                  className="dropdown-link logout-btn"
                >
                  <span>LogOut</span>
                </button>
              </div>
            )}
          </div>
        )} 
      </div> 
    </nav> 
  ); 
}; 

export default Navbar;
