import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Task, TaskDto } from "../Type";
import { createTask, getAllTasks } from "../services/TaskService";
import "./taskStyle.css";
import { Button } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

export const ListAllTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [newTask, setNewTask] = useState<TaskDto>({
    title: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    GetTasks();
  }, []);
  async function GetTasks() {
    let response = await getAllTasks();
    setTasks(response);
  }

  async function CreateTask() {
    try {
      if (newTask?.title == "") throw new Error("Title is required");
      await createTask(newTask);
      setShow(false);
      GetTasks();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          paddingTop: "50px",
          position: "relative",
        }}
        className="d-flex flex-column align-items-center"
      >
        {tasks?.map((x) => (
          <Link
            to={`/tasks/${x.id}`}
            style={{
              width: "90%",
              maxWidth: "1000px",
              height: "60px",
              backgroundColor: "gray",
              borderRadius: "5px",
              marginBottom: "5px",
              textDecoration: "none",
              color: "black",
              paddingLeft: "20px",
            }}
            className="d-flex align-items-center"
          >
            {x.title}
          </Link>
        ))}
        <Button style={{ position: "absolute", right: 20, bottom: 20 }} onClick={()=>setShow(true)}>
          <IoAddOutline style={{ fontSize: "3em" }} />
        </Button>
      </div>
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
            Title
          <input type="text" onChange={(e)=>setNewTask(t=>({...t,title:e.target.value.trim()}))}/>
           Description
          <textarea onChange={(e)=>setNewTask(t=>({...t,description:e.target.value.trim()}))}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={CreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
