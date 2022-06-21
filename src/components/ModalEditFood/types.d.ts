import type { Food } from "../Food/types";

export interface ModalEditFoodProps {
  isOpen: boolean;
  initialData: Food;

  onClose: () => void;
  handleUpdateFood: (food: Food) => void;
}
