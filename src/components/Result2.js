import React, { useState } from "react";
import { List, Icon, Button, Typography } from "antd";
import Api from "../libs/api";
import EditMovie from "./EditMovie";

const { Title } = Typography;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const Result2 = ({ movies, handleEdit }) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [activeMovie, setActiveMovie] = useState({});

  const handleClick = (movie) => {
    setIsEditActive(true)
    setActiveMovie(movie)
  }

  const toggleVisible = (value) => {
    setIsEditActive(value)
  }

  return (
    <>
      {isEditActive ? (
        <EditMovie
          title={`Edit ${activeMovie.title || ''} details`}
          placement="right"
          closable
          onClose={() => setIsEditActive(false)}
          visible={isEditActive}
          toggleVisible={toggleVisible}
          data={activeMovie || {}}
        />
      ) : (
        ""
      )}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={movies}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                type="star-o"
                text={item.vote_average}
                key="list-vertical-star-o"
              />,
              <IconText
                type="user"
                text={item.vote_count}
                key="list-vertical-user-o"
              />,
              <IconText type="message" text="2" key="list-vertical-message" />,
              <div style={{ marginTop: "2em", marginLeft: "-15px" }}>
                <Button
                  type="primary"
                  size="default"
                  icon="edit"
                  onClick={() => handleClick(item)}
                >
                  Edit and add to record
                </Button>
              </div>
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={
                  item.poster_path
                    ? Api.getMovieImage(item.poster_path)
                    : "http://unsplash.it/250"
                }
              />
            }
          >
            {/*<List.Item.Meta
              avatar={<Avatar src={""} />}
              title={<a href={""}>{item.title}</a>}
                description={item.overview}
            />
            */}
            <Title level={2}>––{item.title}</Title>
            <div style={{ marginBottom: "2em" }}>{item.overview}</div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Result2;
