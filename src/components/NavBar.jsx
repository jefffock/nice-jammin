import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import MenuList from './MenuList'
import './../styles/NavBar.css'

function NavBar (props) {

  return (
    <nav>
      <div className="logo">
        Nice&nbsp;Jammin
      </div>
      <ul className="menu-items">
        <li>
          <NavLink to="artists">Home</NavLink>
        </li>
        <li>
          <NavLink to="top-contributors">Top&nbsp;Contributors</NavLink>
        </li>
        <li>
          <NavLink to="ideas">Ideas</NavLink>
        </li>
        <li>
          <NavLink to="account">Account</NavLink>
        </li>
        <li>
          <NavLink to="support">Support</NavLink>
        </li>
        <li>
          <NavLink to="sign-up">Sign&nbsp;Up</NavLink>
        </li>
        <li>
          <NavLink to="sign-in">Sign&nbsp;In</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar