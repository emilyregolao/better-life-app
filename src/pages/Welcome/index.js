import { Container, Content, ImageHome } from "./style";
import Logo from "../../assets/img/logo.png";
import { UserContext } from "../../providers/User";
import { useContext, useEffect } from "react";
import ImgWelcome from "../../assets/img/Group.png";
import Button from "../../components/Button";
import { Redirect, useHistory } from "react-router";
import { ContactsOutlined } from "@material-ui/icons";
import { HabitsContext } from "../../providers/Habits";
import { GroupsContext } from "../../providers/Groups";

// A prop authenticated será usada para autenticar para qe o ussuário não vá direto pra o core da aplicação
const Welcome = ({ authenticated }) => {
  const { userName } = useContext(UserContext);
  const { getHabits } = useContext(HabitsContext);
  const { getSubscribedGroups } = useContext(GroupsContext);
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      getHabits();
      getSubscribedGroups();
    }
  }, []);
  const handleNavigation = (path) => {
    history.push(path);
  };

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container>
        <Content>
          <img src={Logo} alt="Logo Better Life" />
          <h2>
            Boas vindas, <strong>{userName}</strong>
          </h2>
          <span>
            Está tudo pronto para você começar a sua nova vida saudável.
          </span>
          <ImageHome src={ImgWelcome} alt="Imagem tela inicial" />
          <div>
            <Button
              onClick={() => handleNavigation("/dashboard")}
              text="Vá para o Dashboard"
            ></Button>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Welcome;
