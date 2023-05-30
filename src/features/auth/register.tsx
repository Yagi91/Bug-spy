import React from "react";
// import { SimpleInput } from "./commons";
import { SimpleInput } from "../common/common";
import Select from "react-select";

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
  const [password, setPassword] = React.useState<string>("");
  const isLoggedIn = registerStatus === "Success";
  const isLoading = registerStatus === "Loading";

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // handleChange(event);
  };

  interface Options {
    value: string;
    label: string;
  }

  const options: Options[] = [
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
    { value: "Lead", label: "Lead" },
    { value: "Manager", label: "Manager" },
  ];

  if (isLoggedIn) return <h1>Sign Up Success</h1>;
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-3">
        <legend className="py-2 text-left text-2xl font-extrabold">
          Register
        </legend>
        <SimpleInput
          handleChange={handleChange}
          type="text"
          name="fullName"
          placeholder="Enter your name here"
          required={true}
          label="Name"
          extraClass="invalid:ring-red-300 w-full"
        />
        <Select
          options={options}
          placeholder="Select Role..."
          onChange={(e) => console.log(e)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // borderColor: state.isFocused ? "grey" : "red",
              borderRadius: "0.75rem",
              borderWidth: "2px",
              textAlign: "left",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: state.isSelected ? "0.75rem" : "0",
            }),
          }}
        />
        <SimpleInput
          handleChange={handleChange}
          type="email"
          name="email"
          placeholder="Enter a valid email"
          required={true}
          label="Email"
          extraClass="invalid:ring-red-300 w-full"
        />

        <SimpleInput
          handleChange={handlePassword}
          type="password"
          name="password"
          placeholder="Enter a strong password"
          required={true}
          label="Password"
          extraClass="invalid:ring-red-300 valid:ring-accent-300 w-full"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
          extraInfo="Must be 8+ characters, 1 uppercase, 1 lowercase, 1 number, no special characters."
        />
        <SimpleInput
          type="password"
          name="password-check"
          placeholder="Re-enter Password"
          required={true}
          label="Confirm Password"
          extraClass="invalid:ring-secondary-300 w-full"
          pattern={password}
        />
        <div className="test-xs color-secondary-300 font-medium ">{error}</div>
        <button className="btn-primary w-full" type="submit">
          {isLoading ? "Registering" : "Sign Up"}
        </button>
      </fieldset>
    </form>
  );
}
