import { useMutation, useSubscription } from "@apollo/client";
import { Button, Card, Input, Row, Spin } from "antd";
import React, { useState } from "react";
import Header from "../../Component/Header";
import { TweetCard } from "../../Component/TweetCard";
import { INSERT_TWEET_ONE } from "../../Graphql/mutations";
import { GET_ALL_TWEETS } from "../../Graphql/subscription";
import "./Dashboard.css";

const { TextArea } = Input;

export const Dashboard = () => {
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { data: tweetData, loading: tweetDataloading } =
    useSubscription(GET_ALL_TWEETS);

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
            <Row className="d-flex">
              <TextArea
                style={{ width: "100%", height: "100%" }}
                size="large"
                showCount
                maxLength={140}
                value={description}
                name="tweet"
                placeholder="Tweet (max 140 characters)"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button type="primary" onClick={onsubmit}>
                Submit
              </Button>
            </Row>
            <Spin spinning={tweetDataloading || loading} delay={500}>
              {tweetData && tweetData.tweet.length > 0 ? (
                <TweetCard data={tweetData} />
              ) : (
                <div>No Tweets</div>
              )}
            </Spin>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
