import { Modal } from '@/types/modal';

export type NewCoffeeModal = Modal & {
  modal_key: 'new_coffee';
  fields: {
    name: { type: 'text'; label: string; placeholder: string };
    price: { type: 'price'; label: string; placeholder: string };
    type: { type: 'options'; label: string; options: ('Arabic' | 'Robusta')[] };
    image: { type: 'text'; label: string; placeholder: string };
    description: { type: 'text'; label: string; placeholder: string };
  };
};