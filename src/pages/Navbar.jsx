import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navOptions= <>
     <li><Link to='/'>Home</Link></li>
     <li><Link to='/menu'>Menu</Link></li>
 
    <li><a>Item 3</a></li>
    </>
    return (
        <div className="navbar fixed z-10  bg-opacity-30 bg-black text-white max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        
            </div>
           
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    );
};

export default Navbar;