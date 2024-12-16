import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner animation="border" />
    </div>
  );
}

export default Loader;
