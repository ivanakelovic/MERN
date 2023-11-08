import React, { useState, useEffect } from 'react';
import './coinanimation.css';

const CoinRainAnimation = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // Simulacija novčića koji padaju
        const interval = setInterval(() => {
            setCoins(prevCoins => [...prevCoins, Date.now()]);
        }, 500); // Dodajte svoj željeni interval

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="coin-rain-container">
            {coins.map(coinKey => (
                <div key={coinKey} className="coin"></div>
            ))}
        </div>
    );
};

export default CoinRainAnimation;
