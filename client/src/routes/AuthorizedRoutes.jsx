import React from 'react'

const AuthorizedRoutes = () => {
    const {currentUser} = useSelector(state=>state.user)
    return (
      currentUser ? <Outlet/> : <Navigate to='/'/>
    )
}

export default AuthorizedRoutes