import { useHistory } from "react-router";
import { Container, Content } from "./styles";
import Button from "../../components/Button";

const Home = () => {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };
  return (
    <Container>
      <Content>
        <h1>
          Do<span>.</span>It
        </h1>
        <span>Organize-se de forma fácil e efetiva</span>
        <div>
          <Button onClick={() => handleNavigation("./signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("./login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
};

export default Home;
