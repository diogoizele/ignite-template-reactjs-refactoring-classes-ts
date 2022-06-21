import { Component, createRef, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Input from "../Input";
import { Food } from "../Food/types";
import { ModalAddFoodProps } from "./types";
import Modal from "../Modal";

const ModalAddFood = ({
  isOpen,
  onClose,
  handleAddFood,
}: ModalAddFoodProps) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: Food) => {
    handleAddFood(data);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
