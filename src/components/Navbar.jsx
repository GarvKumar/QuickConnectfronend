import React,{ useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    // Handle navigation in the parent component
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
    };


    return (
        <div className='navbar'>
            <span className="logo">Quick Connect</span>
            <div className="user">
                <img src={currentUser.avatar} alt="" />
                <span>{currentUser.Name}</span>
                <button onClick={handleLogout}>logout</button>
            </div>
        </div>
    );
}

export default Navbar;