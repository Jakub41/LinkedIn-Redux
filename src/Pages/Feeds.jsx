import React, { useEffect } from "react";
import Posts from "../Components/Posts/Posts";
import { useDispatch, useSelector, connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { PostsMiddleware } from "../Store/Middleware";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PostsMiddleware.getAllPosts());
  }, [dispatch]);

  let posts = useSelector(state => state.PostsReducer.posts);

  console.log("=======Get all potsts ======", posts);

  return (
    <Row>
      <Col md={1}></Col>
      <Col md={6}>
        <h2 style={{ margin: "20px 0px" }}>News Feed</h2>
        {posts && posts.length > 0
          ? posts.map(n => <Posts key={n._id} post={n} />)
          : "N/A"}
      </Col>
    </Row>
  );
};

export default Feed;
