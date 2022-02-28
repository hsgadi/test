import { useSubscription } from "@apollo/client";
import { Button } from "antd";
import React from "react";
import { GET_USER_DETAILS_BY_ID } from "../Graphql/query";
import { history } from "../Utils/Router/browserHistory";

const Header = () => {
  const user_id = localStorage.getItem("user_id");

  const { data: userData } = useSubscription(GET_USER_DETAILS_BY_ID, {
    variables: {
      id: user_id,
    },
  });

  const handleLogOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <header class="header">
      <div class="header-container">
        <div class="header-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="welcome-msg d-flex">
                  <p style={{ marginRight: "10px" }}>
                    Welcome {""}
                    <strong>{userData?.user_by_pk?.name}</strong>{" "}
                  </p>
                  <Button
                    style={{ position: "relative", top: "3px" }}
                    type="primary"
                    onClick={handleLogOut}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
