import { Container, Background, Content, AnimationContainer } from "./style";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Button";
import api from "../../services/api";
import { TextField } from "@material-ui/core";
import Logo from "../../assets/img/logo.png";
import toast from "react-hot-toast";

import { useContext, useState } from "react";
import { Visibility, VisibilityOff, Person } from "@material-ui/icons";
import { UserContext } from "../../providers/User";
//import LoginGoogle from "../GoogleLogin";

const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const { getUser } = useContext(UserContext);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const schema = yup.object().shape({
    username: yup.string().required("Campo Obrigatório!"),
    password: yup
      .string()
      .min(6, "Minimo de 6 caracteres.")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    api
      .post("/sessions/", data)
      .then((response) => {
        const { access } = response.data;
        localStorage.setItem("@BetterLife:token", JSON.stringify(access));
        setAuthenticated(true);
        getUser(access);
        return history.push("/welcome");
      })

      .catch((_) => {
        toast.error("Usuário ou senha incorreto");
      });
  };

  if (authenticated) {
    return <Redirect to="welcome" />;
  }

  const iconStyle = {
    fontSize: "20px",
    cursor: "pointer",
    color: "gray",
  };

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={Logo} alt="Logo Better Life" />
          </Link>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h2>
              Olá,
              <br />
              <span>bem vindo(a)!</span>
            </h2>
            <div>
              <TextField
                label="Nome de Usuário"
                margin="normal"
                variant="standard"
                size="small"
                color="primary"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  endAdornment: <Person style={iconStyle} />,
                }}
              />
            </div>
            <div>
              <TextField
                label="Senha"
                margin="normal"
                variant="standard"
                size="small"
                type={!showPassword ? "password" : "text"}
                color="primary"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: showPassword ? (
                    <VisibilityOff
                      style={iconStyle}
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <Visibility
                      style={iconStyle}
                      onClick={handleShowPassword}
                    />
                  ),
                }}
              />
            </div>
            <Button type="submit" text="Login">
              Login
            </Button>
            {/* <LoginGoogle handleGoogle={onSubmitFunction} /> */}
            <p>
              Não possui uma conta ainda? <Link to="/signup">Registre-se</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Login;
