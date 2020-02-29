import React from 'react'
import { Spin } from "antd";

function Spinner() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size="large" />
      <div>Fetching some tralala..</div>
    </div>
  );
}

export default Spinner;
