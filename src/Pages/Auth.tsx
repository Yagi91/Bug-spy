import React from 'react';
import Login from '../features/auth/auth';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { changeAuthType as changeAuthTypeAction, loginUser as loginUserAction, selectAuthType } from "../features/auth/authSlice";

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
                    authType === "Login" ? <p>Don't have an account? <button onClick={() => dispatch(changeAuthTypeAction("Register"))}>Register</button></p> : <p>Already have an account? <button onClick={() => dispatch(changeAuthTypeAction("Login"))}>Login</button></p>
                }
            </div>
        </div>
    )
}