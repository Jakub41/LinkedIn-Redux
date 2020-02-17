import { ProfileActions } from "../Actions";

function ProfileReducer(
  state = {
    profiles: {},
    displaySpinner: false
  },
  action
) {
  console.log("data in action", action.data);
  console.log("Action type", action.type);

  switch (action.type) {
    case ProfileActions.GET_ONE_PROFILE:
      return {
        ...state,
        displaySpinner: true
      };
    case ProfileActions.M:
      return {
        ...state,
        displaySpinner: true
      };
    case ProfileActions.GET_ONE_PROFILE_SUCCESS:
      return {
        ...state,
        profiles: action.data,
        displaySpinner: false
      };
    case ProfileActions.POST_MY_PROFILE:
      return {
        ...state,
        profiles: action.data,
        displaySpinner: false
      };
    default:
      return state;
  }
}

export default ProfileReducer;
