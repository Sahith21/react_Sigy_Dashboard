import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/Forms/Login'
import Register from '../components/Forms/Register'
import Addfirm from '../components/Forms/Addfirm'
import Addproducts from '../components/Forms/Addproducts'
import Welcome from '../components/Welcome'
import Allproducts from '../components/Allproducts'



const Landingpage = () => {
  const [showLogin,setshowLogin] = useState(false)
  const [showRegister,setshowRegister] = useState(false)
  const [showFirm,setshowFirm] = useState(false)
  const [showproduct,setshowproduct]= useState(false)
  const [showWelcome,setshowWelcome]= useState(false)
  const [showallproducts,setshowallproducts] = useState(false)
  const [showlogout,setshowlogout]= useState(false)
  const [showfirmtitle,setshowfirmtitle]= useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setshowlogout(true)
    }
  },[])

  useEffect(()=>{
    const firmname = localStorage.getItem('firmname');
    if(firmname){
      setshowfirmtitle(false)
    }
  },[])

  const logoutHandler =()=>{
    confirm("Are you sure to logout?")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmname");
    setshowlogout(false)
    setshowfirmtitle(true) 
  }

  const showLoginHandler = () =>{
    setshowLogin(true)
    setshowRegister(false)
    setshowFirm(false)
    setshowproduct(false)
    setshowWelcome(false)
    setshowallproducts(false)
  }

  const showRegisterHandler = () =>{
    setshowRegister(true)
    setshowLogin(false)
    setshowFirm(false)
    setshowproduct(false)
    setshowWelcome(false)
    setshowallproducts(false)
  }
  const showFirmHandler = () =>{
    if(showlogout){
          setshowLogin(false)
          setshowRegister(false)
          setshowFirm(true)
          setshowproduct(false)
          setshowWelcome(false)
          setshowallproducts(false)
    }else{
            alert("please Login");
            setshowLogin(true)
    }
  }
  const showproductHandler = () =>{
    if(showlogout){
      setshowLogin(false)
      setshowRegister(false)
      setshowFirm(false)
      setshowproduct(true)
      setshowWelcome(false)
      setshowallproducts(false)
    }else{
      alert("please Login");
      setshowLogin(true)
    }
    
  }
  const showWelcomeHandler = () =>{
    setshowLogin(false)
    setshowRegister(false)
    setshowFirm(false)
    setshowproduct(false)
    setshowWelcome(true)
    setshowallproducts(false)
  }
  const showallproductsHandler = () =>{
    if(showlogout){
      setshowLogin(false)
      setshowRegister(false)
      setshowFirm(false)
      setshowproduct(false)
      setshowWelcome(false)
      setshowallproducts(true)
    }else{
        alert("please Login");
            setshowLogin(true)
    }
    
  }



  return (
    <>
        <section className='landingsection'>
            <Navbar showLoginHandler = {showLoginHandler}  showRegisterHandler = {showRegisterHandler} showlogout={showlogout} logoutHandler ={logoutHandler}/>
            <div className="collectionsection">
            
                <Sidebar showFirmHandler = {showFirmHandler} showproductHandler ={showproductHandler}  showallproductsHandler= {showallproductsHandler} showfirmtitle ={showfirmtitle}/>
                {showLogin && <Login  showWelcomeHandler = {showWelcomeHandler}  />}
                {showRegister && <Register showLoginHandler= {showLoginHandler} />}
                {showFirm && showlogout && <Addfirm />}
                {showproduct && showlogout && <Addproducts />}
                {showWelcome && <Welcome />}
                {showallproducts && showlogout && <Allproducts />}
                
            </div>
            
        </section>
    </>
  )
}

export default Landingpage