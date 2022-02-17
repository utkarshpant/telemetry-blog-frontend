import axios from 'axios';

/**
 * ### Request new user sign-up
 * @param {Object} userData - user data to user for sign up;
 * @returns a Promise that resolves either to the API response, or an error; 
 */
const triggerSignUp = async (userData) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/signup`;
    const options = {
        timeout: 10000,
        response: 'json',
        data: userData,
        method: 'POST'
    };
    const response = await axios(url, options);
    return response;
}

/**
 * ### Request sign-in link
 * @param {String} username - the username we are requesting the sign-in link for;
 * @returns a Promise that resolves to either the API response, or an error;
 */
const triggerSignIn = async (username) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/signin`;
    const payload = {
        username,
    };
    const options = {
        timeout: 10000,
        response: 'json',
        method: 'POST',
        data: payload,
    };
    const response = await axios(url, options);
    return response;
}

/**
 * ### Verify token and sign-in
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
    triggerSignUp,
    triggerSignIn,
    verifyToken,
}

export default auth;