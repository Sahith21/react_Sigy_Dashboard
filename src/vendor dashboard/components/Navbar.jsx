import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showlogout,logoutHandler}) => {

  const firmname = localStorage.getItem("firmname");


  return (
    <div className="navsection">
      <div className="company">
        Vendor Dashboard
      </div>
      <div className="firmname">
        <h4>Firmname:{firmname}</h4>
      </div>
      <div className="userAuth">
        {!showlogout?<>
        <span onClick={showLoginHandler}>Login/</span>
        <span onClick={showRegisterHandler}>Register</span>
        </>:<span onClick={logoutHandler}>Logout</span>}
        
        
      </div>
    </div>
  )
}

export default Navbar