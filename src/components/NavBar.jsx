import { React, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './../styles/NavBar.css'

function NavBar (props) {

  let [menuIsOpen, setMenuIsOpen] = useState(false)

  let activeStyle = {
    textDecoration: "underline"
  };

  return (
    <>
    <nav>
      <div className="logo">
        <Link to="artists" style={{ textDecoration: 'none' }}>
          <h1>Nice&nbsp;Jammin</h1>
        </Link>
      </div>
      <ul className="menu-items">
        <li>
          <NavLink to="artists" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } end>Home</NavLink>
        </li>
        <li>
          <NavLink to="top-contributors" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Top&nbsp;Contributors</NavLink>
        </li>
        <li>
          <NavLink to="ideas" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Ideas</NavLink>
        </li>
        <li>
          <NavLink to="support" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Support</NavLink>
        </li>
        {props.user &&
        <>
        <li>
          <NavLink to="account" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Account</NavLink>
        </li>
        <li>
          <NavLink to="/logout" >Sign&nbsp;Out</NavLink>
        </li>
        </>}
        {!props.user &&
        <>
          <li className="sign-up-nav-button">
            <NavLink to="sign-up">Sign&nbsp;Up</NavLink>
          </li>
          <li className="sign-in-nav-button">
            <NavLink to="sign-in">Sign&nbsp;In</NavLink>
          </li>
        </>}
      </ul>
        <div className={menuIsOpen ? "menu-button open" : "menu-button close"} onClick={() => {setMenuIsOpen(!menuIsOpen)}}>
          <div className={menuIsOpen ? "menu-button-burger open" : "menu-button-burger close"}></div>
        </div>
    </nav>
    </>
  )
}

export default NavBar