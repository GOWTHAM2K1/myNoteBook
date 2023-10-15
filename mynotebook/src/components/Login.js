import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Login = () => {
    const host = 'http://localhost:5000';
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null); // Initialize to null

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const allnote = await response.json();

            localStorage.setItem('authToken', allnote.authToken);
            setAlert({ type: 'success', msg: 'Logged in successfully' });
            navigate('/home');

        } catch (err) {
            setAlert({ type: 'warning', msg: 'Enter correct credentials' });
            console.error(err.message);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            {alert && <Alert msg={alert.msg} type={alert.type} />}
            
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onChange} />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </>
    )
}

export default Login
