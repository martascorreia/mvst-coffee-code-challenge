import { Coffee } from '@/types/coffee';
import { NewCoffeeModal } from '@/types/newCoffeeModall';

export const fetchCoffees = async (): Promise<Coffee[]> => {
  const res = await fetch('http://localhost:5000/mvstCoffee/coffees');
  if (!res.ok) throw new Error('Failed to fetch coffees');
  const data = await res.json();

  return data.map((c: any) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    imageUrl: c.image_url,
    type: c.type,
    color: c.color,
    price: Number(c.price),
  }));
};

export const fetchCoffeeTypes = async (): Promise<{ name: string; color: string }[]> => {
  const res = await fetch('http://localhost:5000/mvstCoffee/coffeeTypes');
  if (!res.ok) throw new Error('Failed to fetch coffee types');
  return res.json();
};

export async function fetchNewCoffeeModal(): Promise<NewCoffeeModal> {
  const res = await fetch('http://localhost:5000/mvstCoffee/newCoffeeModal');
  if (!res.ok) throw new Error('Failed to fetch modal');
  return res.json();
}
