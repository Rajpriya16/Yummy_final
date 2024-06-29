import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Login() {
  const[credentials,setcredentials]=useState({email:"",password:""})
  let navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json()
        console.log(json);
        if(!json.success){
            alert("Enter Valid credentials")
        }
        if(json.success){
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"))
          navigate("/");
      }
    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]: event.target.value})
    }
  return (
    <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ color: 'black', marginTop: '30px' }}>Login Page</h1>
            <div className='container' style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', width: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>New user sign-up</Link>
                </form>
            </div>
        </div>
  )
}
