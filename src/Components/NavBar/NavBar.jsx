import React from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";
import { removeToken } from "../../Services/api";
// import Logo from "../../li-logo.png";
// import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiLinkedin, FiHome, fiLogout } from "react-icons/fi";
import {
  MdRssFeed,
  MdWork,
  MdNotificationsNone,
  MdGridOn,
  MdPersonOutline
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { TiMessages } from "react-icons/ti";
import { GiTeacher } from "react-icons/gi";
import { AuthAction } from "../../Store/Actions/index";

function NavBar() {
  let auth = useSelector(state => state.AuthReducer.auth);
  const dispatch = useDispatch();

  const logoutAction = async () => {
    await removeToken();
    dispatch(AuthAction.getLogout());
  };

  return (
    <>
      {auth ? (
        auth.user ? (
          auth.user._id ? (
            <Navbar
              collapseOnSelect
              sticky="top"
              className="nav-li-bg justify-content-between"
              variant="light"
              expand="lg"
            >
              <Container>
                <Navbar.Brand href="/">
                  {/* <img
              src={Logo}
              width="50"
              height="50"
              className="d-inline-block align-top li-logo-bg"
              alt="logo"
            /> */}
                  <FiLinkedin className="li-icon" />
                </Navbar.Brand>
                <Form inline>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ml-auto">
                    <Nav.Link href="/">
                      <FiHome className="nav-icon" />
                      <Nav.Item>Home</Nav.Item>
                    </Nav.Link>
                    <Nav.Link href="/pages/feeds">
                      <MdRssFeed className="nav-icon" />
                      <Nav.Item>News Feed</Nav.Item>
                    </Nav.Link>
                    <Nav.Link href="#">
                      <MdWork className="nav-icon" />
                      <Nav.Item>Job</Nav.Item>
                    </Nav.Link>
                    <Nav.Link href="#">
                      <TiMessages className="nav-icon" />
                      <Nav.Item>Messaging</Nav.Item>
                    </Nav.Link>
                    <Nav.Link href="#">
                      <MdNotificationsNone className="nav-icon" />
                      <Nav.Item>Notifications</Nav.Item>
                    </Nav.Link>
                    <Nav.Link href="#">
                      <MdPersonOutline className="nav-icon" />
                      <Nav.Item>Me</Nav.Item>
                    </Nav.Link>
                    <div className="vl d-lg-inline-block d-none ml-3"></div>
                    <Nav.Link href="#">
                      <MdGridOn className="nav-icon" />
                      <Nav.Item>Work</Nav.Item>
                    </Nav.Link>
                    <Nav.Link href="#">
                      <GiTeacher className="nav-icon" />
                      <Nav.Item>Learning</Nav.Item>
                    </Nav.Link>
                    <Nav.Link onClick={() => logoutAction()}>
                      <MdPersonOutline className="nav-icon" />
                      <Nav.Item>logout</Nav.Item>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          ) : null
        ) : null
      ) : null}
    </>
  );
}
export default NavBar;
