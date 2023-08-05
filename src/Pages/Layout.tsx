import { Outlet } from "react-router-dom";
import Link from "../features/layout/link";
import ConfirmModal from "../features/common/confirm_modal";
import { logout as logoutAction } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

//This is the layout for the app. It is a flex container with two children. The first child is a nav bar that is a flex container with two children. The second child is the outlet for the routes.
export default function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { _id } = useAppSelector((state) => state.auth.userInfo);
  const handleLogout = () => {
    try {
      dispatch(logoutAction());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container relative mx-auto flex h-full flex-col-reverse sm:flex-row">
      <nav className="fixed bottom-6 z-40 flex h-[60px] w-[99%] flex-row-reverse items-center justify-center rounded-full border bg-white py-5 font-bold text-neutral-900 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] sm:relative sm:bottom-0 sm:h-auto sm:h-full sm:w-60 sm:flex-col sm:justify-between sm:rounded-sm sm:shadow-none">
        <div className="flex w-11/12 justify-around gap-4 p-2 sm:flex-col sm:justify-between">
          <Link
            path="/projects"
            id="projects"
            name="Projects"
            icon="list_alt"
          />
          <Link
            path={`/my-tickets/${_id}`}
            id="my-tickets"
            name="My Tickets"
            icon="bug_report"
          />
          <Link
            path={`/profile/${_id}`}
            id="profile"
            name="Profile"
            icon="person"
          />
        </div>
        <div
          className="border-r-2 border-neutral-300 p-2 sm:w-full sm:border-r-0 sm:border-t-2"
          onClick={handleLogout}
        >
          <button className="nav-element">
            <span className="material-symbols-outlined block">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
      <div className="mx-auto flex h-full w-full sm:justify-center sm:p-4">
        <Outlet />
        <ConfirmModal />
      </div>
    </div>
  );
}

export const AppLayout = (): JSX.Element => {
  return (
    <main className="App h-screen border bg-neutral-100 font-inter text-neutral-800">
      <Outlet />
    </main>
  );
};
