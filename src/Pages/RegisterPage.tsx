import * as React from "react";
import Register from "../features/profile/register-user";
import person from "../features/auth/images/user-login.svg";
import { useNavigate } from "react-router-dom";

const passwordFormatChecker = (password: string): boolean => {
  const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordFormat.test(password);
};

export default function RegisterPage() {
  const navigate = useNavigate();

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
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (error) {
    //   dispatch(errorAction(""));
    // }
    return;
  };
  return (
    <div className="container mx-auto flex h-full items-center justify-center">
      <section className="flex h-fit items-center gap-3 rounded-md border bg-white p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className=" hidden w-1/2 sm:block">
          <img src={person} alt="a person" />
        </div>
        <div className=" mx-auto w-3/4 p-2 sm:w-1/2 ">
          <Register
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
        </div>
      </section>
    </div>
  );
}
