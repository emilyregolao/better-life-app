import { CardGroupDetailBody, ActivityContainer } from "./style";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import { GoalsContext } from "../../providers/Goals";
import GoalCard from "../GoalCard";
import { ButtonContainer } from "../Button/style";
import { ActivitiesContext } from "../../providers/Activities";
import { GroupsContext } from "../../providers/Groups";
import { TiDelete } from "react-icons/ti";
import ModalCreateActivities from "../ModalCreateActivities";

const GroupDetailCard = ({ groupId, authenticated }) => {
  const { goals, getGoals } = useContext(GoalsContext);
  const { activities, getActivities, removeActivity } =
    useContext(ActivitiesContext);
  const {
    subscribedGroups,
    subscribeGroup,
    unsubscribeGroup,
    getSubscribedGroups,
  } = useContext(GroupsContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalActivityIsOpen, setModalActivityIsOpen] = useState(false);

  useEffect(() => {
    if (authenticated) {
      getGoals(groupId);
      getActivities(groupId);
      getSubscribedGroups();
      subscribedGroups.includes(Number(groupId))
        ? setIsSubscribed(true)
        : setIsSubscribed(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      subscribedGroups.includes(Number(groupId))
        ? setIsSubscribed(true)
        : setIsSubscribed(false);
      console.log(subscribedGroups.includes(Number(groupId)))
    }
  }, [subscribedGroups]);

  console.log(subscribedGroups, groupId)
  const openModalActivity = () => {
    setModalActivityIsOpen(true);
  };

  return (
    <>
      <CardGroupDetailBody>
        <h2>Nome do Grupo</h2>
        <p>Categoria do Grupo</p>
        <ButtonContainer style={{ margin: "0px" }}>
          {!isSubscribed && (
            <Button
              text={"Inscreva-se"}
              onClick={() => subscribeGroup(groupId)}
            >
              Inscreva-se
            </Button>
          )}
          {isSubscribed && (
            <Button
              text={"Sair do grupo"}
              onClick={() => unsubscribeGroup(groupId)}
            />
          )}
        </ButtonContainer>
        <p>Descrição do Grupo</p>
        <div>
          <h3>Metas</h3>
          {goals.map((goal) => (
            <GoalCard goal={goal} key={goal.id} isSubscribed={isSubscribed} />
          ))}
        </div>
        <div>
          <h3>Atividades</h3>
          <ButtonContainer style={{ margin: "0px" }}>
            {isSubscribed && (
              <button onClick={openModalActivity}>Criar Atividade</button>
            )}
          </ButtonContainer>
          <ActivityContainer>
            <ul>
              {activities.map((activity, index) => {
                const date = new Date(activity.realization_time);
                const newDate = [
                  date.getDate(),
                  date.getMonth(),
                  date.getFullYear(),
                ].join("/");
                return (
                  <>
                    <li key={activity.id}>
                      <h4>{activity.title}</h4>
                      <p>Data Limite: {newDate}</p>
                      {isSubscribed && (
                        <TiDelete onClick={() => removeActivity(activity.id)} />
                      )}
                      <hr style={{ opacity: 0.2, margin: "5px" }} />
                    </li>
                  </>
                );
              })}
            </ul>
          </ActivityContainer>
        </div>
      </CardGroupDetailBody>
      <ModalCreateActivities
        groupId={groupId}
        modalActivityIsOpen={modalActivityIsOpen}
        setModalActivityIsOpen={setModalActivityIsOpen}
      />
    </>
  );
};

export default GroupDetailCard;
