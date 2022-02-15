import axios from 'axios';

/**
 * 
 * @param {String} token - the random token generated for the user to login with
 * @param {String} username - the users alias on Telemetry
 * @returns a Promise which will resolve to either the JWT + user data,
 * or an error.
 */
const verifyToken = async (token, username) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/authenticate/${token}?username=${username}`;
    const response = await axios(url, {
        timeout: 10000,
        responseType: 'json',
        method: 'GET',
    });
    return response;
}

/**
 * A collection of all authentication/authorisation related API calls.
 * Each key in this object corresponds to a method that makes an Axios
 * AJAX call and returns a promise that resolves to data or to an error.
 */
const auth = {
    verifyToken,
}

export default auth;