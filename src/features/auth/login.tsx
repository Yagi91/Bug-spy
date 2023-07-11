import React from "react";
import { SimpleInput } from "../common/common";

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loginStatus: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function LogIn({
  handleSubmit,
  loginStatus,
  error,
  handleChange,
}: Props) {
  const isLoggedIn = loginStatus === "Success";
  const isLoading = loginStatus === "Loading";

  // if (isLoggedIn) return <h1>Login Success</h1>;
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <fieldset className="flex flex-col gap-5">
        <legend className="py-2 text-left text-2xl font-extrabold">
          Login
        </legend>
        <SimpleInput
          handleChange={handleChange}
          type="email"
          name="email"
          placeholder="Enter your email"
          required={true}
          label="Email"
          extraClass={
            "invalid:ring-red-300 w-full" + (error ? " border-red-300" : "")
          }
        />
        <SimpleInput
          handleChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter your password"
          required={true}
          label="Password"
          extraClass={
            "invalid:ring-red-300 w-full" + (error ? " border-red-300" : "")
          }
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className={`text-secondary-500 ${error ? "initial" : "hidden"}`}>
          {error}
        </p>
      </fieldset>
    </form>
  );
}
