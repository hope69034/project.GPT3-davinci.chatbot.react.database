import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return(
  <>
    <Link to='/' style={{textDecoration: 'none',backgroundColor: "yellow" }}>InfoBot</Link>
    <Link to='/TalkBot' style={{textDecoration: 'none',backgroundColor: "violet" }}>TalkBot</Link>
  </>
  )
}

export default Navbar;
