import {
  getOneProfileByUsername,
  postMyProfileFistTime
} from "../../Services/api";
import { ProfileActions } from "../Actions";

class ProfileMiddleware {
  static getOneProfile = data => {
    return dispatch => {
      console.log("Get one profile");
      ;
      dispatch(ProfileActions.getOneProfile(data));
      getOneProfileByUsername(data)
        .then(data => {
          console.log("DATA >>", data);
          if (data.newProfile) {
            dispatch(ProfileActions.postMyProfile(data));
          }
        })
        .catch(err => {
          console.log("ERROR >>", err);
        });
    };
  };

  static postMyProfile = data => {
    return dispatch => {
      console.log("Get one profile");
      dispatch(ProfileActions.getOneProfile(data));
      postMyProfileFistTime(data)
        .then(data => {
          console.log("DATA >>", data);
          if (data.newProfile) {
            dispatch(ProfileActions.postMyProfile(data));
          }
        })
        .catch(err => {
          console.log("ERROR >>", err);
        });
    };
  };
}

export default ProfileMiddleware;
