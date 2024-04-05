import Cookies from "js-cookie";

export const authServices = () => {
    const userToken = Cookies.get('token');
    const tokenExpiresAt = Cookies.get('expiresAt');
    if (userToken && (new Date(tokenExpiresAt) >= new Date())) {
        return true;
    } else {
        Cookies.remove('userID');
        Cookies.remove('token');
        Cookies.remove('expiresAt');
        return false;
    }
};