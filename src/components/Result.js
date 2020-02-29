import React from "react";
import { Empty, Collapse, Icon } from "antd";

import Api from "../libs/api";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};

const Result = ({ movies }) => {
  if (movies.length < 1) return <Empty />

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={movies[0].id}
      expandIcon={({ isActive }) => (
        <Icon type="caret-right" rotate={isActive ? 90 : 0} />
      )}
    >
      {movies.map((movie, index) => {
        return (
          <Panel header={index+1 + ' ' + movie.title} key={movie.id} style={customPanelStyle}>
            <img src={Api.getMovieImage(movie.poster_path) || 'http://unsplash.it/300'} alt={movie.title} />
            <p>{movie.overview}</p>
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default Result;
