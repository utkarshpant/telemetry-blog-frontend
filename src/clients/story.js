import axios from 'axios';

/**
 * ### Create a new story
 * @param {String} authToken - the base64 encoded JWT to authenticate the user; 
 * @param {Object} user - the user data stored in application state;
 * @returns a Promise that resolves to the newly created story or an error
 */
const create = async (authToken, user) => {
    const url = `${process.env.REACT_APP_API_URL}/api/story/new/`;
    const initPayload = {
        owner: user.username,
        storyTitle: '',
        storyBody: '',
        storySubtitle: '',
        tags: []
    };
    const options = {
        headers: {
            'x-auth-token': authToken,
        },
        method: 'POST',
        responseType: 'json',
        timeout: 10000,
        data: initPayload,
    };
    const response = await axios(url, options);
    return response;
};

/**
 * ### Get a story by ID
 * @param {String} storyId - the ID of the story that needs to be fetched;
 * @returns a Promise that resolves to either the fetched story, or an error
 */
const getStoryById = async (storyId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/story/get/${storyId}`;
    const options = {
        responseType: 'json',
        timeout: 10000,
    };
    const response = await axios(url, options);
    return response;
};


/**
 * ### Get all stories by an author
 * @param {String} username - the username to fetch stories for;
 * @returns a Promise that resolves either to the API response or to an error;
 */
const getStoriesByUsername = async (username) => {
    const url = `${process.env.REACT_APP_API_URL}/api/user/get/${this.user}/stories`;
    const options = {
        timeout: 10000,
        response: 'json',
        method: 'GET',
    };
    const response = await axios(url, options);
    return response;
};

/**
 * ### Update a given story
 * @param {String} storyId - the ID of the story that needs to be updated;
 * @param {Object} updates - the updates that need to be applied to the specified story; 
 * @returns a Promise that resolves to either the updated story, or an error
 */
const update = async (storyId, updates) => {
    const url = `${process.env.REACT_APP_API_URL}/api/story/update/${storyId}`;
    const options = {
        headers: {
            'x-auth-token': this.context.token
        },
        method: 'POST',
        data: updates,
    };
    const response = await axios(url, options);
    return response;
};

/**
 * 
 * @param {Boolean} publishFlag - boolean flag indicating the publishing status we **want** to set for the story;
 * @param {String} storyId - the ID of the story to be published/unpublished;
 * @param {String} authToken - base64 encoded JWT for authentication+authorisation;
 * @returns a Promise that resolves either to the API response, or an error
 */
const togglePublish = async (publishFlag, storyId, authToken) => {
    const url = `${process.env.REACT_APP_API_URL}/api/story/${publishFlag ? "publish" : "unpublish"}/${storyId}`;
    // Check if this is a bug!
    const options = {
        headers: {
            'x-auth-token': authToken,
        },
        timeout: 10000,
        method: 'GET',
    }
    const response = await axios(url, options);
    return response;
};

/**
 * ### Request story deletion
 * @param {String} storyId - story ID to request deletion for;
 * @returns a Promise that resolves to either the API response or to an error;
 */
const deleteStory = async (storyId) => {
    const url = `${process.env.REACT_APP_API_URL}/api/story/delete/${storyId}`;
    const options = {
        timeout: 10000,
        method: 'DELETE',
    };
    const response = await axios(url, options);
    return response;
}

/**
 * ### A collection of `getter` methods
 * - `byId`: alias for `getStoryById`
 * - `byUsername`: alias for `getStoriesByUsername`
 */
 const get = {
    byId: getStoryById,
    byUsername: getStoriesByUsername,
};

/**
 * A collection of all story-related CRUD API calls.
 * Each key in this object corresponds to a method that makes an Axios
 * AJAX call and returns a promise that resolves to data or to an error.
 */
const story = {
    create,
    get,
    update,
    togglePublish,
    deleteStory,
};

export default story;