import { PostsActions } from "../Actions";

function PostsReducer(
  state = {
    posts: [],
    error: null,
    count: ""
  },
  action
) {
  console.log("PostsActions >>>", action.data);
  console.log("PostsActions type", action.type);

  switch (action.type) {
    case PostsActions.GET_POSTS:
      return {
        ...state
      };
    case PostsActions.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data.posts,
        count: action.data.count
      };
    case PostsActions.GET_POSTS_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export default PostsReducer;
