import { signout } from "./api-auth";

function authenticate(jwt: any, cb: any) {
    if (typeof window !== "undefined")
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
};

function isAuthenticated() {
    if (typeof window == "undefined")
        return false;
    if (sessionStorage.getItem("jwt"))
        return JSON.parse(sessionStorage.getItem("jwt") || "{}");
    else
        return false;
};

//you should use this method to clear the jwt from sessionStorage and the cookie when the user signs out
function clearJWT(cb: any) {
    if (typeof window !== "undefined")
        sessionStorage.removeItem("jwt");
    cb();
    //optional
    signout().then((data: any) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"//t is the name of the cookie, and the rest is to set the expiration date to the past
    });
}

export const auth = { authenticate, isAuthenticated, clearJWT };