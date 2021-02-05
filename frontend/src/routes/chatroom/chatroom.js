import React, {useState, useEffect, useRef} from 'react';
import styles from './chatroom.module.css';
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import io from 'socket.io-client';
import moment from 'moment';
import qs from 'qs';

// const ENDPOINT = 'http://192.168.0.5:8080';
const ENDPOINT = 'http://localhost:8080';

let socket = io(ENDPOINT, {
    withCredentials: true
})

function Chatroom() {
    const [text, setText] = useState('');
    const [nickname, setNickname] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [messageDate, setMessageDate] = useState([]);
    const [messageDisabled, setMessageDisabled] = useState();
    const [roomName, setRoomName] = useState();
    const [usersName, setUsersName] = useState([]);
    const [color, setColor] = useState([]);
    const [sidebarStatus, setSidebarStatus] = useState(true);

    const transition = sidebarStatus ? null : styles.change
    const hideSidebar = sidebarStatus ? styles.hideSidebar : null

    const messageInput = useRef(null);

    const scrollRef = useRef(null);

    const history = useHistory();
    const location = useLocation();

    const { username, room } = qs.parse(location.search, { ignoreQueryPrefix: true })
   
    useEffect(() => {

        // fetch('http://192.168.0.5:8080/join', {
            fetch('http://localhost:8080/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${location.state}`
                }
            }).then (
                response => {
                    if (response.status !== 200) {
                        throw new Error('Something went wrong');
                    }

                    socket.on('message', (message) => {
                        const formatedDate = moment(message.createdAt).format('h:m a');
                        setColor(previousColor => [...previousColor, message.color])
                        setNickname(previousNickname => [...previousNickname, message.username]);
                        setMessageList(previousMessages => [...previousMessages, message.text]);
                        setMessageDate(previousDate => [...previousDate, formatedDate]);
                    })
            
                    socket.emit('join', { username, room }, (error) => {
                        if (error) {
                            alert(error)
                            history.push('/join')
                        }
                    })
            
                    socket.on('roomData', ({room, users}) => {
                        setRoomName(room);
                        setUsersName([users]);
                    })
            
                    messageInput.current.focus();
            
                    scrollRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            )
            .catch (
                e =>  history.push('/login')
            )

    },[]);

    const submitHandler = () => {
        event.preventDefault();

        setMessageDisabled(true);
        setText('')
        messageInput.current.focus();

        scrollRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        socket.emit('sendMessage', text, (error) => {
            setMessageDisabled(false);
            if (error) {
                alert(error);
            }
        })
    }

    const changeHandler = (event) => {
        setText(event.target.value);
    }

    const toggleSidebar = () => {
        setSidebarStatus(prevStatus => !prevStatus)
    }

    return (
        <div className={styles.chat}>
            <div className={`${styles.container} ${transition}`} onClick={toggleSidebar}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            <div className={`${styles.chat__sidebar} ${hideSidebar}`}>
                <div className={styles.roomTitle}>
                    {roomName}
                </div>
                <p className={styles.listTitle}>Users</p>

                {
                    usersName.map((name,index) => 
                        <div className={styles.users} key={index}>
                            {
                                name.map((username, subindex) =>
                                    <p key={subindex}>{username.username}</p>
                                )
                            }
                        </div>
                    )
                }

            </div>
            <div className={styles.chat__main}>
                <div className={styles.chat__messages}>
                    {
                        messageList.map((message, i) => (
                            <div key={i} className={styles.message}>
                                <p>
                                    <span style={{color: `${color[i]}`}} className={styles.message__name}>{nickname[i]}</span>
                                    <span className={styles.message__meta}>{messageDate[i]}</span>
                                </p>
                                <p>{message}</p>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.compose}>
                    <form onSubmit={submitHandler}>
                        <input className={styles.sendMessage} placeholder={'Send a Message...'} ref={messageInput} value={text} type='text' required autoComplete='off' onChange={changeHandler} />
                        {messageDisabled ? (
                            <button disabled className={styles.messageButton} type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
                            ) : (
                            <button className={styles.messageButton} type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
                        )}
                    </form>
                </div>
                <div ref={scrollRef} />
            </div>
        </div>
    );
}

export default Chatroom