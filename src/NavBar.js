import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from "./assets/Logo.png";
import menuItems from './menuItems';
import MainItems from './MainItems';

const Navbar = () => {
  return (
    <nav className='backdrop-filter backdrop-blur-lg sticky top-0 border-b border-gray-200 bg-opacity-30'>
      <div class="container">
        <div class="brand">
          <div class="logo">
            <img src={logo} alt="" />
          </div>
          <div class="responsive-toggle">
            <i class="fas fa-bars"></i>
          </div>
        </div>

        <div class="links">
      <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MainItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;