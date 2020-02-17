class ProfileActions {
  static GET_ONE_PROFILE = "GET_ONE_PROFILE";
  static GET_ONE_PROFILE_SUCCESS = "GET_ONE_PROFILE_SUCCESS";
  static POST_MY_PROFILE = "POST_MY_PROFILE";
  static POST_MY_PROFILE_LOADING = "POST_MY_PROFILE_LOADING";
  static POST_MY_PROFILE_FAILED = "POST_MY_PROFILE_FAILED";

  static getOneProfile = data => {
    return {
      type: this.GET_ONE_PROFILE,
      data: data
    };
  };
  static postMyProfile = data => {
    return {
      type: this.POST_MY_PROFILE,
      data: data
    };
  };
  static postMyProfileFailed = data => {
    return {
      type: this.POST_MY_PROFILE_FAILED,
      data: data
    };
  };
  static postMyProfileLoading = data => {
    return {
      type: this.POST_MY_PROFILE_LOADING,
      data: data
    };
  };
  static getOneProfileSuccess = data => {
    return {
      type: this.GET_ONE_PROFILE_SUCCESS,
      data: data,
      success: true
    };
  };
}

export default ProfileActions;
