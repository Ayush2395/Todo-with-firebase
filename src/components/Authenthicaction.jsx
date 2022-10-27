import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";

const Authenthicaction = ({
  fx,
  title,
  email,
  password,
  setEmail,
  setPassword,
  err,
  setErr,
  
}) => {
  

  return (
    <>
      <Container
        className=" d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {err?.msg && (
            <Alert
              variant={err?.error ? "danger" : "success"}
              onClose={() => setErr("")}
              dismissible
            >
              {err?.msg}
            </Alert>
          )}
          <Card>
            <Card.Body>
              <Card.Title className="text-center display-3">{title}</Card.Title>
              <hr />
              <Form onSubmit={fx}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                  />
                </Form.Group>
                <Button type="submit" className="w-100">
                  {title}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Authenthicaction;
