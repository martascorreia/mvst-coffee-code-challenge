export type ModalField =
  | {
      type: 'text';
      label: string;
      placeholder: string;
    }
  | {
      type: 'price';
      label: string;
      placeholder: string;
    }
  | {
      type: 'options';
      label: string;
      options: string[];
    };

export type Modal = {
  id: number;
  modal_key: string; 
  title: string;
  fields: Record<string, ModalField>;
  cancel_button: string;
  confirm_button: string;
  background_image?: string;
};