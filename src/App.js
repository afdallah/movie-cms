import React, { useState } from "react";
import { Row, Col, Input, Typography } from "antd";

import Spinner from "./components/Spinner";
//import Result from "./components/Result";
import Result2 from "./components/Result2";
import request from "./libs/request";

const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;

const { Search } = Input;
const { Title, Paragraph } = Typography

const appStyle = {
  marginTop: "3em"
};

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await request({
      method: "get",
      url: `/search/movie?api_key=${API_KEY}&query=${query}`
    });

    setMovies(res.results);
    setIsLoading(false);
  };

  return (
    <div className="App" style={appStyle}>
      <Row>
        <Col span={18} offset={3}>
          <Title level={2} style={{ textAlign: 'center' }}>Welcome to the notflix cms</Title>
          <Paragraph style={{ textAlign: 'center' }}>Ready to add new movie to the record? Start by searching your desired movie below</Paragraph>
          <Search
            defaultValue={query.toLowerCase()}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movie name"
            enterButton
            loading={isLoading}
            onPressEnter={handleSubmit}
            onSearch={handleSubmit}
            size="large"
          />

          <div className="result" style={{ marginTop: "3em" }}>
            {isLoading ? <Spinner /> : <Result2 movies={movies} />}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
