import React, {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {Dashboard} from '../pages/dashboard/Dashboard'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import CreateTender from "../pages/tender/CreateTender";
import EvaluateTender from '../pages/evaluators/EvaluateTender'
import TenderProposals from "../pages/vendors/TenderProposals";
import AllTenders from "../pages/alltenders/AllTenders";
import {ResetPassword} from "../modules/auth/components/ResetPassword";
import OffersPage from "../pages/OffersPage";
import EvaluateOffers from "../pages/EvaluateOffers";
import EvaluationPage from "../pages/EvaluationPage";
import UserInformation from "../pages/userInformation/UserInformation";
import Users from "../pages/userInformation/Users";
import UserCard from "../pages/userInformation/UserCard";
import AuthService from "../shared/services/api-client/auth.service";
import {useAuth} from "../modules/auth";

const PrivateRoutes = () => {
    //const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

    const {currentUser, logout} = useAuth();

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                {/* Redirect to Dashboard after success login/registration */}
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                {/* Pages */}
                <Route path='dashboard/' element={<Dashboard/>}/>

                {/* Lazy Modules */}
                {/*<Route
                    path='apps/user-management/*'
                    element={
                        <SuspensedView>
                            <UsersPage/>
                        </SuspensedView>
                    }
                />*/}


                <Route path='create-tender' element={<CreateTender/>}/>
                <Route path='all-tenders' element={<AllTenders/>}/>
                <Route path='offers-page' element={<OffersPage/>}/>
                <Route path='evaluate-offers/:offerId' element={<EvaluateOffers/>}/>
                <Route path='evaluations' element={<EvaluationPage/>}/>

                <Route path='users' element={<Users/>}/>
                <Route path='users/:userId' element={<UserCard/>}/>


                <Route path='offers-page' element={<OffersPage/>}/>

                <Route path='my-profile' element={<UserInformation/>}/>


                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--kt-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
