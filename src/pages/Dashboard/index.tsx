import { useEffect, useState } from "react";

import api from "../../services/api";
import Food from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";
import { Food as FoodType } from "../../components/Food/types";

const Dashboard = () => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [currentEditingFood, setCurrentEditingFood] = useState<FoodType>(
    {} as FoodType
  );
  const [newFoodModalIsOpen, setNewFoodModalIsOpen] = useState(false);
  const [editingFoodModalIsOpen, setEditingFoodModalIsOpen] = useState(false);

  useEffect(() => {
    const loadingData = async () => {
      const { data } = await api.get<FoodType[]>("/foods");

      setFoods(data);
    };

    loadingData();
  }, []);

  const handleAddFood = async (food: FoodType) => {
    try {
      const { data: foodResponse } = await api.post<FoodType>("/foods", {
        ...food,
        available: true,
      });

      setFoods((previousFoods) => [...previousFoods, foodResponse]);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodType) => {
    try {
      const { data } = await api.put<FoodType>(
        `/foods/${currentEditingFood.id}`,
        {
          ...currentEditingFood,
          ...food,
        }
      );

      const foodsUpdated = foods.map((food) =>
        food.id !== data.id ? food : data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
  };

  const toggleNewFoodModal = () => {
    setNewFoodModalIsOpen((prevState) => !prevState);
  };

  const handleEditFood = (food: FoodType) => {
    setEditingFoodModalIsOpen(true);
    setCurrentEditingFood(food);
  };

  return (
    <>
      <Header openModal={toggleNewFoodModal} />
      <ModalAddFood
        isOpen={newFoodModalIsOpen}
        onClose={() => setNewFoodModalIsOpen(false)}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editingFoodModalIsOpen}
        onClose={() => setEditingFoodModalIsOpen(false)}
        initialData={currentEditingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              {...food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
