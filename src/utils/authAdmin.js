import { app, getLocalStorageTokens } from "./axiosConfig"
export const validToken = async () => {

    //If there aren't any saved tokens in localstorage, don't verify tokens.
    if (getLocalStorageTokens("token") === null) return;

    try {
        const authReq = await app.post("adminVerify/verifyToken");

        const tokenStatus = authReq.data.status;
        const expiredToken = authReq.data.expiredToken;
        const newToken = authReq.data.newToken;

        //Checks if the access token is valid or expired in order to update the localstorage.
        if (!expiredToken && tokenStatus === "Success" ) {
            return true;
        }
        if (expiredToken && tokenStatus === "Success") {
            localStorage.setItem("token", JSON.stringify(newToken));
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}
