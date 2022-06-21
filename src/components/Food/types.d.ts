export interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export interface FoodProps extends Food {
  handleEditFood: (food: Food) => void;
  handleDelete: (id: number) => void;
}
