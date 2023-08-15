import { useTitle } from "../features/common/customHooks";
import Profile from "../features/profile/profile";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  useTitle("Bug Spy - Profile: " + userId);
  return (
    <>
      <Profile userId={userId as string} />
    </>
  );
}
