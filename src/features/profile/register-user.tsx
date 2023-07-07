import React, { useState } from "react";
import RegisterForm from "./register";
import person from "../auth/images/user-login.svg";
import { useNavigate } from "react-router-dom";
import { create } from "./api-user";

const passwordFormatChecker = (password: string): boolean => {
  const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordFormat.test(password);
};

export default function RegisterScreen() {
  const [values, setValues] = useState({
    error: "",
    open: false,
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleRegisterForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const name: string = event.currentTarget.fullName.value;
    const role: string = event.currentTarget.userRole.value;
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;
    const passwordCheck: string = event.currentTarget["password-check"].value;
    const isPasswordValid = passwordFormatChecker(password);
    // if (isPasswordValid && password === passwordCheck) {
    //   //Hit the backend and submit the form
    //   dispatch(
    //     registerUser({ email: email.toLocaleLowerCase(), password, role, name })
    //   );
    // } else if (!isPasswordValid) {
    //   errorAction(
    //     "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
    //   );
    //   return;
    // } else if (password !== passwordCheck) {
    //   errorAction("Passwords do not match");
    //   return;
    // }
    console.log({ name, role, email, password });
    try {
      if (isPasswordValid && password === passwordCheck) {
        await create({ name, role, email, password });
        setValues({ ...values, open: true, error: "" });
        navigate("/");
      } else if (!isPasswordValid) {
        throw new Error(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
        );
      } else {
        throw new Error("Passwords do not match");
      }
    } catch (error: any) {
      console.log("error:", error.message);
      setValues({ ...values, error: error.message ? error.message : "" });
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (error) {
    //   dispatch(errorAction(""));
    // }
    if (values.error) {
      setValues({ ...values, error: "" });
    }
    return;
  };
  return (
    <section className="flex h-fit items-center gap-3 rounded-md border bg-white p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className=" hidden w-1/2 sm:block">
        <img src={person} alt="a person" />
      </div>
      <div className=" mx-auto w-3/4 p-2 sm:w-1/2 ">
        <RegisterForm
          handleSubmit={handleRegisterForm}
          handleChange={handleFormChange}
          registerStatus={"loading"}
          error={""}
        />
        <p className="mt-2 p-2">
          Already have an account?{" "}
          <button
            className="text-primary-500"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
        <p
          className={`text-secondary-500 ${
            values.error ? "initial" : "hidden"
          }`}
        >
          {values.error}
        </p>
      </div>
    </section>
  );
}
