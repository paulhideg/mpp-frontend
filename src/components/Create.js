import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function Create() {
  const [name, setName] = useState("emptyName");
  const [year, setYear] = useState(0);
  const [average, setAverage] = useState(0);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "https://mpp-backend-84d39319a931.herokuapp.com/save/student",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        studentName: name,
        studentYear: year,
        studentAverage: average,
      },
    };
    axios(configuration).catch((error) => {
      console.log(error);
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        // Display the error message from the API
        alert(errorMessage);
      } else {
        // Handle other errors
        console.error("Error:", error);
        // You might display a generic error message here
      }
    });

    navigate("/home");
  };

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formYear">
          <Form.Control
            type="number"
            placeholder="Enter Year"
            required
            onChange={(e) => setYear(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAverage">
          <Form.Control
            type="number"
            placeholder="Enter Average"
            required
            onChange={(e) => setAverage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
