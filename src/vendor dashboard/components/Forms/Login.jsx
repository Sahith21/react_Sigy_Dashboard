import React,{useState} from 'react'
import { API_URL } from '../../Data/ApiPath';

export const Login = ({showWelcomeHandler}) => {

  const [email,setemail] = useState("");
  const[password,setpassword] = useState("");

  const loginhandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({email,password})
      })
      const data = await response.json();
      if(response.ok){
        alert('Login success');
        showWelcomeHandler()
        setemail("");
        setpassword("");
        localStorage.setItem('loginToken',data.token)
      }
      const vendorid= data.vendorId;
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorid}`)
      const vendordata = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorfirmid = vendordata.vendorfirmid;
        const vendorfirmname = vendordata.vendor.firm[0].firmname;
        localStorage.setItem('firmId',vendorfirmid)
        localStorage.setItem('firmname',vendorfirmname);
        window.location.reload()
      }
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div className="loginsection">
        <form className='Authform' onSubmit={loginhandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} name='email' placeholder='Enter Your Email' /><br />
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} name='password' placeholder='Enter your password' /><br />
            <div className="btnsubmit">
                <button type='submit'>Login</button>
            </div>

        </form>
    </div>
  )
}

export default Login
