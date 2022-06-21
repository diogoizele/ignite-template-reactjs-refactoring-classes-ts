import type { Food } from "../Food/types";

export interface ModalAddFoodProps {
  isOpen: boolean;

  onClose: () => void;
  handleAddFood: (food: Food) => void;
}
