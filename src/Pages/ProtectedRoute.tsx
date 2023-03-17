import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function ParentRoute() {
    const { userInfo } = useAppSelector((state) => state.auth);
    if (!userInfo.email) {
        return (
            <div className="unauthorized">
                <h1>Unauthorized :(</h1>
                <p>Please log in to view this page</p>
                <span>
                    <NavLink to="/login">Login</NavLink>
                </span>
            </div>
        )
    }
    return <Outlet />
}