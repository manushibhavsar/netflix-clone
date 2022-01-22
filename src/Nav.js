import React, { useState, useEffect } from 'react';
import './nav.css';

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        

        window.addEventListener("scroll", () => {
            window.scrollY > 100 ? handleShow(true) : handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img 
            className='nav__logo'
            src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
            alt='Netflix-logo'
            />

            <img 
                className='nav__avatar'
                src='https://occ-0-748-999.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
                alt='Netflix Logo'
            />
        </div>
    )
}

export default Nav
