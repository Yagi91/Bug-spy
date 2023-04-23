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
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col">
        <legend>Login</legend>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="rounded-xl bg-gray-100 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-primary-200"
        />
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
