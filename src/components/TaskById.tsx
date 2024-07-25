import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../Type";
import { deleteTask, getTaskById, updateTask } from "../services/TaskService";
import { Button } from "react-bootstrap";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

export const TaskById: React.FC = () => {
  const [task, setTask] = useState<Task>({
    id: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { id }: { id?: String } = useParams();
  useEffect(() => {
    GetTask();
  }, []);

  async function GetTask() {
    let response = await getTaskById(id as String);
    setTask(response);
  }

  async function UpdateData() {
    try {
      if (task?.title == "") throw new Error("Title is required");
      const isUpdated = await updateTask(task);
      setIsEdit(false);
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function DeleteData(){
    try{
        const isDeleted = await deleteTask(task?.id);
        navigate("/")
    }catch(err){
        alert((err as Error).message)
    }
  }

  function converToDate(s: String = "0000-00-00T00:00:00") {
    return s.slice(0, 10).split("-").reverse().join();
  }
  return (
    <>
      <div
        id="taskbyid-main"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "gray",
            alignItems: "center",
            paddingTop: "10px",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <p style={{ width: "100%", marginLeft: "20px" }}>
            Created:<i>{converToDate(task?.createdAt as String)}</i>
          </p>
          <p style={{ width: "100%", marginLeft: "20px" }}>
            Updated:<i>{converToDate(task?.updatedAt as String)}</i>
          </p>
          {!isEdit ? (
            <h2 style={{ margin: "30px 0px" }}>{task?.title}</h2>
          ) : (
            <input
              type="text"
              style={{
                width: "300px",
                height: "35px",
                margin: "30px 0px",
                paddingLeft: "10px",
              }}
              onChange={(e) =>
                setTask((t) => ({ ...t, title: e.target.value.trim() }))
              }
              placeholder="Title"
              defaultValue={`${task?.title}`}
            />
          )}
          {!isEdit ? (
            <p
              style={{
                fontSize: "1.2em",
                padding: "0px 10px",
                width: "85%",
                height: "200px",
                overflow: "auto",
              }}
            >
              {task?.description}
            </p>
          ) : (
            <textarea
              style={{ width: "85%", height: "200px", padding: "10px" }}
              placeholder="Description"
              defaultValue={`${task?.description}`}
              onChange={(e) =>
                setTask((t) => ({ ...t, description: e.target.value.trim() }))
              }
            />
          )}
          {isEdit ? (
            <Button
              variant="secondary"
              style={{ marginTop: "30px" }}
              onClick={UpdateData}
            >
              Update
            </Button>
          ) : (
            <Button
              onClick={() => setIsEdit(true)}
              style={{ position: "absolute", right: 10 }}
            >
              <MdEditDocument />
            </Button>
          )}
          {isEdit && (
            <Button
              variant="danger"
              onClick={() => setShow(true)}
              style={{ position: "absolute", right: 10 }}
            >
              <MdDelete />
            </Button>
          )}
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {task?.title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={DeleteData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
