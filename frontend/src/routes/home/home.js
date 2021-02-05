import React, { useRef } from "react";
import styles from './home.module.css'
import { Link } from 'react-router-dom';
import odal from './../../images/odal.png'
import scroll from './../../images/scroll.gif'
import group from './../../images/group.png'
import mobile from './../../images/mobile.png'
import security from './../../images/security.png'
import ads from './../../images/ads.png'
import wpp from './../../images/wpp.png'
import gh from './../../images/gh.png'
import lk from './../../images/lk.png'
import odalWhite from './../../images/odalWhite.png'

function Home() {
    const titleRef = useRef();

    function handleBackClick() {
        titleRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.wrap}>
            <section className={styles.hero}>
                <header>
                    <img src={odal} className={styles.logo} />
                </header>
                <div className={styles.label}>
                    <h1>Your new Assembly</h1>
                    <h2>Sign up now to chat and hang out with your friends </h2>
                    <div className={styles.buttons}>
                        <Link to='/signup'><button className={styles.register}>SIGN UP</button></Link>
                        <Link to='/login'><button className={styles.login}>LOG IN</button></Link>                        
                    </div>
                </div>
                <img onClick={handleBackClick} src={scroll} className={styles.scroll} />
            </section>
            <div ref={titleRef} />
            <section  className={styles.about}>
                <h1 className={styles.aboutTitle}>Why Folkmoot?</h1>
                <hr className={styles.aboutLine} />
                <ul className={styles.features}>
                    <li className={`${styles.iuxteu} ${styles.firstFeature}`}>
                        <img style={{width: '150px', right: '7.5%'}} className={`${styles.featuresImages} ${styles.firstImage}`} src={group} />
                        <div className={`${styles.featuresText} ${styles.firstText}`}>
                            <p className={styles.featuresTitle}>Plenty of room.</p>
                            <p className={styles.featuresSubtitle}>Channels tailored to your needs.</p>                            
                        </div>
                    </li>
                    <li className={styles.iuxteu}>
                        <img className={styles.featuresImages} src={mobile} />
                        <div className={styles.featuresText}>
                            <p className={styles.featuresTitle}>Chat anywhere.</p>
                            <p className={styles.featuresSubtitle}>Even on your phone.</p>
                        </div>
                    </li>
                    <li className={styles.iuxteu}>
                        <img className={styles.featuresImages} src={security} />
                        <div className={styles.featuresText}>
                            <p className={styles.featuresTitle}>Secure messaging.</p>
                            <p className={styles.featuresSubtitle}>All credentials are encrypted.</p>
                        </div>
                    </li>
                    <li className={styles.iuxteu}>
                        <img className={styles.featuresImages} src={ads} />
                        <div className={styles.featuresText}>
                            <p className={styles.featuresTitle}>No ads.</p>
                            <p className={styles.featuresSubtitle}>Just chatting.</p>
                        </div>
                    </li>
                </ul>
            </section>
            <footer>
                <div className={styles.cta}>
                    <div className={styles.infoBox}>
                        <h3 className={styles.footerHero}>Your new Assembly</h3>
                        <div className={styles.social}>
                            <a target="_blank" href="https://api.whatsapp.com/send?phone=5531971406507"> <img className={styles.socialIcons} src={wpp} /> </a>
                            <a target="_blank" href="https://github.com/Espeschit"> <img className={styles.socialIcons} src={gh} /> </a>
                            <a target="_blank" href="https://br.linkedin.com/in/bruce-espeschit-6bb238160"> <img className={styles.socialIcons} src={lk} /> </a>
                        </div>
                    </div>
                    <div className={styles.footnote}>
                        <hr className={styles.footLine} />
                        <img className={styles.logoLink} src={odalWhite} />
                        <Link className={styles.footerLink} to='/signup'><button className={styles.buttonFooter}>SIGN UP</button></Link>
                    </div>
                </div>
            </footer>
        </div>
    );    
}

export default Home;
