import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Input from "../Input";
import Modal from "../Modal";

import type { Food } from "../Food/types";
import type { ModalEditFoodProps } from "./types";

const ModalEditFood = ({
  isOpen,
  initialData,
  handleUpdateFood,
  onClose,
}: ModalEditFoodProps) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: Food) => {
    handleUpdateFood(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
