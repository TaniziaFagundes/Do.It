import { Background, Container, Content, AnimationContainer } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import API from "../../services/api";
import { toast } from "react-toastify";
const Signup = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório!"),
    email: yup
      .string()
      .email("Email formato invalido!")
      .required("Campo Obrigatório!"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 digitos")
      .required("Campo Obrigatório!"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo Obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password };
    API.post("/user/register", user)
      .then((response) => {
        toast.success("Cadatro Realizado!");
        return history.push("/login");
      })
      .catch((error) => toast.error("Verifique os dados inseridos!"));
  };

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              name="name"
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome"
              error={errors.name?.message}
            />
            <Input
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Senha segura"
              type="password"
              error={errors.password?.message}
            />

            <Input
              register={register}
              name="passwordConfirm"
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmação da senha"
              type="password"
              error={errors.passwordConfirm?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Signup;
