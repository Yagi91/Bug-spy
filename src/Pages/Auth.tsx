import Login from '../features/auth/auth';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { changeAuthType as changeAuthTypeAction, selectAuthType } from "../features/auth/authSlice";
import { NavLink } from 'react-router-dom';

export default function LoginPage() {
    // const [authType, setAuthType] = useState<string>("Login");

    const dispatch = useAppDispatch();
    const authType = useAppSelector(selectAuthType);

    return (
        <div>
            <h1>Login or Create an Account</h1>
            <Login authType={authType} />
            <div>
                {
                    authType === "Login" ? <p>Don't have an account? <NavLink to="/register" onClick={() => dispatch(changeAuthTypeAction("Register"))}>Register</NavLink></p> : <p>Already have an account? <button onClick={() => dispatch(changeAuthTypeAction("Login"))}>Login</button></p>
                }
            </div>
        </div>
    )
}