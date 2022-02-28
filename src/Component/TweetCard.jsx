import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, message, Space } from "antd";
import React from "react";
import { INSERT_FOLLOWER_ONE } from "../Graphql/mutations";
import { GET_ALL_TWEETS } from "../Graphql/query";

const { Meta } = Card;

export const TweetCard = ({ data }) => {
  const user_id = localStorage.getItem("user_id");
  const [INSERT_FOLLOWER_ONE_MUTATION] = useMutation(INSERT_FOLLOWER_ONE);
  const { data: tweetData, loading: tweetDataloading } =
    useQuery(GET_ALL_TWEETS);

  const handleFollow = async (id) => {
    try {
      const { data } = await INSERT_FOLLOWER_ONE_MUTATION({
        variables: {
          followed_by: user_id,
          follow_to: id,
        },
        update: (cache, { data: { insert_follower_one } }) => {
          const { tweet } = cache.readQuery({
            query: GET_ALL_TWEETS,
          });
          cache.writeQuery({
            query: GET_ALL_TWEETS,
            data: {
              tweet: tweet.filter((t) => t.user.id !== user_id),
            },
          });
        },
      });
      if (data) {
        message.success("Followed Successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      {data &&
        data.tweet.map((tw) => {
          return (
            <Card>
              <Card.Grid style={{ width: "100%", height: "100%" }}>
                <div className="space-align-block">
                  <Space align="center">
                    <Meta
                      avatar={<EditOutlined />}
                      title={tw?.user?.name}
                      description={tw.description}
                    />
                    {tw?.user?.id !== user_id && (
                      <Button
                        key={tw?.id}
                        onClick={() => handleFollow(tw?.user?.id)}
                        type="primary"
                      >
                        Follow
                      </Button>
                    )}
                  </Space>
                </div>
              </Card.Grid>
            </Card>
          );
        })}
    </>
  );
};
