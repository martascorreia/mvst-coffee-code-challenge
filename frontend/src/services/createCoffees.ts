import { Coffee } from '@/types/coffee';

export const createCoffee = async (coffee: Coffee): Promise<Coffee> => {
  const res = await fetch('http://localhost:5000/mvstCoffee/createCoffee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coffee),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to create coffee');
  }

  return data;
};
