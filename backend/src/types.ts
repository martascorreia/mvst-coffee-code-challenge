type Coffee = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: CoffeeType;
  price: number;
};

export type CoffeeType = {
  name: string;
  color: string;
};

export type GeneralInfo = {
  header: {
    logo_url: string;
    create_button: string;
  };
  coffee_page: {
    title: string;
    description: string;
    create_button: string;
    background_image_url: string;
    cards_title: string;
  };
  footer: {
    background_image_url: string;
  };
};

export type NewCoffeeModal = {
  id: number;
  title: string;
  fields: {
    name: {
      label: string;
      placeholder: string;
      type: 'text';
    };
    price: {
      label: string;
      placeholder: string;
      type: 'price';
    };
    type: {
      label: string;
      options: ('Arabic' | 'Robusta')[];
      type: 'options';
    };
    image: {
      label: string;
      placeholder: string;
      type: 'text';
    };
    description: {
      label: string;
      placeholder: string;
      type: 'text';
    };
  };
  cancel_button: string;
  confirm_button: string;
};
