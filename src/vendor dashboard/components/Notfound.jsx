import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <>
    <div className="errorsection">
        <h1>404</h1>
        <div>Page Not Found</div>
    <Link to="/" className='errorsectionlink'>
        <p style={{margin:'0'}}>Go back</p>
    </Link>
    </div>
    </>
  )
}

export default Notfound