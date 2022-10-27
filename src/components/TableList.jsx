import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import taskServices from "../backend/taskServices";

const TableList = ({ setId }) => {
  const [tasks, setTasks] = useState([]);

  //   get all task
  const getAllTask = async () => {
    try {
      await taskServices.getTasks().then((data) => {
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (err) {
      console.log(err.code);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const deleteTask = async (id) => {
    try {
      await taskServices.deleteTask(id);
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <>
      <button className="btn btn-primary mb-3" onClick={getAllTask}>
        Refresh
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>{task.statsu}</td>
                <td>
                  <button
                    onClick={() => setId(task.id)}
                    className="btn btn-warning mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableList;
