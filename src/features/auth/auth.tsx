import React, { useEffect } from "react";
import LogIn from "./login";
import Register from "./register";
import person from "./images/user-login.svg";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeAuthType as changeAuthTypeAction } from "./authSlice";
import {
  loginUser,
  registerUser,
  selectStatus,
  error as errorAction,
} from "./authSlice";

interface Props {
  authType: string;
}

export default function Auth({ authType }: Props) {
  const authStatus = useAppSelector(selectStatus);
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("authType", authType);
    dispatch(errorAction(""));
  }, [authType, dispatch]);
  const passwordFormatChecker = (password: string): boolean => {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordFormat.test(password);
  };

  const handleLogInForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;
    const isPasswordValid = passwordFormatChecker(password);
    if (isPasswordValid) {
      //Hit the backend and submit the form
      dispatch(loginUser({ email: email.toLocaleLowerCase(), password }));
      return;
    } else return console.log("Email or password is invalid");
  };

  const handleRegisterForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const name: string = event.currentTarget.fullName.value;
    const role: string = event.currentTarget.myRole.value;
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;
    const passwordCheck: string = event.currentTarget["password-check"].value;
    const isPasswordValid = passwordFormatChecker(password);
    if (isPasswordValid && password === passwordCheck) {
      //Hit the backend and submit the form
      dispatch(
        registerUser({ email: email.toLocaleLowerCase(), password, role, name })
      );
    } else if (!isPasswordValid) {
      errorAction(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    } else if (password !== passwordCheck) {
      errorAction("Passwords do not match");
      return console.log("Passwords do not match");
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      dispatch(errorAction(""));
    }
    return;
  };
  return (
    <section className=" flex h-full items-center gap-3 p-2">
      <div className=" hidden w-1/2 sm:block">
        <img src={person} alt="a person" />
      </div>
      <div className=" mx-auto w-3/4 p-2 sm:w-1/2 ">
        {authType === "Login" ? (
          <LogIn
            handleSubmit={handleLogInForm}
            loginStatus={authStatus}
            error={error}
            handleChange={handleFormChange}
          />
        ) : (
          <Register
            handleSubmit={handleRegisterForm}
            handleChange={handleFormChange}
            registerStatus={authStatus}
            error={error}
          />
        )}
        {authType === "Login" ? (
          <p className="mt-2 p-2">
            Don't have an account?{" "}
            <button
              className="text-primary-500"
              onClick={() => dispatch(changeAuthTypeAction("Register"))}
            >
              Register
            </button>
          </p>
        ) : (
          <p className="mt-2 p-2">
            Already have an account?{" "}
            <button
              className="text-primary-500"
              onClick={() => dispatch(changeAuthTypeAction("Login"))}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
