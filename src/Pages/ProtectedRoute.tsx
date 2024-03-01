import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { auth } from "../features/auth/auth-helper";
import { useEffect } from "react";
import { loginWithJWT } from "../features/auth/authSlice";

export default function PrivateRoute() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isAuthenticated = auth.isAuthenticated();
  const navigate = useNavigate();

  // if jwt is present in session storage, but user info is not in redux store, then fetch user info by dispatching a login action

  useEffect(() => {
    if (isAuthenticated && !userInfo._id) {
      // console.log("dispatching login with jwt action");
      dispatch(loginWithJWT(isAuthenticated));
    }
  }, [userInfo._id, dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    // navigate and replace
    navigate("/login", { replace: true });
  }
  return <Outlet />;
}
