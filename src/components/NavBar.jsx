import { React, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './../styles/NavBar.css'

function NavBar (props) {

  let [menuIsOpen, setMenuIsOpen] = useState(false)
  let navigate = useNavigate()

  let activeStyle = {
    textDecoration: "underline"
  };

  function handleBurgerClick() {
    setMenuIsOpen(!menuIsOpen)
    let body = document.body;
    body.classList.toggle('disable-scroll')
  }

  function handleMenuItemClick() {
    if (menuIsOpen) {
      let body = document.body;
      body.classList.toggle('disable-scroll')
    } setMenuIsOpen(false)
  }

  function handleHomeClick() {
    props.setArtist(null)
    props.setSong(null)
    props.setVersion(null)
    if (menuIsOpen) {
      let body = document.body;
      body.classList.toggle('disable-scroll')
    } setMenuIsOpen(false)
  }

  function handleSignOutClick() {
    if (menuIsOpen) {
      let body = document.body;
      body.classList.toggle('disable-scroll')
    } setMenuIsOpen(false)
    signOut()
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('error', error)
    } else {
      navigate('/')
    }
  }

  return (
    <>
    <nav className={menuIsOpen ? "nav-open" : "nav-close"}>
      <div className="logo" onClick={handleHomeClick}>
        <Link to="artists" style={{ textDecoration: 'none' }}>
          <h1>nice&nbsp;jammin</h1>
        </Link>
      </div>
      <ul className={menuIsOpen ? "menu-items open" : "menu-items close"}>
        <li onClick={handleHomeClick}>
          <NavLink to="artists" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } end>home</NavLink>
        </li>
        <li onClick={handleMenuItemClick}>
          <NavLink to="top-contributors" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>top&nbsp;contributors</NavLink>
        </li>
        <li onClick={handleMenuItemClick}>
          <NavLink to="ideas" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>ideas</NavLink>
        </li>
        <li onClick={handleMenuItemClick}>
          <NavLink to="about" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>about</NavLink>
        </li>
        {props.user &&
        <>
        <li onClick={handleMenuItemClick}>
          <NavLink to="account" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>account</NavLink>
        </li>
        <li onClick={handleSignOutClick}>
          <NavLink to="/">sign out</NavLink></li>
        </>}
        {!props.user &&
        <>
          <li className="sign-up-nav-button" onClick={handleMenuItemClick}>
            <NavLink to="sign-up">sign&nbsp;up</NavLink>
          </li>
          <li className="sign-in-nav-button" onClick={handleMenuItemClick}>
            <NavLink to="sign-in">sign&nbsp;in</NavLink>
          </li>
        </>}
      </ul>
        <div className={menuIsOpen ? "menu-button open" : "menu-button close"} onClick={handleBurgerClick}>
          <div className={menuIsOpen ? "menu-button-burger open" : "menu-button-burger close"}></div>
        </div>
    </nav>
    </>
  )
}

export default NavBar