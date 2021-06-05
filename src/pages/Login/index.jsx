import { Container, Content, Background, AnimationContainer } from "./styles";
import { Link } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Formato invalido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitChange = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitChange)}>
            <h1>Login</h1>
            <Input
              register={register}
              name="email"
              icon={FiUser}
              label="Name"
              placeholder="Seu email"
              error={errors.email?.message}
            ></Input>
            <Input
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Sua senha super secreta"
              error={errors.password?.message}
            ></Input>
            <Button type="submit">Enviar</Button>
            <p>
              Não tem conta? <Link to="/Signup">Faça seu cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
