import { ButtonContainer } from "../../components/Button/style";
import GroupList from "../../components/GroupsList";
import Menu from "../../components/Menu";
import { useContext } from "react";
import { GroupsContext } from "../../providers/Groups";
import { Box, Container, Text } from "./style";
import Modal from "../../components/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@material-ui/core";
import Button from "../../components/Button";

const Groups = () => {
  const { createGroup } = useContext(GroupsContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
    category: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(yupResolver(schema));

  const handleCreateGroup = ({ title, description, category }) => {
    const newGroup = {
      title: title,
      description: description,
      category: category,
    };
    createGroup(newGroup);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const inputStyle = {
    margin: "10px auto",
    width: "100%",
    maxWidth: "350px",
  };

  const formStyle = {
    width: "100%",
  };

  return (
    <>
      <Menu />
      <Container>
        <Text>
          Bem vinda(o) de volta, <strong>Stefani Wong</strong>
        </Text>
        <Box>
          <h1>GRUPOS</h1>
          <ButtonContainer style={{ margin: "0px 5px" }}>
            <button
              style={{
                width: "150px",
                background: "transparent",
                color: "#000000",
                boxShadow: "none",
                fontSize: "20px",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
              onClick={openModal}
            >
              + Novo Grupo
            </button>
          </ButtonContainer>
        </Box>
        <GroupList />
      </Container>
      <Modal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title='Cadastrar novo grupo'
        content={
          <form style={formStyle} onSubmit={handleSubmit(handleCreateGroup)}>
            <TextField label='Título' variant='filled' style={inputStyle} {...register("title")} helperText={errors.title?.message} />

            <TextField label='Descrição' variant='filled' style={inputStyle} {...register("description")} helperText={errors.description?.message} />

            <TextField label='Categoria' variant='filled' style={inputStyle} {...register("category")} helperText={errors.category?.message} />

            <Button text='Criar grupo' style={{ width: "150px", fontSize: "16px" }} type='submit' />
          </form>
        }
      />
    </>
  );
};

export default Groups;
