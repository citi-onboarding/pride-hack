import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import url from '../../apiURL';

import './Banner.css';
import '../General.css';

function Banner() {
    const [timerDays, setTimerDays] = useState(0);
    const [timerHours, setTimerHours] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [eventDate, setEventDate] = useState([{DataEvento: new Date().toISOString()}]);
    const [ingresso, setIngresso] = useState('');

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date(`${eventDate[0]?.DataEvento}`).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    });

    const getdatabaseinfo = async () => {
        const resp = await axios.get(`${url.url}/api/banner`);
        setEventDate(resp.data);
        const ingresso = await axios.get(`${url.url}/api/notice`);
        setIngresso(ingresso.data);
    };

    useEffect(() => {
        getdatabaseinfo();
      }, []);

    return (
        <div className="all-banner-content">
            <div className="banner-illustration"></div>
            <div className="banner-people"></div>
            <div className="infos-banner">
                {eventDate && ingresso && (
                <>
                <h1 className="title-banner">{eventDate[0]?.Título}</h1>
                <div className="timer-blocks">
                    <div className="pink-block">
                        <div className="inside-block-content">
                            <h6 className="block-number correct-self">{(timerDays < 10) ? '0'+timerDays : timerDays}</h6>
                            <p>dias</p>
                        </div>
                    </div>
                    <div className="yellow-block">
                        <div className="inside-block-content">
                            <h6 className="block-number correct-margin">{(timerHours < 10) ? '0'+timerHours : timerHours}</h6>
                            <p className="yellow-text">horas</p>
                        </div>
                    </div>
                    <div className="green-block">
                        <div className="inside-block-content">
                            <h6 className="block-number correct-margin">{(timerMinutes < 10) ? '0'+timerMinutes : timerMinutes}</h6>
                            <p>minutos</p>
                        </div>
                    </div>
                    <div className="blue-block">
                        <div className="inside-block-content">
                            <h6 className="block-number adjust-number">{(timerSeconds < 10) ? '0'+timerSeconds : timerSeconds}</h6>
                            <p className="mobile-adjust">segundos</p>
                        </div>
                    </div>
                </div>
                <p className="banner-text">7 dias de capacitações e construção de soluções em equipe, revolucionando a realidade das pessoas participantes, e de toda a comunidade LGBTQIAP+</p>
                <a href={ingresso[0]?.EditalURL} target="_blank" rel="noopener noreferrer"><button className="banner-button" alt="botao edital">Edital</button></a>
                </>
                )}
            </div>
        </div>
    );
}

export default Banner;