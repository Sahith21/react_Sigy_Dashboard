import React,{useState} from 'react'
import { API_URL } from '../../Data/ApiPath';

const Register = ({showLoginHandler}) => {

  const [username,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [error,seterror] = useState("");
  const [loding,setloading] = useState(true);

  const handlesubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,email,password})
      })
      const data = await response.json()
      if(response.ok){
        console.log(data);
        setusername("");
        setemail("");
        setpassword("");
        alert("Vendor registered successfully")
        showLoginHandler()
      }
    } catch (error) {
      console.error("registration failed",error)
      alert("Registration failed");
    }
  }

  return (
    <div className="registersection">
        <form className='Authform' onSubmit={handlesubmit}>
        <h3>Vendor Register</h3>
            <label>Username</label>
            <input type="text" name='username' value={username} onChange={(e)=>setusername(e.target.value)} placeholder='Enter Your username' /><br />
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter Your Email' /><br />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter your password' /><br />
            <div className="btnsubmit">
                <button type='submit'>Register</button>
            </div>

        </form>
    </div>
  )
}

export default Register