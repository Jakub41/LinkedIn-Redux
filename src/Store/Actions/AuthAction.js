class RegisterActions {
  static GET_AUTH = "GET_AUTH";
  static GET_AUTH_FAILED = "GET_AUTH_FAILED";
  static GET_AUTH_LAODING = "GET_AUTH_LAODING";
  static GET_LOGOUT = "GET_LOGOUT";

  static getAuth = data => {
    return {
      type: this.GET_AUTH,
      data: data
    };
  };

  static getAuthFailed = data => {
    return {
      type: this.GET_AUTH_FAILED,
      data: data,
      success: true
    };
  };
  static getAuthLaoding = data => {
    return {
      type: this.GET_AUTH_LAODING
    };
  };
  static getLogout = data => {
    return {
      type: this.GET_LOGOUT
    };
  };
}

export default RegisterActions;
