import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from './context/AuthProvider'
import axios from './api/axios'

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();               
    const errRef = useRef();

    const [user,setUser] = useState('');            // user is the state variable
    const [pwd, setPwd] = useState('');             // pwd is the state variable
    const [errMsg, setErrMsg] = useState('');       // errMsg is the state variable
    const [success, setSuccess] = useState(false);   // succes is the state variable

    useEffect(() => {               
        userRef.current.focus();                    // focus on the user input field
    }, [])

    useEffect(() => {
        setErrMsg('');                              // clear the error message  
    }, [user, pwd])                                 // when user or pwd changes

    const handleSubmit = async (e) => {
         e.preventDefault();                         // prevent the default action of the submit button
        // console.log(user, pwd);
        // setUser('');                                // clear the user input field
        // setPwd('');                                 // clear the pwd input field
        // setSuccess(true);                           // set the succes state variable to true

        try {
            // const response = await axios.post(LOGIN_URL, JSON.stringify({Username: user, Password: pwd }),
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),   
            {
                headers: { 'Content-Type': 'application/json' },                // set the content type to json
                withCredentials: true                                           // set the withCredentials to true
            }
        );
            console.log(JSON.stringify(response?.data));                // log the response data
            // console.log(JSON.stringify(response));                      // log the response
            const accessToken = response?.data?.accessToken;                // get the access token from the response data
            const roles = response?.data?.roles;                            // get the roles from the response
            setAuth({ user, pwd, roles, accessToken });                   // set the auth state variable
            setUser('');                               
            setPwd('');
            setSuccess(true);
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            

        }
    }

  return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : ( 

    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            />
            <button>Sign In</button>
        </form>
        <p>
            Don't have an account? <br />
            <span className='line'>
            <a href="#">Sign Up</a>
            </span>
        </p>

    </section>
        )}
        </>
  )
}

export default Login