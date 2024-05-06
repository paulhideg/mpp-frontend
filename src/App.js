import "./App.css";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";
import Account from "./components/Account";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Row>
            <Col className="text-center">
              <section id="navigation">
                <Link to="/">Account </Link>
                <Link to="/home">Students Data</Link>
              </section>
            </Col>
          </Row>
        </Container>
        <Routes>
          <Route path="/" Component={Account} exact />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
