import axios from 'axois';

/**
 * ### Request the logged-in user's data
 * @param {String} authToken base64 encoded JWT authenticating the user; 
 * @returns a Promise that resolves to either user data, or an error,
 */
const self = async (authToken) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/me`;
    const options = {
        headers: {
            'x-auth-token': authToken,
        },
        timeout: 10000,
        method: 'GET',
    };
    const response = await axios(url, options);
    return response;
};

/**
 * ### Fetch data for a given user
 * @param {String} authToken - base64 encoded JWT to authenticate the requestor;
 * @param {String} username - the username for which data is to be fetched;
 * @returns a Promise that resolves to either requested data, or to an error
 */
const getUserByUsername = async (authToken, username) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/get/${this.props.match.params.username}`;
    const options = {
        timeout: 10000,
        method: 'GET',
        response: 'json',
    };
    const response = await axios(url, options);
    return response;
}

/**
 * A collection of 'getter' methods for user
 * data.
 */
const get = {
    self,
    byUsername: getUserByUsername,
}

/**
 * A collection of all user-related CRUD API calls.
 * Each key in this object corresponds to a method that makes an Axios
 * AJAX call and returns a promise that resolves to data or to an error.
 */
const user = {
    get,
};

export default user;