import React, {useState, useEffect} from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';
import {getOffers} from '../../shared/services/offer.service';

const MixedCharts = () => {

    const [selected, setSelected] = useState(0);
    const [notSelected, setNotSelected] = useState(0);
    const [offersPerDay, setOffersPerDay] = useState([0, 0, 0, 0, 0, 0, 0]);


    useEffect(() => {
        countNotSelectedOffers();
        countSelectedOffers();
        getOffersByDays();
    }, [selected, notSelected]);

    const countSelectedOffers = async () => {

        const filters = {
            createdBy: '',
            tender: '',
            isSelected: 'true'
        };

        const offerslist = await getOffers(filters);
//.log('selected',offerslist);
        setSelected(offerslist.length);
//console.log('selected length',offerslist.length);

    };

    const countNotSelectedOffers = async () => {

        const filters = {
            createdBy: '',
            tender: '',
            isSelected: 'false'
        };

        const offerslist = await getOffers(filters);
//console.log('not selected',offerslist);
        setNotSelected(offerslist.length);
//console.log('not selected length',offerslist.length);

    };


    const getOffersByDays = async () => {
        const filters = {
            createdBy: '',
            tender: '',
            isSelected: '',
        };
        const offers = await getOffers(filters);
        console.log("-----------");
//console.log('offers: ',offers);
        const offersPerDay = [0, 0, 0, 0, 0, 0, 0];

        offers.forEach(offer => {
            // @ts-ignore
            const createdAt = new Date(offer.createdAt);
            //    console.log('created at timestamp: ',createdAt);
            const dayOfWeek = createdAt.getDay();
            //  console.log('dayOfWeek: ',dayOfWeek);
            offersPerDay[dayOfWeek] += 1;
        });

        setOffersPerDay(offersPerDay);
    };


    const doughnutData = {
        labels: ['Selected Offers', 'Not Selected Offers'],
        datasets: [
            {
                data: [selected, notSelected],
                backgroundColor: ['#F08080', '#36A2EB'],
                hoverBackgroundColor: ['#F08080', '#36A2EB'],
            },
        ],
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const barData = {
        labels: daysOfWeek,
        datasets: [
            {
                label: 'Number of Offers Created',
                data: offersPerDay,
                backgroundColor: 'rgba(169, 169, 169, 0.7)',
                borderColor: 'rgba(255, 01, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const chartStyle = {
        width: '400px',
        height: '300px',
        marginRight: '50px',
        marginLeft: '50px',
    };

    return (
        <div className="d-flex justify-content-between">
            <div style={chartStyle}>
                <Doughnut data={doughnutData} options={options}/>
            </div>
            <div style={chartStyle}>
                <Bar data={barData} options={options}/>
            </div>
        </div>
    );
};

export default MixedCharts;
