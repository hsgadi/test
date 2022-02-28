import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, Input, Spin } from "antd";
import React, { useState } from "react";
import Header from "../../Component/Header";
import { TweetCard } from "../../Component/TweetCard";
import { INSERT_TWEET_ONE } from "../../Graphql/mutations";
import { GET_ALL_TWEETS } from "../../Graphql/query";
import "./Dashboard.css";

export const Dashboard = () => {
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { data: tweetData, loading: tweetDataloading } =
    useQuery(GET_ALL_TWEETS);

  const [INSERT_TWEET_ONE_MUTATION] = useMutation(INSERT_TWEET_ONE);

  const onsubmit = async () => {
    setLoading(true);
    const { data } = await INSERT_TWEET_ONE_MUTATION({
      variables: {
        description,
        user_id,
      },
    });
    if (data) {
      setLoading(false);
      setDescription("");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="registrationContainer">
        <div className="container">
          <div className="pagetitle">Feeds</div>
          <Card>
            <div className="d-flex">
              <Input
                value={description}
                name="tweet"
                placeholder="Tweet"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button type="primary" onClick={onsubmit}>
                Submit
              </Button>
            </div>
            <Spin spinning={tweetDataloading || loading} delay={500}>
              {tweetData && <TweetCard data={tweetData} />}
            </Spin>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
