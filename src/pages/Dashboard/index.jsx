import { Redirect } from "react-router-dom";
import { Container, InputContainer, TasksContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import API from "../../services/api";
const DashBoard = ({ authenticated }) => {
  const User = JSON.parse(localStorage.getItem("@Doit:user"));
  const userName = User.name.split(" ");

  const [tasks, setTaks] = useState([]);

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );

  const { register, handleSubmit } = useForm();

  const loadTasks = () => {
    API.get("/task", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        completed: false,
      },
    })
      .then((response) => {
        const apiTasks = response.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTaks(apiTasks);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmit = ({ task }) => {
    if (!task) {
      return task.error("Complete o campo para eniar a tarefa");
    }
    API.post(
      "/task",
      {
        description: task,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTask = tasks.filter((task) => task._id !== id);
    API.put(
      `/task/${id}`,
      { completed: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => setTaks(newTask));
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <div>{userName[0]} seu checklist</div>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>7 de maio de 2021</time>
        <section>
          <Input
            icon={FiEdit}
            placeholder="Nova tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.createdAt}
            onClick={() => {
              handleCompleted(task._id);
            }}
          />
        ))}
      </TasksContainer>
    </Container>
  );
};

export default DashBoard;
