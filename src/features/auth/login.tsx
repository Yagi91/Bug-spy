import React from "react";

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

  if (isLoggedIn) return <h1>Login Success</h1>;
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <fieldset className="flex flex-col gap-5">
        <label className="block w-full">
          <span className="block text-left">Your email</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="simple-input w-full invalid:ring-red-300"
          />
        </label>
        <label className="block">
          <span className="block text-left">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="simple-input w-full"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <div>{error}</div>
      </fieldset>
    </form>
  );
}
