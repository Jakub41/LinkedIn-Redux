import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Media,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import moment from "moment";

const Posts = props => {
  const { post } = props;
  return (
    <div>
      <Card>
        <CardBody>
          <Media>
            <Media left href="#">
              <Media
                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                object
                src={post.image}
                alt="User Profile"
              />
            </Media>
            <Media style={{ paddingLeft: 20 }} body>
              <Media heading>{post.username}</Media>
              Posted at {moment(post.createdAt).format("MMMM DD, YYYY")}
            </Media>
          </Media>
        </CardBody>
        <CardBody>
          <CardText>{post.text}</CardText>
        </CardBody>
        <CardImg
          width="100%"
          style={{ resizeMode: "contain" }}
          src={post.image}
          alt="Post image"
        />
      </Card>
    </div>
  );
};

export default Posts;
