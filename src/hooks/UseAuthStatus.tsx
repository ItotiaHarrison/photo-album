import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const UseAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(()=>{
    //get a firebase auth instance
        const auth = getAuth()

        //setup listener for authentication state changes
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    }, [])
    
  return {loggedIn, checkingStatus}
}

export default UseAuthStatus