import React from "react";
import RegisterScreen from "../features/profile/register-user";
import { useTitle } from "../features/common/customHooks";

export default function RegisterPage() {
  useTitle("Bug Spy - Register");
  return (
    <div className="container mx-auto flex h-full items-center justify-center">
      <RegisterScreen />
    </div>
  );
}
