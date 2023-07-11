import React, { useEffect } from "react";
import LogIn from "./login";
import person from "./images/user-login.svg";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginUser, selectStatus, error as errorAction } from "./authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  authType: string;
}

export default function LoginScreen({ authType }: Props) {
  const authStatus = useAppSelector(selectStatus);
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(loginUser({ email: email.toLocaleLowerCase(), password })).then(
        (data) => {
          if (data.meta.requestStatus === "fulfilled") navigate("/projects");
        }
      );
      return;
    } else return console.log("Email or password is invalid");
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      dispatch(errorAction(""));
    }
    return;
  };
  return (
    <div>
      <p className="text-left">
        Test Account:[cam@ex.com] password:[1234asdAA]
      </p>
      <section className="flex h-fit items-center gap-3 rounded-md border bg-white p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className=" hidden w-1/2 sm:block">
          <img src={person} alt="a person" />
        </div>
        <div className=" mx-auto w-3/4 p-2 sm:w-1/2 ">
          <LogIn
            handleSubmit={handleLogInForm}
            loginStatus={authStatus}
            error={error}
            handleChange={handleFormChange}
          />
          <p className="mt-2 p-2">
            Don't have an account?{" "}
            <button
              className="text-primary-500"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
