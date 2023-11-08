import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faSearch, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useAuth} from "../../modules/auth/core/Auth";
import DashBoardCard from "./DashboarcCard";
import {getChartData, getStats} from "../../shared/services/statsService";
import Chart from './Chart';
import * as Yup from "yup";
import MixedCharts from './MixedCharts'; 
import Marquee from "react-fast-marquee";


const statsSchema = Yup.object().shape({
    dateFrom: Yup.date(),
    dateTo: Yup.date().min(Yup.ref('dateFrom'), 'Date To must be later than Date From')
});

export function Dashboard() {

    const [activeCount, setActiveCount] = useState(0);
    const [successfulTenders, setSuccessfulTenders] = useState(0);
    const [failedTenders, setFailedTenders] = useState(0);
    const [offersCount, setOffersCount] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterSubmit = (values)=>{
        getChartData(values)
            .then(data =>{
                setSearchParams(values);
                setChartData(data.result);
            })
    }
    useEffect(() => {
        //fetching all the data
        getStats()
            .then(data => {
                setActiveCount(data.activeTenders);
                setSuccessfulTenders(data.successfulTenders);
                setFailedTenders(data.failedTenders);
                setOffersCount(data.offers);
            });
        getChartData({
            dateFrom: searchParams.has('dateFrom') ? searchParams.get('dateFrom') : '',
            dateTo: searchParams.has('dateTo') ? searchParams.get('dateTo') : '',
        }) //should think about this, maybe the current year.
            .then(data => {
                setChartData(data.result);
                console.log(data.result);
            });

    }, []);

    return (
        <div>
    <div className="container mt-5"> 
    <div className="marquee-container border  border-2 border-gray-300 p-3 rounded marquee-hover mb-4">
   {/* <Marquee speed={50} gradientColor={[255, 0, 0]}>
        <p className="mb-0 text-uppercase" style={{ fontSize: '18px', background: 'linear-gradient(to right, transparent, red)' }}>
        "New Tender Offers Available! Check out the latest opportunities for your business."
        </p>
    </Marquee>*/}
    </div>
        </div>
        <div className="row row-cols-2 card-group my-4">
                <DashBoardCard  number = {activeCount} name = "Active Tenders"></DashBoardCard>
                <DashBoardCard number={successfulTenders} name="Successful Tenders"></DashBoardCard>
                <DashBoardCard number={failedTenders} name="Failed Tenders"></DashBoardCard>
                <DashBoardCard number={offersCount} name="Offers"></DashBoardCard>
            </div>
            <br />
            <br />
                 <MixedCharts/> 
            <br />
<br />
        <Formik
                initialValues={{
                    //corrected for automatic filter
                    dateFrom: searchParams.has('dateFrom') ? searchParams.get('dateFrom') : '',
                    dateTo: searchParams.has('dateTo') ? searchParams.get('dateTo') : '',

                }}
                validationSchema={statsSchema}
                onSubmit={handleFilterSubmit}
            >
                {({errors, touched}) => (
                    <Form className="d-flex justify-content-start form flex-wrap">
                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark justify-content-start">Date
                                From:</label>
                            <Field type="date" name="dateFrom" className="form-control form-control-lg"/>
                            <ErrorMessage name="dateFrom" component="div" className="text-danger"/>
                        </div>
            <div className="form-group me-3">
            <label className="form-label fs-6 fw-bolder text-dark justify-content-start">Date
                                To:</label>
                            <Field type="date" name="dateTo" className="form-control form-control-lg"/>
                            <ErrorMessage name="dateTo" component="div" className="text-danger"/>
                        </div>
                        <div className=" mt-auto p-auto d-flex ">
                            <button type="submit" className='btn btn-sm py-4
                         text-dark   '>Filter Chart
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

              <div className="row row-cols-1 my-4">
                 <Chart data={chartData}></Chart>
            </div>    
      
        </div>
    );

}