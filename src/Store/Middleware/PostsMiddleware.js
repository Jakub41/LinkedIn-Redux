import { getPosts } from "../../Services/api";
import { PostsActions } from "../Actions";

class PostsMiddleware {
  static getAllPosts = () => {
    return dispatch => {
      dispatch(PostsActions.getAllPost());
      getPosts()
        .then(data => dispatch(PostsActions.getAllPostSuccess(data)))
        .catch(error => {
          dispatch(PostsActions.getAllPostError(error));
        });
    };
  };
}

export default PostsMiddleware;
