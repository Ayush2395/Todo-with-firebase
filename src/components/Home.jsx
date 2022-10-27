import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import taskServices from "../backend/taskServices";
import TableList from "./TableList";

const Home = ({ user, taskId, setId }) => {
  //   console.log(user.email);

  const [flag, setFlag] = useState(false);
  const [task, settask] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState({ error: false, msg: "" });

  const handleAddTask = async (event) => {
    event.preventDefault();
    setError("");

    if (task === "") return setError({ error: true, msg: "missing fields" });

    const data = { task: task, status: status };

    try {
      if (taskId !== undefined || taskId !== null) {
        await taskServices.updateTask(data, taskId);
        setError({ error: false, msg: "Your task updated" });
      } else {
        await taskServices.addTask(data);
        setError({ error: false, msg: "Your task added" });
      }
    } catch (err) {
      setError({ error: true, msg: err.code });
    }
  };

  const editHandler = () => {
    const snapShot = taskServices.getSingleTask(taskId);
    settask(snapShot.data().task);
    setStatus(snapShot.data().status);
  };

//   useEffect(() => {
//     if (taskId !== undefined || taskId === null) {
//       editHandler();
//     }
//   }, []);

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError("")}
            >
              {error?.msg}
            </Alert>
          )}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Todos</Card.Title>
              <Form onSubmit={handleAddTask}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="tast">Type your task</Form.Label>
                  <Form.Control
                    value={task}
                    onChange={(e) => settask(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    id="task"
                  />
                </Form.Group>
                <ButtonGroup className="w-100 mb-3">
                  <Button
                    disabled={!flag}
                    onClick={() => {
                      setFlag(!flag);
                      setStatus("checked");
                    }}
                    variant="outline-primary"
                  >
                    Checked
                  </Button>
                  <Button
                    disabled={flag}
                    onClick={() => {
                      setFlag(!flag);
                      setStatus("unchecked");
                    }}
                    variant="outline-danger"
                  >
                    Unchecked
                  </Button>
                </ButtonGroup>
                <Button type="submit" className="w-100" variant="success">
                  Add Task
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <TableList setId={setId} />
        </div>
      </Container>
    </>
  );
};

export default Home;
