import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

import type{ FoodProps } from './types';

const Food = ({available, description, id, image, name, price, handleEditFood, handleDelete}: FoodProps) => {
  const [isAvailable, setIsAvailable] = useState(!!available)

  const handleToggleAvailable = async () => {
    await api.put(`/foods/${id}`, {
      available: !isAvailable,
      description,
      id,
      image, name, price
    })

    setIsAvailable((previousState) => !previousState )
  }

    return (
      <Container available={isAvailable}>
        <header>
          <img src={image} alt={name} />
        </header>
        <section className="body">
          <h2>{name}</h2>
          <p>{description}</p>
          <p className="price">
            R$ <b>{price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={() => handleEditFood({available, description, id, image, name, price})}
              data-testid={`edit-food-${id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(id)}
              data-testid={`remove-food-${id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${id}`} className="switch">
              <input
                id={`available-switch-${id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={handleToggleAvailable}
                data-testid={`change-status-food-${id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
};

export default Food;
