import React, { useState, useEffect, useRef } from "react";
import styles from './login.module.css'
import { Link, useHistory } from 'react-router-dom';
import odal from './../../images/odal.png'

function Login() {
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [error, setError] = useState(false);

    const isMountedRef = useRef(true);

    let history = useHistory();

    // prevents a memory leak in which the token state is updated before the component is mounted
    useEffect(() => () => { isMountedRef.current = false }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('token');

        if (loggedUserJSON && loggedUserJSON.length > 9) {
            history.push('/join');
        }

        !token ? null : history.push({
            pathname: '/join',
            state: token
        })
    })

    const imgHandler = () => {
        history.push('/');
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };   

    const submitHandler = () => {
        event.preventDefault();

        // fetch('http://192.168.0.5:8080/login', {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then (
                response => response.json()
            ).then (res => {
                    if (isMountedRef.current ) {
                        window.localStorage.setItem('token', res.response)
                        setToken(res.response)
                    }
                    if (res.status !== 200) {
                        throw new Error('Something went wrong');
                    }
                }).catch(
                err => setError(true)
                )

    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <img onClick={imgHandler} src={odal} className={styles.logo} /> 
                <div className={styles.title}>Log in to start chatting</div>
            </div>
            <hr className={styles.aboutLine} />
            <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.inputSection}>
                    <div className={styles.labelGroup}>
                        <label>What's your email?</label>
                        <input onChange={emailChangeHandler} className={styles.inputBox} id='email' name='email' placeholder='Enter your email.' required />
                        {
                            error ? <div className={styles.error}>Invalid email or password.</div> : null 
                        }
                    </div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.labelGroup}>
                        <label>What's your password?</label>
                        <input onChange={passwordChangeHandler} className={styles.inputBox} id='password' type="password" name="password" placeholder='Enter your password.' required />
                    </div>
                </div>
                <button type='submit' className={styles.loginButton}>SIGN UP</button>
                <p className={styles.linkContainer}>
                    <span>Don't have an account? <Link to='/signup'>Sign up</Link></span>
                </p>
            </form>
        </div>
    );
}

export default Login
