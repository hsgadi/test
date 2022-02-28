import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardGroup, Col, Container, Row } from "reactstrap";
import { GET_USER_DETAILS } from "../../../Graphql/query";
import { history } from "../../../Utils/Router/browserHistory";
import "./Login.css";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState("");

  const { data: userData, loading: userDataLoading } =
    useQuery(GET_USER_DETAILS);

  useEffect(() => {
    if (userData && !userDataLoading) {
      setUsers(userData.user);
    }
  }, [userData, userDataLoading]);

  const loginSubmitHandler = (e) => {
    try {
      setLoading(true);
      localStorage.clear();
      const user = users.find((user) => user.email === e.email);
      if (user) {
        localStorage.setItem("user_id", user.id);
        history.push("/dashboard");
        setLoading(false);
      } else {
        message.error("Email address not available, Please register first");
      }
      e.preventDefault();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <CardGroup>
              <Card>
                <CardBody>
                  <Form
                    name="normal_login"
                    form={form}
                    className="login-form"
                    onFinish={loginSubmitHandler}
                  >
                    <p className="text-muted text-center mb-3">
                      Sign In to your account
                    </p>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Email!",
                        },
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                      ]}
                      className="mb-3"
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                      />
                    </Form.Item>
                    <Form.Item className="text-center">
                      <Button
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button mr-5"
                        loading={loading}
                      >
                        Log in
                      </Button>
                      <Button
                        shape="round"
                        type="primary"
                        onClick={() => history.push("/register")}
                        className="login-form-button"
                      >
                        Register
                      </Button>
                    </Form.Item>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
