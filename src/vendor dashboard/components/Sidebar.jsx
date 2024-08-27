import React from 'react'

const Sidebar = ({showFirmHandler,showproductHandler,showallproductsHandler,showfirmtitle}) => {
  return (
    <div className="sidebarsection">
        <ul>
          {showfirmtitle ? <li onClick={showFirmHandler}>Add Firm</li> : "" }
            
            <li onClick={showproductHandler}>Add Product</li>
            <li onClick={showallproductsHandler}>All products</li>
            <li>User details</li>
        </ul>
    </div>
  )
}

export default Sidebar