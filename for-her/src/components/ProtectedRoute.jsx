import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return (
        !isAuthenticated ?  <Navigate to="/" /> : <Outlet />
    )
}

export default ProtectedRoute
