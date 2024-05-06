import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import PaginatedItems from "./PaginatedItems";
import "./Home.css";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function Home() {
  const [students, setStudents] = useState([]);
  const [sorted, setSorted] = useState(-1);
  const [yearData, setYearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  const createYearPieChart = useCallback(() => {
    const yearCounts = students.reduce((acc, student) => {
      acc[student.studentYear] = (acc[student.studentYear] || 0) + 1;
      return acc;
    }, {});
    const chartData = Object.entries(yearCounts).map(([studentYear, count]) => [
      `Year ${Number(studentYear)}`,
      count,
    ]);
    chartData.unshift(["Students", "Years"]);

    setYearData(chartData);
  }, [students]);

  // set configurations for the API call here
  const configuration = {
    method: "get",
    url: "https://mpp-backend-84d39319a931.herokuapp.com/get/students",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  useEffect(() => {
    const handleConnectivityChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleConnectivityChange);
    window.addEventListener("offline", handleConnectivityChange);

    // Initial check
    handleConnectivityChange();
    if (students.length === 0) {
      axios(configuration) // Spring CRUD API
        .then((response) => {
          setStudents(response.data.students);
          setLoading(false);
          // navigate("/home");
        })
        .catch((error) => {
          setServerError(true);
          if (!isOnline) {
            alert(
              "No internet connection. Please check your connection and try again."
            );
            return;
          }
          if (error.response) {
            console.error("Server error:", error.response);
            alert(
              "The server is currently unavailable. Please try again later."
            );
          } else if (error.request) {
            // Handle network errors
            console.error("Network error:", error.request);
          } else {
            console.error("Error:", error);
          }
        });
    }
    return () => {
      createYearPieChart(); // Call the function after data is set
      window.removeEventListener("online", handleConnectivityChange);
      window.removeEventListener("offline", handleConnectivityChange);
    };
  }, [students, sorted, isOnline, navigate, createYearPieChart]);

  const sortByAverage = () => {
    // Sort ascending
    if (sorted === -1 || sorted === 1) {
      setStudents(
        [...students].sort((a, b) => a.studentAverage - b.studentAverage)
      );
      setSorted(0);
      // Sort descending
    } else {
      if (sorted === -1 || sorted === 0) {
        setStudents(
          [...students].sort((a, b) => b.studentAverage - a.studentAverage)
        );
        setSorted(1);
      }
    }
  };

  const options = {
    title: "Students by Year",
    pieStartAngle: 71,
  };

  return (
    <>
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      <div style={{ padding: "16.5px 25rem" }}>
        <Link to={"/create"}>
          <Button size="lg">Create</Button>
        </Link>
        <Button size="lg" onClick={() => sortByAverage()}>
          Sort
        </Button>
        <br></br>
        <PaginatedItems itemsPerPage={4} students={students} />
        <div>
          {!isOnline && <p>No internet connection.</p>}
          {serverError && <p>The server is currently unavailable.</p>}
        </div>

        {
          <>
            {isOnline && !serverError ? (
              loading ? (
                <p>Loading chart data...</p>
              ) : (
                // Display chart when online and server is up
                <Chart
                  chartType="PieChart"
                  data={yearData}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />
              )
            ) : (
              // Display error message when offline or server error
              <div>
                {!isOnline && <p>No internet connection.</p>}
                {!serverError && <p>The server is currently unavailable.</p>}
              </div>
            )}
          </>
        }
      </div>
    </>
  );
}
