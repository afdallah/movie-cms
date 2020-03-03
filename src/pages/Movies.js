import React, { useState, useEffect } from "react";
import { Card, Icon, message } from "antd";
import axios from "axios";
import api from "../libs/api";

const env = process.env.NODE_ENV || 'production';
const BASE_URL =
  env === "development"
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL_PROD;

const { Meta } = Card;

const Movies = function() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await axios.get(`${BASE_URL}/movies`);
      setMovies(movies.data.data.docs);
    };

    fetchMovies();
  }, []);

  const handleDelete = async id => {
    await axios.delete(`${BASE_URL}/movies/${id}`);
    const filtered = movies.filter(movie => movie._id !== id);
    setMovies(filtered);

    message.success("Succesfully delete movie");
  };

  const handleSoon = () => {
    message.info("This feature is still on progress. Coming soon!");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "0 -10px" }}>
      {movies.map(movie => {
        return (
          <div
            style={{
              width: "calc(( 100% - (20px * 4)) / 4)",
              margin: "0 10px"
            }}
            key={movie._id}
          >
            <Card
              hoverable
              style={{ marginBottom: 16 }}
              actions={[
                <Icon type="setting" key="setting" onClick={handleSoon} />,
                <Icon type="edit" key="edit" onClick={handleSoon} />,
                <Icon
                  type="delete"
                  key="delete"
                  onClick={() => handleDelete(movie._id)}
                />
              ]}
              cover={
                <img
                  alt="example"
                  src={
                    movie.poster
                      ? api.getMovieImage(movie.poster)
                      : "http://unsplash.it/300/450"
                  }
                />
              }
            >
              <Meta title={movie.title} description="www.instagram.com" />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
