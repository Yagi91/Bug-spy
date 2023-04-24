import React from "react";

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  registerStatus: string;
  error?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Register({
  handleSubmit,
  registerStatus,
  error,
  handleChange,
}: Props) {
  const isLoggedIn = registerStatus === "Success";
  const isLoading = registerStatus === "Loading";

  if (isLoggedIn) return <h1>Sign Up Success</h1>;
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-3">
        <legend>Sign Up</legend>
        <label>
          <span className="block text-left">Name</span>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name here"
            required
            onChange={handleChange}
            minLength={1}
            maxLength={30}
            className="simple-input w-full"
          />
        </label>
        <label>
          <span className="block text-left">Role</span>
          <input
            type="text"
            name="myRole"
            placeholder="Enter your role"
            required
            onChange={handleChange}
            className="simple-input w-full"
          />
        </label>
        <label>
          <span className="block text-left">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Enter a valid email"
            required
            onChange={handleChange}
            className="simple-input w-full invalid:ring-red-300"
          />
        </label>
        <label>
          <span className="block text-left">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter a strong password"
            required
            minLength={8}
            maxLength={20}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            onChange={handleChange}
            className="simple-input w-full"
          />
        </label>
        <label>
          <span className="block text-left">Confirm Password</span>
          <input
            type="password"
            name="password-check"
            placeholder="Re-enter Password"
            required
            minLength={8}
            maxLength={20}
            className="simple-input w-full"
          />
        </label>
        <div>{error}</div>
        <button className="btn-primary w-full" type="submit">
          {isLoading ? "Registering" : "Sign Up"}
        </button>
      </fieldset>
    </form>
  );
}
