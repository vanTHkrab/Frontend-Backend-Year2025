import { Navigate, Outlet, useLocation } from "react-router-dom";
interface ProtectedRouteProps {
    isAuthed: boolean;
}

export default function ProtectedRoute({ isAuthed }: ProtectedRouteProps) {
    const location = useLocation();
    if (!isAuthed) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}