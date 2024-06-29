import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ContextReducer';


export default function Navbar() {
    
    const navigate=useNavigate();
    const [cartView,setCartView]=useState(false)
    let data=useCart();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
        <Link className="navbar-brand fs-1 text-dark" to="/">YUMMY</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item d-flex align-items-center"> 
            <p className="nav-link active fs-5 mb-0 text-dark" aria-current="page" to="/">Where Taste Matters</p>
            </li>
        </ul>
        {(!localStorage.getItem("authToken"))?
            <div className="d-flex">
                
            </div>:
            <div>
            <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item d-flex align-items-center"> {/* Added d-flex and align-items-center classes */}
            <p className="nav-link active fs-5 mb-0 text-dark" aria-current="page" to="/">Welcome Foodie{"       "}</p>
            </li>
        </ul>
            </div>
        }
        {(!localStorage.getItem("authToken")) ? (
    <div className="d-flex">
        <Link className="btn btn-dark mx-1" to="/login">Login</Link>
        <Link className="btn btn-dark mx-1" to="/createuser">SignUp</Link>
    </div>
) : (
    <div>
        <div className="btn btn-dark text-white mx-2" onClick={() => setCartView(true)}>
            Cart{' '}
            <span className="badge bg-danger">{data.length}</span>
        </div>
        {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
        <div className="btn btn-dark text-white mx-2" onClick={handleLogout}>Logout</div>
    </div>
)}
            </div>
            
        </div>
       
    </nav>
        
    </div>
  )
}
