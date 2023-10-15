import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const host = "http://localhost:5000"
    const [credentials,setCredentials] = useState()
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()

        console.log(JSON.stringify(credentials))
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
            });
            const allnote = await response.json()
            console.log(allnote)
            navigate("/")
        } catch (err) {
            console.error(err.message)
        }

    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials)
    }
    return (
        <>
            <form className='container' onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" name="name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={onChange} minLength={3} />
                </div>
                <div className="form-group">
                    <label htmlFor="cexampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="cexampleInputPassword1" placeholder="Confirm Password" name="cpassword"  minLength={3} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Signup
