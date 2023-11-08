import React from 'react';
import "./flip.css";

const CoinFlip = () => {
    return (
        <div className="animation-container">
            <div className="y-axis-container">
                <div className="container">
                    <div className="flash"></div>
                    <div className="coin side">
                        <div className="shine" style={{ transform: 'rotate(-30deg)' }}></div>
                    </div>
                    <div className="side-coin"></div>
                    <div className="coin">
                        <div className="dai">
                            <div className="inner-dai">
                                <div className="inner-inner-dai"></div>
                            </div>
                            <div className="cutout"></div>
                            <div className="dai-shadow"></div>
                        </div>
                        <div className="shine"></div>
                    </div>
                </div>
            </div>
            <div className="shadow"></div>
        </div>
    );
};

export default CoinFlip;