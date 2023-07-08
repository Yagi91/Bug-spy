import { NavLink, Outlet } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import { auth } from "../features/auth/auth-helper";

export default function PrivateRoute() {
  // const { userInfo } = useAppSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated();
  if (!isAuthenticated) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <p>Please log in to view this page</p>
        <span>
          <NavLink to="/login">Login</NavLink>
        </span>
      </div>
    );
  }
  return <Outlet />;
}
