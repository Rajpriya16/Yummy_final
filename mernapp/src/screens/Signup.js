import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Show popup on successful registration
            setShowPopup(true);
        } else {
            alert("Enter valid credentials");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <>
            {showPopup && (
                <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 9999 }}>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Success!</strong>
                            <button type="button" className="btn-close" onClick={() => setShowPopup(false)} aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            Registration successful!
                        </div>
                    </div>
                </div>
            )}

            <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ color: 'black', marginTop: '30px' }}>REGISTRATION PAGE</h1>
                <div className='container' style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', width: '400px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
                            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress1" />
                        </div>
                        <button type="submit" className="m-3 btn btn-primary">Submit</button>
                        <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
