import { getExperiencesProfile } from "../../Services/api";
import { ExperiencesActions } from "../Actions";

class ExperiencesMiddleware {
  static getAllExperiencesProfile = data => {
    return dispatch => {
      console.log("Get Experiences");
      dispatch(ExperiencesActions.getAllExperiences(data));
      getExperiencesProfile(data)
        .then(data => {
          console.log("DATA >>", data);
          dispatch(ExperiencesActions.getAllExperiencesSuccess(data));
        })
        .catch(err => {
          console.log("ERROR >>", err);
        });
    };
  };
}

export default ExperiencesMiddleware;
