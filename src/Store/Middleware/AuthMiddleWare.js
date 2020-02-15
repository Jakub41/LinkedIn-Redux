import {
  PostRegister,
  PostLogin,
  savetoken,
  gettoken,
  loadUser
} from "../../Services/api";
import { AuthAction } from "../Actions";

class AuthMiddleware {
  static getRegister = data => {
    console.log(data);
    return dispatch => {
      dispatch(AuthAction.getAuthLaoding());
      PostRegister(data)
        .then(data => {
          if (data.accessToken) {
            savetoken(data.accessToken);
            dispatch(AuthAction.getAuth(data));
          } else {
            dispatch(AuthAction.getAuthFailed(data));
          }
        })
        .catch(error => {
          dispatch(AuthAction.getAuthFailed(error));
        });
    };
  };

  static getLogin = data => {
    return dispatch => {
      dispatch(AuthAction.getAuthLaoding());
      PostLogin(data)
        .then(data => {
          if (data.accessToken) {
            savetoken(data.accessToken);
            dispatch(AuthAction.getAuth(data));
          } else {
            dispatch(AuthAction.getAuthFailed(data));
          }
        })
        .catch(error => {
          dispatch(AuthAction.getAuthFailed(error));
        });
    };
  };

  static Autoload = data => {
    return dispatch => {
      const token = gettoken();
      if (token) {
        loadUser()
          .then(data => {
            if (data.accessToken) {
              savetoken(data.accessToken);
              dispatch(AuthAction.getAuth(data));
            }
          })
          .catch(error => {
            console.log("auto auth failed");
          });
      }
    };
  };
}

export default AuthMiddleware;
