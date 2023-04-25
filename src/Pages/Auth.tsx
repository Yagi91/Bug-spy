import Auth from "../features/auth/auth";
import { useAppSelector } from "../app/hooks";
import { selectAuthType } from "../features/auth/authSlice";

export default function LoginPage() {
  // const [authType, setAuthType] = useState<string>("Login");

  const authType = useAppSelector(selectAuthType);

  return (
    <div className="container mx-auto flex h-full items-center justify-center">
      <Auth authType={authType} />
    </div>
  );
}
