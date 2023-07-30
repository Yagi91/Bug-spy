import Profile from "../features/profile/profile";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  return (
    <>
      <Profile userId={userId as string} />
    </>
  );
}
