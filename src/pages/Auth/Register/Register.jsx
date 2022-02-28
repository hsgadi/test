import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Card, CardBody, CardGroup, Col, Container, Row } from "reactstrap";
import { Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { history } from "../../../Utils/Router/browserHistory";
import { GET_USER_DETAILS } from "../../../Graphql/query";
import { REGISTER_USER } from "../../../Graphql/mutations";
import "./Register.css";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState("");

  const { data: userData, loading: userDataLoading } =
    useQuery(GET_USER_DETAILS);

  const [REGISTER_USER_MUTATION] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (userData && !userDataLoading) {
      setUsers(userData.user);
    }
  }, [userData, userDataLoading]);

  const loginSubmitHandler = async ({ email, name }) => {
    try {
      const user = users.find((user) => user.email === email);
      setLoading(true);
      if (user) {
        message.error("Email address is already registered");
        setLoading(false);
      } else {
        setLoading(true);
        const { data } = await REGISTER_USER_MUTATION({
          variables: {
            email,
            name,
          },
        });
        if (data) {
          message.success("Registration Successful");
          history.push("/login");
          setLoading(false);
        }
      }
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
                    <p className="text-muted text-center mb-3">Register here</p>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name!",
                        },
                      ]}
                      className="mb-3"
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Please enter your name"
                      />
                    </Form.Item>
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
                        placeholder="Please enter your e-mail"
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
                        Register
                      </Button>
                      <Button
                        shape="round"
                        type="primary"
                        onClick={() => history.push("/login")}
                        className="login-form-button mr-5"
                      >
                        Back to login
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

export default Register;
