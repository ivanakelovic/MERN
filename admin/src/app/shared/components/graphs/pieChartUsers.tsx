import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {getOffers} from '../../services/offer.service';
import {useLocation} from 'react-router-dom';

const PieChartUserOffers = ({user}) => {
    const [countSelected, setCountSelected] = useState(0);
    const [countNotSelected, setCountNotSelected] = useState(0);
    const [chartData, setChartData] = useState(null); // Chart data state
    const location = useLocation();

    useEffect(() => {
        notSelectedOffers();
        selectedOffers();
    }, []);

    useEffect(() => {
        if (countSelected != 0 && countNotSelected !== 0) {
            setChartData({
                labels: ['Offers won', 'Offers did not win'],
                datasets: [
                    {
                        data: [countSelected, countNotSelected],
                        backgroundColor: ['#7239ea', '#50cd89'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                    },
                ],
            });
        }
    }, [countSelected, countNotSelected]);

    const selectedOffers = async () => {
        const filters = {
            createdBy: user.id.toString(),
            tender: '',
            isSelected: 'true',
        };
        const offers = await getOffers(filters);
        console.log('selected offers', offers);

        setCountSelected(offers.length);
    };

    const notSelectedOffers = async () => {
        const filters = {
            createdBy: user.id.toString(),
            tender: '',
            isSelected: 'false',
        };
        const offers = await getOffers(filters);
        console.log('not selected offers', offers);

        setCountNotSelected(offers.length);
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
            {chartData != null ? (
                <Doughnut data={chartData} options={options}/>
            ) : (
                <h1>User has not made any offers!</h1>
            )}
        </div>
    );
};

export default PieChartUserOffers;
