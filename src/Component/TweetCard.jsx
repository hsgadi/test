import { UserOutlined } from "@ant-design/icons";
import { useMutation, useSubscription } from "@apollo/client";
import { Button, Card, message, Space } from "antd";
import React from "react";
import { INSERT_FOLLOWER_ONE, DELETE_FOLLOWER_ONE } from "../Graphql/mutations";
import { GET_ALL_FOLLOWERS } from "../Graphql/query";
import moment from "moment";

const { Meta } = Card;

export const TweetCard = ({ data }) => {
  const user_id = localStorage.getItem("user_id");
  const [INSERT_FOLLOWER_ONE_MUTATION, { loading: insertingfollower }] =
    useMutation(INSERT_FOLLOWER_ONE);
  const [DELETE_FOLLOWER_ONE_MUTATION, { loading: deletingfollower }] =
    useMutation(DELETE_FOLLOWER_ONE);

  const { data: followerData, loading: followerDataloading } =
    useSubscription(GET_ALL_FOLLOWERS);

  const handleFollow = async (id) => {
    try {
      const { data } = await INSERT_FOLLOWER_ONE_MUTATION({
        variables: {
          followed_by: user_id,
          follow_to: id,
        },
      });
      if (data) {
        message.success("Followed Successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUnFollow = async (id) => {
    try {
      const { data } = await DELETE_FOLLOWER_ONE_MUTATION({
        variables: {
          followed_by: user_id,
          follow_to: id,
        },
      });
      if (data) {
        message.success("UnFollowed Successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {data &&
        data.tweet.map((tw) => {
          const totalFollower = followerData?.followers?.filter(
            (x) => x.user.id === tw?.user?.id
          ).length;

          const following = followerData?.followers
            ?.filter((x) => x.followed_by === user_id)
            ?.map((x) => x.user.id);

          return (
            <Card>
              <Card.Grid style={{ width: "100%", height: "100%" }}>
                <Space align="center">
                  <div className="d-flex">
                    <div className="space-align-block">
                      <Meta
                        avatar={<UserOutlined />}
                        title={tw?.user?.name}
                        description={tw.description}
                      />
                      <p>{moment(tw.created_at).startOf().fromNow()}</p>
                    </div>
                    {tw?.user?.id !== user_id && (
                      <>
                        {following?.findIndex((x) => x === tw?.user?.id) >
                        -1 ? (
                          <Button
                            key={tw?.id}
                            onClick={() => handleUnFollow(tw?.user?.id)}
                            type="default"
                            loading={deletingfollower}
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            key={tw?.id}
                            onClick={() => handleFollow(tw?.user?.id)}
                            type="primary"
                            loading={insertingfollower}
                          >
                            Follow
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                  {tw?.user?.id !== user_id && followerData && (
                    <strong>
                      {`${followerData.followers.length > 0 && totalFollower} ${
                        totalFollower > 1 ? "Followers" : "Follower"
                      }`}
                    </strong>
                  )}
                </Space>
              </Card.Grid>
            </Card>
          );
        })}
    </>
  );
};
