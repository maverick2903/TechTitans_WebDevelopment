import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth"

const RequireAuth = () =>{
    const {auth} = useAuth()
    const location = useLocation()

    console.log(auth)
    console.log("require auth has been hit")
    console.log(auth)

    return(
        auth?.user
        ?<Outlet />
        : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth