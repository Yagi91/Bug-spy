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
      <fieldset>
        <legend>Sign Up</legend>
        <label>
            <span>Name</span>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          required
          onChange={handleChange}
          minLength={1}
          maxLength={30}
          className="simple-input w-full"
        />
        </label>
        <label>
            <span>Role</span>
        <input
          type="text"
          name="myRole"
          placeholder="Role"
          required
          onChange={handleChange}
          className="simple-input w-full"
        />
        </label>
        <label>
            <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="simple-input w-full"
        />
        </label>
        <label>
            <span>Passwprd</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={8}
          maxLength={20}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
          onChange={handleChange}
          className="simple-input w-full"
        />
        </label>
        <label>
            <span>Confirm Password</span>
        <input
          type="password"
          name="password-check"
          placeholder="Confirm Password"
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
