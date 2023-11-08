import React, {useState, useEffect} from 'react';
import {getTenders} from "../shared/services/tender.service";
import ModalComponent from "../modals/ModalComponent";
import TenderProposals from "./vendors/TenderProposals";
import {useAuth} from "../modules/auth/core/Auth";
import BlockUi from "react-block-ui";
import {Pagination} from "../shared/components/pagination/pagination";

export function OffersPage() {
    const [tenders, setTenders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const toggle = () => setIsOpen(!isOpen);
    const {currentUser, logout} = useAuth();
    const [isBlocking, setIsBlocking] = useState(currentUser.isBlocked);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(10);

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

    const handleShow = (tender) => {
        setSelectedRow(tender);
        setIsOpen(true);
    };

    const fetchTenders = async (customQuery = {}) => {
        try {
            const [pagination, allTenders] = await getTenders();
            setTenders(allTenders);
            {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                currentUser?.id
            }
            console.log(allTenders);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setIsBlocking(currentUser.isBlocked);
        fetchTenders();
    }, [currentUser.isBlocked]);

    if (isBlocking) {
        return <div>
            <h1 className='text-center text-primary text-lg-center'>Your account is suspended!!!</h1>
            <p className='text-center text-lg-center'>Contact Admin about more details!</p>
        </div>
    }

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
            <BlockUi tag='div' blocking={isBlocking}>
                <div className='table-responsive'>
                    <table className="table table-striped gy-7 gs-7 mt-5 table-bordered border-4">
                        <thead className="text-center bg-primary text-white fw-bold">
                        <tr className="fw-bold fs-6 border-bottom border-gray-200">
                            <th className="text-white">Title</th>
                            <th className="text-white">Description</th>
                            <th className="text-white">Deadline date</th>
                            <th className="text-white">Evaluation criteria</th>
                            <th className="text-white">Weightage</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="table-striped border table-hover">
                        {tenders.map((tender) => (
                            <tr key={tender.id}>
                                <td>{tender.title}</td>
                                <td>{tender.description}</td>
                                <td>{formatDate(tender.deadline)}</td>
                                <td>{tender.criteria}</td>
                                <td>{tender.weightage}</td>
                                <td>
                                    <ModalComponent show={isOpen} onHide={toggle}>
                                        <TenderProposals tender={selectedRow} user={currentUser}/>
                                    </ModalComponent>

                                    <button className='mb-3 btn btn-sm w-70' onClick={() => handleShow(tender)}>Create
                                        offer
                                    </button>

                                </td>
                            </tr>
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
            </BlockUi>
        </div>
    );
}

export default OffersPage;




