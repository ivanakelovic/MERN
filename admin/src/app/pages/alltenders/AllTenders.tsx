import React, {useState, useEffect} from 'react';
import {deleteTender, getTenders} from "../../shared/services/tender.service";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Pagination} from "../../shared/components/pagination/pagination";
import {useSearchParams} from "react-router-dom";
import ModalComponent from "../../modals/ModalComponent";

export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}


const tenderSchema = Yup.object().shape({
    dateFrom: Yup.date(),
    dateTo: Yup.date().min(Yup.ref('dateFrom'), 'Date To must be later than Date From'),
    weightageFrom: Yup.number().min(100),
    weightageTo: Yup.number().min(100).when(
        'weightageFrom',
        (weightageFrom, schema) => schema.min(weightageFrom, 'Weightage To must be greater than Weightage From')
    )
});

export function AllTenders() {
    const [tenders, setTenders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(10);
    const [deletedItemId, setDeletedItemId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentParams, setCurrentParams] = useState({});
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };




    const
        handlePageChange = (newPage) => {
            setCurrentPage(newPage);
            // searchParams.set("page",newPage);
            // setSearchParams(searchParams);
            fetchTenders({
                page: newPage,
                limit: currentLimit,
            });
        };

    const handleLimitChange = (newValue) => {
        setCurrentLimit(newValue);
        // searchParams.set("limit",newValue);
        // setSearchParams(searchParams);
        fetchTenders({
            limit: newValue,
            page: 1,
        });
    };

    const handleDeleteTender = (tenderId) => {
        setIsLoading(true);
        deleteTender(tenderId)
            .then(() => {
                setDeletedItemId(tenderId);
                console.log('Tender deleted successfully');
                setIsLoading(false);
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error deleting tender:', error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!deletedItemId) {
            return;
        }

        setTenders((prevTenders) => prevTenders.filter((tender) => tender.id !== deletedItemId));
    }, [deletedItemId]);

    const fetchTenders = (filterOptions) => {
        getTenders(filterOptions)
            .then(([pagination, allTenders]) => {
                setTenders(allTenders);
                setPaginationData(pagination)
                //change url parameters
                // searchParams.set("limit", pagination.limit);
                // searchParams.set("page", pagination.page);
                // setSearchParams(searchParams);


            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        //check for searchparams
        fetchTenders({
            dateFrom: searchParams.has('dateFrom') ? searchParams.get('dateFrom') : '',
            dateTo: searchParams.has('dateTo') ? searchParams.get('dateTo') : '',
            weightageFrom: searchParams.has('weightageFrom') ? searchParams.get('weightageFrom') : '',
            weightageTo: searchParams.has('weightageTo') ? searchParams.get('weightageTo') : ''
        });
    }, []);

    const handleFilterSubmit = (values) => {
        searchParams.set("dateFrom", values.dateFrom);
        searchParams.set("dateTo", values.dateTo);
        searchParams.set("weightageFrom", values.weightageFrom);
        searchParams.set("weightageTo", values.weightageTo);
        setSearchParams(searchParams);
        fetchTenders(values);
    };

    //Added for searchParams
    useEffect(() => {
        //handling page change if necessary

        if (searchParams.has('page')) {
            handlePageChange(searchParams.get('page'));
        }
        if (searchParams.has('limit')) {
            handleLimitChange(searchParams.get('limit'));
        }
    }, [searchParams]);

    return (
        <div>

            <Formik
                initialValues={{
                    //corrected for automatic filter
                    dateFrom: searchParams.has('dateFrom') ? searchParams.get('dateFrom') : '',
                    dateTo: searchParams.has('dateTo') ? searchParams.get('dateTo') : '',
                    weightageFrom: searchParams.has('weightageFrom') ? searchParams.get('weightageFrom') : '',
                    weightageTo: searchParams.has('weightageTo') ? searchParams.get('weightageTo') : '',
                }}
                validationSchema={tenderSchema}
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

                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark justify-content-start">Weightage
                                From:</label>
                            <Field type="number" step="any" min="100" name="weightageFrom"
                                   className="form-control form-control-lg " placeholder="Enter weightage from"/>
                            <ErrorMessage name="weightageFrom" component="div" className="text-danger"/>
                        </div>

                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark justify-content-start">Weightage
                                To:</label>
                            <Field type="number" step="any" min="100" name="weightageTo"
                                   className="form-control form-control-lg" placeholder="Enter weightage to"/>
                            <ErrorMessage name="weightageTo" component="div" className="text-danger"/>
                        </div>
                        <div className=" mt-auto p-auto d-flex ">
                            <button type="submit" className='btn btn-sm py-4
                         text-dark   '>Filter Tenders
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <br/>
            <br/>
            <div className="table-responsive">
                <table className="table table-striped gy-7 gs-7  table-bordered border-4 ">
                    <thead className="  text-center bg-primary text-white fw-bold ">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Criteria</th>
                    <th>Weightage</th>
                    <th>Delete tender</th>

                    </thead>
                    <tbody className="table-striped border table-hover">
                    {tenders.map((tender) => (
                        <tr key={tender.id}>

                            <td className="text-center">{tender.title}</td>
                            <td className="text-center">{tender.description}</td>
                            <td className="text-center">{formatDate(tender.deadline)}</td>
                            <td className="text-center">{tender.criteria}</td>

                            <td className="text-center">{tender.weightage + '$'}</td>
                            <ModalComponent show={showModal} onHide={() => setShowModal(false)}>
                                <div className="text-center">
                                    <h3>Delete Tender</h3>
                                    <p>Do you want to delete tender?</p>
                                    <button className="btn btn-primary me-3"
                                            onClick={() => handleDeleteTender(tender.id)}>
                                        Delete Tender
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </ModalComponent>

                            <td className="d-flex justify-content-center align-items-center">
                                <button
                                    className={`btn btn-lg d-flex justify-content-center align-items-center ${isLoading && 'disabled'}`}
                                    style={{background: '#ef1a07', width: '50px', height: '35px'}}
                                    onClick={() => setShowModal(true)}
                                >
                                    {isLoading ? (
                                        <span className='indicator-progress' style={{display: 'block'}}>
              <span className='spinner-border spinner-border-sm align-middle'></span>
            </span>
                                    ) : (
                                        <i className="fas fa-trash justify-content-center align-items-center p-0 m-0"></i>
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Pagination paginationData={paginationData} onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}/>

            </div>
        </div>
    );
}

export default AllTenders;
