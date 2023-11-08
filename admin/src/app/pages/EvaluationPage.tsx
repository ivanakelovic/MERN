import React, {useState, useEffect} from 'react';
import {getTenders} from "../shared/services/tender.service";
import {useNavigate, useLocation} from 'react-router-dom';
import {updateOffer} from "../shared/services/offer.service";
import ModalComponent from "../modals/ModalComponent";
import {sendWinningOfferEmail} from "../shared/services/offer.service";
import {getUser} from "../shared/services/user.service";
import {getTender} from "../shared/services/tender.service";
import {getOffers} from "../shared/services/offer.service";
import {getCompany} from "../shared/services/company.service";
import {getEvaluations} from "../shared/services/evaluator.service";
import {Pagination} from "../shared/components/pagination/pagination";
import {showErrorMessage} from "../shared/components/messages/error-createtender-message";
import {showSuccessMessage} from "../shared/components/messages/success-createtender-message";
import StarRatings from 'react-star-ratings';


export function EvaluationPage() {
    const [tenders, setTenders] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(10);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [offerAverageRatings, setOfferAverageRatings] = useState(new Map());

    const toggle = () => setIsOpen(!isOpen);
    const navigateToOffer = (offer) => {
        navigate(`/evaluate-offers/${offer.id}`, {state: {offer}});
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        // @ts-ignore
        const formattedDate = date.toLocaleDateString(options);
        return formattedDate;
    }


    useEffect(() => {
        const fetchAndEvaluate = async () => {
            console.log('drugi useeffect fetchevaluate');
            await evaluateOffers();
            await fetchTenders();
        }

        console.log('drugi useeffect');
        fetchAndEvaluate();
        setForceUpdate(prev => !prev);
    }, []);

    const confirmSelectOffer = async (offer) => {
        try {
            if (selectedOffer) {
                /* const offerData = {
                     isSelected: true
                 }*/
                setSelectedOffer(offer);
                //  await updateOffer(offer.id, offerData);
                //setRefresh(offer.tender);
                //  console.log(offer.tender);

                const user = await getUser(offer.createdBy);

                //console.log('selected Offer', offer);
                await sendWinningOfferEmail(offer);

                //  console.log('user email', user.email);

                const tender = await getTender(offer.tender);
                const filters = {
                    createdBy: '',
                    tender: ''
                }
                const offers = await getOffers(filters);

                for (var i = 0; i < offers.length; i++) {
                    // @ts-ignore
                    if (offers[i].tender === tender.id) {
                        console.log('tender checking', offers[i].tender, ' tender id: ', tender);

                        if (offers[i].isSelected === true) {
                            showErrorMessage('There is already a winning offer for this tender.');
                            break;
                        } else if (offers[i].isSelected === false && offers[i].id === selectedOffer.id) {
                            const updateOfferData = {
                                isSelected: true
                            };
                            await updateOffer(offers[i].id, updateOfferData);
                            showSuccessMessage('Winning offer successfully chosen!');
                        }
                    }
                }

                toggle();
            }
        } catch (error) {
            console.error(error);
        }
    }


    const evaluateOffers = async () => {
        const filters = {
            rating: 0,
            offer: '',
            collaborators: ''
        };

        const evaluations = await getEvaluations(filters);
        console.log('eval: ', evaluations);
        const offerRatings = new Map();

        for (const evaluation of evaluations) {
            const offerId = evaluation.offer;

            if (!offerRatings.has(offerId)) {
                offerRatings.set(offerId, {
                    sum: 0,
                    count: 0
                });
            }

            const ratingInfo = offerRatings.get(offerId);
            if (ratingInfo) {
                ratingInfo.sum += evaluation.rating;
                ratingInfo.count++;
            }
        }

        const averageRatings = new Map();

        offerRatings.forEach((ratingInfo, offerId) => {
            const averageRating = ratingInfo.count > 0
                ? ratingInfo.sum / ratingInfo.count
                : 0;

            averageRatings.set(offerId, averageRating);
        });

        setOfferAverageRatings(averageRatings);
    };


    const selectWinningOffer = async (offer) => {
        try {
            setSelectedOffer(offer);
            const user = await getUser(offer.createdBy);
            setFirstName(user.firstName);
            setLastName(user.lastName);

            console.log('user', user);
            if (user.role === 'vendor') {
                console.log('user company:', user.company)

                const company = await getCompany(user.company);

                setCompany(company.name);
            }

            toggle();
        } catch (error) {
            console.error(error);
        }
    }


    const fetchTenders = async (customQuery = {}) => {
        try {
            const query = {populate: 'offers', ...customQuery = {}};
            const [pagination, allTenders] = await getTenders(query);


            setTenders(allTenders);
            //    console.log(allTenders);


        } catch (error) {
            console.error(error);
        }
    };


    const toggleOffers = (tenderId) => {
        setTenders((prevTenders) =>
            prevTenders.map((tender) =>
                tender.id === tenderId ? {...tender, isShowingOffers: !tender.isShowingOffers} : tender
            )
        );
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchTenders({
            page: newPage,
            limit: currentLimit,
        });
    };

    const handleLimitChange = (newValue) => {
        setCurrentLimit(newValue);
        fetchTenders({
            limit: newValue,
            page: 1,
        });
    };


    return (
        <div>
            <div className='table-responsive'>
                <table className="table table-striped gy-7 mt-5 gs-7 table-bordered border-4">
                    <thead className="text-center bg-primary text-white fw-bold">
                    <tr className="fw-bold fs-6 border-bottom border-gray-200">
                        <th className="text-white">Title</th>
                        <th className="text-white">Description</th>
                        <th className="text-white">Deadline date</th>
                        <th className="text-white">Evaluation criteria</th>
                        <th className="text-white">Weightage</th>
                        <th className="text-white">Offers</th>
                    </tr>
                    </thead>
                    <tbody className="table-striped border table-hover">
                    {tenders.map((tender) => (
                        <React.Fragment key={tender.id}>
                            <tr>
                                <td>{tender.title}</td>
                                <td>{tender.description}</td>
                                <td>{formatDate(tender.deadline)}</td>
                                <td>{tender.criteria}</td>
                                <td>{tender.weightage}</td>
                                <td colSpan={6}>
                                    {tender.offers.length > 0 ? (
                                        <button
                                            onClick={() => toggleOffers(tender.id)}
                                            className='btn btn-md'
                                        >
                                            See offers!
                                        </button>
                                    ) : (
                                        <p>No offers</p>
                                    )}
                                </td>
                            </tr>
                            {tender.offers.length > 0 && tender.isShowingOffers && (
                                <tr className='mt-4'>
                                    <td colSpan={6}>
                                        <div className='row'>
                                            {tender.offers.map((offer) => (

                                                <div
                                                    key={offer.id}
                                                    className='col-md-4 mb-4'
                                                >
                                                    <div
                                                        className='card p-3 border border-black border-5 text-center'
                                                    >
                                                        <h1>{offer.offer} $</h1>
                                                        <p>Current Offer Rating:</p>
                                                        <StarRatings

                                                            rating={offerAverageRatings.get(offer.id) || 0}
                                                            starRatedColor="red"
                                                            numberOfStars={5}
                                                            starDimension="20px"
                                                            starSpacing="2px"
                                                            name={`average-rating-${offer.id}`}
                                                            readonly
                                                        />

                                                        <br/>

                                                        <div>
                                                            <div className='d-flex justify-content-between'>
                                                                <button
                                                                    className='btn btn-sm btn-success'
                                                                    onClick={() => {
                                                                        navigateToOffer(offer);
                                                                    }}
                                                                >
                                                                    Evaluate
                                                                </button>
                                                                <button
                                                                    className='btn btn-sm btn-info'
                                                                    onClick={() => {
                                                                        selectWinningOffer(offer);
                                                                    }}
                                                                >
                                                                    Select winning offer
                                                                </button>
                                                            </div>
                                                            <ModalComponent
                                                                show={isOpen}
                                                                onHide={toggle}
                                                            >
                                                                <div className='text-center'>
                                                                    <h1>Select winning offer!</h1>
                                                                    <hr/>
                                                                    <div>
                                                                        <h2 className='text-primary'>Tender Details</h2>
                                                                        <b>Tender Title:</b> {tender.title} <br/>
                                                                        <b>Tender Description:</b> {tender.description}
                                                                        <br/>
                                                                        <b>Tender Criteria:</b> {tender.criteria} <br/>
                                                                        <b>Tender Weightage:</b> {tender.weightage}
                                                                        <br/>
                                                                        <hr/>
                                                                        <h2 className='text-primary'>Offer Details</h2>
                                                                        <b>Offered Money: </b> {offer.offer} $ <br/>
                                                                        <b>Vendor: </b> {firstName} {lastName} <br/>
                                                                        <b>Company: </b> {company}
                                                                    </div>
                                                                    <br/>
                                                                    <h6> Are you sure you want to select this offer for
                                                                        the
                                                                        winner?</h6>
                                                                    <br/>
                                                                    <button className='btn me-3'
                                                                            onClick={() => confirmSelectOffer(selectedOffer)}>Yes
                                                                    </button>
                                                                    <button
                                                                        className='btn btn-secondary'
                                                                        onClick={toggle}>No
                                                                    </button>
                                                                </div>
                                                            </ModalComponent>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>

                </table>
                <br/>
                <Pagination
                    paginationData={paginationData}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            </div>
        </div>
    );
}

export default EvaluationPage;