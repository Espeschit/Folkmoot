import React, { useState } from "react";
import styles from './signup.module.css';
import { Link, useHistory } from 'react-router-dom';
import odal from './../../images/odal.png';

function Signup() {
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    let history = useHistory();

    const imgHandler = () => {
        history.push('/');
    };

    const passwordChangeHandler = (event) => {
        if (event.target.value.length >= 8) {
            setPasswordError(false)
            setPassword(event.target.value);
        } else {
            setPasswordError(true)
            setPassword();
        }
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    };    

    const submitHandler = () => {
        event.preventDefault();

        // fetch('http://192.168.0.5:8080/signup', {
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        }).then(res => {
                if (res.status !== 200) {
                    throw new Error('Something went wrong');
                }
                history.push('/login')
            }).catch(
                err => setError(true)
            )

    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <img onClick={imgHandler} src={odal} className={styles.logo} /> 
                <div className={styles.title}>Sign up for free to start chatting</div>
            </div>
            <hr className={styles.aboutLine} />
            <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.inputSection}>
                    <div className={styles.labelGroup}>
                        <label>What's your email?</label>
                        <input onChange={emailChangeHandler} className={styles.inputBox} id='email' name='email' placeholder='Enter your email.' required />
                        {
                            error ? <div className={styles.error}>Email already registered. Either login or create a new user.</div> : null 
                        }
                   </div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.labelGroup}>
                        <label>Create a password</label>
                        <input onChange={passwordChangeHandler} className={styles.inputBox} id='password' type="password" name="password" placeholder='Create a password.' required />
                        {
                            passwordError ? <div className={styles.error}>Password too short. Must be at least 8 characters.</div> : null 
                        }
                    </div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.labelGroup}>
                        <label>What's your name?</label>
                        <input onChange={usernameChangeHandler} className={styles.inputBox} id='displayname' name='displayname' placeholder='Enter your name.' required />
                    </div>
                </div>
                <button type='submit' className={styles.signupButton}>SIGN UP</button>
                <p className={styles.linkContainer}>
                    <span>Have an account? <Link to='/login'>Log in</Link>.</span>
                </p>
            </form>
        </div>
    );
}

export default Signup
