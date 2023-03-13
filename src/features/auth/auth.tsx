import React, { useState, useEffect } from "react";
import LogIn from "./login";
import Register from "./register";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { changeAuthType as changeAuthTypeAction, loginUser as loginUserAction, selectAuthType as authType, selectStatus, error as errorAction } from "./authSlice";

interface Props {
  authType: string;
}

export default function Login({ authType }: Props) {

  const authStatus = useAppSelector(selectStatus);
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("authType", authType);
    dispatch(errorAction(""));
  }, [authType, dispatch]);

  const emailFormatChecker = (email: string): boolean => {
    const emailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailFormat.test(email);
  };
  const passwordFormatChecker = (password: string): boolean => {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordFormat.test(password);
  };

  const handleLogInForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;
    const isPasswordValid = passwordFormatChecker(password);
    const isEmailValid = emailFormatChecker(email);
    if (isEmailValid && isPasswordValid) {
      //Hit the backend and submit the form
      dispatch(loginUserAction({ email: email.toLocaleLowerCase(), password }));
      return;
    } else if (!isEmailValid) {
      errorAction("Please enter a valid email Format");
      return;
    }
  };

  const handleRegisterForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;
    const passwordCheck: string = event.currentTarget["password-check"].value;
    const isPasswordValid = passwordFormatChecker(password);
    const isEmailValid = emailFormatChecker(email);
    if (isEmailValid && isPasswordValid && password === passwordCheck) {
      //Hit the backend and submit the form
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
      await delay(2000);
      // setError("");
    } else if (!isEmailValid) {
      // setError("Please enter a valid email Format");
      return console.log("Email format is invalid");
    } else if (!isPasswordValid) {
      // setError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number");
      return console.log("Password format is invalid: %s", password);
    } else if (password !== passwordCheck) {
      // setError("Passwords do not match");
      return console.log("Passwords do not match");
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(errorAction(""));
    return;
  }

  return (
    <section>
      {
        authType === "Login" ? <LogIn handleSubmit={handleLogInForm} loginStatus={authStatus} error={error} handleChange={handleFormChange} /> : <Register handleSubmit={handleRegisterForm} registerStatus={authStatus} error={error} />
      }

    </section>
  );
}
