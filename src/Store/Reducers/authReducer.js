import { AuthAction, ProfileActions } from "../Actions";

function ProfileReducer(
  state = {
    auth: {},
    displaySpinner: false,
    errors: {}
  },
  action
) {
  console.log("data in action", action.data);
  console.log("Action type", action.type);

  switch (action.type) {
    case AuthAction.GET_AUTH_LAODING:
      return {
        ...state,
        displaySpinner: true
      };
    case AuthAction.GET_AUTH:
      return {
        ...state,
        auth: action.data,
        displaySpinner: false
      };
    case AuthAction.GET_AUTH_FAILED:
      return {
        ...state,
        displaySpinner: false,
        errors: action.data
      };
    case ProfileActions.POST_MY_PROFILE:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: { ...state.auth.user, profile: action.data.newProfile }
        },
        displaySpinner: false
      };
    case AuthAction.GET_LOGOUT:
      return {
        ...state,
        errors: {},
        auth: {},
        displaySpinner: false
      };
    default:
      return state;
  }
}

export default ProfileReducer;
