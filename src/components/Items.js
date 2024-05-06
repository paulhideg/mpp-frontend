import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

const Items = ({ currentItems }) => {
  const handleEdit = (id, name, year, average) => {
    localStorage.setItem("name", name);
    localStorage.setItem("year", year);
    localStorage.setItem("average", average);
    localStorage.setItem("id", id);
  };

  const handleDelete = (id) => {
    const configuration = {
      method: "delete",
      url: `https://mpp-backend-84d39319a931.herokuapp.com/delete/student/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Handle error as needed
        console.error("Error deleting student:", error);
        alert(
          "An error occurred while deleting the student. Please try again later."
        );
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Average</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0
            ? currentItems.map((student) => {
                return (
                  <tr key={student._id}>
                    <td>{student.studentName}</td>
                    <td>{student.studentYear}</td>
                    <td>{student.studentAverage}</td>
                    <td>
                      <Link to={"/update"}>
                        <Button
                          onClick={() =>
                            handleEdit(
                              student._id,
                              student.studentName,
                              student.studentYear,
                              student.studentAverage
                            )
                          }
                        >
                          Update
                        </Button>
                      </Link>
                      &nbsp;
                      <Button onClick={() => handleDelete(student._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            : "No data available"}
        </tbody>
      </Table>
    </>
  );
};

export default Items;
