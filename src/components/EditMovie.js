import axios from "axios";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Spin,
  Icon,
  message
} from "antd";

import request from "../libs/request";
const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;
const env = process.env.NODE_ENV || "production";
const BASE_URL =
  env === "development"
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL_PROD;

const token = localStorage.getItem("access_token");
const user = token && jwtDecode(token);

console.log('BASE_URL', BASE_URL)
const { Option } = Select;

const genres = [
  "Horror",
  "Science Fiction",
  "Action",
  "Comedy",
  "Romance",
  "Thriller",
  "Adventure",
  "Documentary",
  "Animation",
  "Drama",
  "War"
];

const children = [];
genres.map(genre => {
  children.push(<Option key={genre}>{genre}</Option>);
});

const DrawerForm = ({ title, placement, onClose, visible, form, data, toggleVisible }) => {
  const { getFieldDecorator, getFieldsValue, validateFields } = form;

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMovieDetails = async () => {
      const movie = await request(
        `/movie/${data.id}?api_key=${API_KEY}&append_to_response=videos`
      );
      const credit = await request(
        `/movie/${data.id}/credits?api_key=${API_KEY}`
      );

      setMovieDetails({
        ...movie,
        casts: [...credit.cast.slice(0, 15)],
        crews: [...credit.crew.slice(0, 15)]
      });
      setIsLoading(false);
    };

    fetchMovieDetails();
  }, []);

  const handleSubmitForm = async () => {
    setIsSubmitting(true)
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });

    const { title, trailer, synopsis, genres } = getFieldsValue();
    try {
      const res = await axios({
        url: `${BASE_URL}/movies`,
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        },
        data: {
          title,
          trailer,
          synopsis,
          genres,
          poster: movieDetails.poster_path,
          casts: movieDetails.casts,
          movie_details: movieDetails
        }
      });

      setTimeout(() => {
        setIsSubmitting(false)
        toggleVisible(false)
        message.success(`Succesfully save ${movieDetails.title} movie to record`)
      }, 1000)
    } catch (err) {
      if (err.response) {
        message.error(err.response.data.message)
      }

      message.error(err.message)
    }
  };

  return (
    <Drawer
      title={title}
      placement={placement}
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <Form layout="vertical" hideRequiredMark onSubmit={handleSubmitForm}>
          <Row gutter={16}>
            <Col span={12}>
              {getFieldDecorator("user_id", {
                rules: [
                  { required: true, message: "Please choose the dateTime" }
                ],
                initialValue: user && user._id
              })(
                <Input type="hidden" placeholder="user's object id" disabled />
              )}
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [
                    { required: true, message: "Please enter movie title" }
                  ],
                  initialValue: movieDetails.title
                })(<Input placeholder="Please enter movie title" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Trailer">
                {getFieldDecorator("trailer", {
                  rules: [
                    { required: true, message: "Please enter movie trailer" }
                  ],
                  initialValue:
                    movieDetails.videos &&
                    movieDetails.videos.results.length > 0
                      ? `https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`
                      : ""
                })(<Input placeholder="Please enter trailer youtube url" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Genres">
                {getFieldDecorator("genres", {
                  rules: [{ required: true, message: "Please select genres" }],
                  initialValue:
                    movieDetails.genres && movieDetails.genres.map(m => m.name)
                })(
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                  >
                    {children}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Synopsis">
                {getFieldDecorator("synopsis", {
                  rules: [
                    {
                      required: true,
                      message: "please enter synopsis"
                    }
                  ],
                  initialValue: movieDetails.overview
                })(
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter url description"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <b>
                P.S. Upon submitting we also attach other movie details that we
                considered uneditable
              </b>
            </Col>
          </Row>
        </Form>
      )}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e9e9e9",
          padding: "10px 16px",
          background: "#fff",
          textAlign: "right"
        }}
      >
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmitForm} type="primary" loading={isSubmitting}>
          Save to the record
        </Button>
      </div>
    </Drawer>
  );
};

export default Form.create()(DrawerForm);
