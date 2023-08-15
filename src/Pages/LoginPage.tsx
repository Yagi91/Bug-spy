import LoginScreen from "../features/auth/login-auth";
import { useAppSelector } from "../app/hooks";
import { selectAuthType } from "../features/auth/authSlice";
import { useTitle } from "../features/common/customHooks";

export default function LoginPage() {
  const authType = useAppSelector(selectAuthType);

  useTitle("Bug Spy - Login to your account");

  return (
    <div className="container mx-auto flex h-full items-center justify-center border">
      <LoginScreen authType={authType} />
    </div>
  );
}
