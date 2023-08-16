
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute;