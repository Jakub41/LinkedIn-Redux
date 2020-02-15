import {
  API_URL,
  PROFILES,
  EXPERIENCES,
  POSTS,
  SIGNUP,
  LOGIN,
  AUTOLOADUSER
} from "./constAPI";
import PropTypes from "prop-types";
import { func } from "prop-types";

const createAPIQuery = urlGenerator => async (...params) => {
  try {
    const url = urlGenerator(...params);
    const token = await gettoken();
    let options = {};
    if (token) {
      options = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        })
      };
    } else {
      options = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      };
    }
    const response = await fetch(url, options);
    const json = await response.json();
    return {
      success: true,
      ...json
    };
  } catch {
    return {
      success: false,
      result: [],
      message:
        "There is an issue to get data from server. Please try again later."
    };
  }
};

const createAPIQueryWithPost = ApiPath => async ({ ...params }) => {
  try {
    const url = ApiPath();
    const options = {
      method: "POST",
      body: JSON.stringify(params),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    const response = await fetch(url, options);
    console.log(response);
    const json = await response.json();
    return {
      success: true,
      ...json
    };
  } catch {
    return {
      success: false,
      result: [],
      message:
        "There is an issue to get data from server. Please try again later."
    };
  }
};
// Profiles
export const getProfiles = createAPIQuery(() => `${API_URL}${PROFILES}`);

export const getOneProfileByUsername = createAPIQuery(
  username => `${API_URL}${PROFILES}/user/${username}`
);

// Experiences
export const getExperiencesProfile = createAPIQuery(
  username => `${API_URL}${EXPERIENCES}/${username}`
);

// Posts
export const getPosts = createAPIQuery(() => `${API_URL}${POSTS}`);
export const loadUser = createAPIQuery(() => `${API_URL}${AUTOLOADUSER}`);

export const PostRegister = createAPIQueryWithPost(() => `${API_URL}${SIGNUP}`);

export const PostLogin = createAPIQueryWithPost(() => `${API_URL}${LOGIN}`);

export const savetoken = async token => {
  await localStorage.setItem("acTokenas", token);
};
export const gettoken = async () => {
  return await localStorage.getItem("acTokenas");
};

export const removeToken = async () => {
  return await localStorage.removeItem("acTokenas");
};

createAPIQuery.propTypes = {
  url: PropTypes.string,
  response: PropTypes.object
};

// authorization token
// Authorization: "Bearer " + auth,
