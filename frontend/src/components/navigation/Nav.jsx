import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faVideo, faGear, faSquarePollHorizontal, faUser, faBars, faTimes, } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../../assets/Logo.png"; // Import the logo image
import logo2Img from "../../assets/Logo2.png"; // Import the second logo image


const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <nav className="upandsidebar">
            {user && (
                <div className="upperbar">
                    <div className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <NavLink className='nav-childs logout' to="/" onClick={handleLogout}>Logout</NavLink>
                </div>
            )}
            {user && (
                <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <NavLink to="/dashboard"><img src={logoImg} alt="TINY TRACKS" /></NavLink>
                        <div className="close-sidebar" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                    <NavLink className='nav-childs' to="/dashboard"><FontAwesomeIcon icon={faUser} /> Dashboard</NavLink>
                    <NavLink className='nav-childs' to="/recorded-videos"><FontAwesomeIcon icon={faVideo} /> Recorded Videos</NavLink>
                    <NavLink className='nav-childs' to="/settings"><FontAwesomeIcon icon={faGear} /> Settings</NavLink>
                </div>
            )}
            {!user && window.location.pathname !== '/' && <NavLink className="logo" to="/"><img src={logo2Img} alt="TINY TRACKS" /></NavLink>}
        </nav>
    );
};

export default Nav;