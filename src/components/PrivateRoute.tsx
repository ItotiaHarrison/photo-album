import { Navigate, Outlet } from 'react-router-dom'
import UseAuthStatus from '../hooks/UseAuthStatus'

const PrivateRoute = () => {

  //get Authentication status and loading state
    const {loggedIn, checkingStatus} = UseAuthStatus();

    if(checkingStatus) {
        return <h3>Loading...</h3>;
    }

    //if user is logged in, render the child routes otherwise, redirect to landing page
  return loggedIn ? <Outlet/> : <Navigate to = "/"/>
}

export default PrivateRoute