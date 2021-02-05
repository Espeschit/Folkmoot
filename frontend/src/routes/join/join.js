import React, { useState, useEffect } from 'react';
import styles from './join.module.css';
import { useLocation, useHistory } from "react-router-dom";

function Join() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const history = useHistory();

    useEffect(() => {

        // prevents a bug in which the user pops the history stack on /chatroom and the socket connection remains
        window.onpopstate = function(event) {
            window.location.reload();
        };

        const loggedUserJSON = window.localStorage.getItem('token');

        if (!loggedUserJSON) {
            history.push('/login');
        } else if (loggedUserJSON.length <= 9) {
            history.push('/login');
        } else {
            history.replace('/join')
            setToken(loggedUserJSON);
        }

     }, []);

    const logoutHandler = () => {
        window.localStorage.clear();
        history.push('/login');
    }

     const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    };

    const roomChangeHandler = (event) => {
        setRoom(event.target.value);
    };   

    const submitHandler = () => {
        event.preventDefault();

        // fetch('http://192.168.0.5:8080/join', {
        fetch('http://localhost:8080/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        }).then (
            response => {
                if (response.status == 200) {
                    return history.push({
                        pathname: '/chatroom',
                        search: `?username=${username}&room=${room}`,
                        state: token
                    })
                }
                    throw new Error('Something went wrong');
            }
        )
        .catch (
            e =>  history.push('/login')
        )
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.centeredForm}>
                <div className={styles.centeredForm__box}>
                    <h1 className={styles.title}>Join</h1>
                    <form onSubmit={submitHandler}>
                        <label className={styles.joinLabel}>Choose your name</label>
                        <input onChange={usernameChangeHandler} className={styles.inputBox} name='username' placeholder='Display name' required />
                        <label className={styles.joinLabel}>Enter a room</label>
                        <input onChange={roomChangeHandler} className={styles.inputBox} name='room' placeholder='Room' required />
                        <button className={styles.submitButton}>JOIN</button>
                    </form>
                    <button onClick={logoutHandler} className={styles.logoutButton}>LOG OUT</button>
                </div>
            </div>
        </div>
    );
}

export default Join
