'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { fetchNewCoffeeModal } from '@/services/fetchCoffees';
import { createCoffee } from '@/services/createCoffees';

import { Modal } from '@/components/Modal';
import { TextField } from '@/components/TextField';
import { PriceField } from '@/components/PriceField';
import { OptionsField } from '@/components/OptionsField';
import { Alert } from '@/components/Alert';

import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });

type Field = {
  label: string;
  placeholder?: string;
  type: string;
  options?: string[];
};

type ModalContent = {
  title: string;
  fields: Record<string, Field>;
  cancel_button: string;
  confirm_button: string;
  background_image?: string;
};

export default function NewCoffeePage() {
  const router = useRouter();
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formData, setFormData] = useState({ name: '', price: '', type: '', image: '', description: '', });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const [alertTrigger, setAlertTrigger] = useState(0);

  useEffect(() => {
    fetchNewCoffeeModal().then(setModalContent).catch(console.error);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isFormComplete =
    formData.name.trim() !== '' &&
    formData.price.trim() !== '' &&
    formData.type.trim() !== '' &&
    formData.image.trim() !== '' &&
    formData.description.trim() !== '';

  if (!modalContent) return <p className="text-white">Loading...</p>;

  const handleConfirm = async () => {
    if (!isFormComplete) return;

    try {
      setIsSubmitting(true);
      await createCoffee({
        id: -1,
        title: formData.name,
        price: Number(formData.price),
        type: formData.type,
        imageUrl: formData.image,
        description: formData.description,
        color: '',
      });
      setAlertMessage('Coffee created successfully!');
      setAlertType('success');
      setAlertTrigger(prev => prev + 1);
      closeModal();
    } catch (err: any) {
      console.error(err);
      setAlertMessage(err.message || 'Something went wrong while creating the coffee.');
      setAlertType('error');
      setAlertTrigger(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="new-coffee-page bg-black min-h-screen">
      <Modal 
      isOpen={isModalOpen} 
      onClose={closeModal} 
      closeOnOutsideClick={false} 
      backgroundImage={modalContent.background_image}
      cancelButton={{ label: modalContent.cancel_button, onClick: closeModal }}
      confirmButton={{ label: modalContent.confirm_button, onClick: handleConfirm, disabled: !isFormComplete || isSubmitting }}>

          <h2 className={`new-coffee-title ${bebas.className}`}>{modalContent.title}</h2>
          
          <div className="multiple-rows">
            <div className="w-full sm:w-3/4">
              <TextField
                label={modalContent.fields.name.label}
                placeholder={modalContent.fields.name.placeholder}
                value={formData.name}
                onChange={(value) => handleChange('name', value)}
                className='multiple-field-container'
              />
            </div>

            <div className="w-full sm:w-1/4">
              <PriceField
                label={modalContent.fields.price.label}
                placeholder={modalContent.fields.price.placeholder}
                value={formData.price}
                onChange={(value) => handleChange('price', value)}
                className='multiple-field-container'
              />
            </div>
          </div>          
          <OptionsField
            options={modalContent.fields.type.options || []}
            selected={formData.type}
            onSelect={(option) => handleChange('type', option)}
            className=''
          />

          <TextField
            label={modalContent.fields.image.label}
            placeholder={modalContent.fields.image.placeholder}
            value={formData.image}
            onChange={(value) => handleChange('image', value)}
            className=''
          />

          <TextField
            label={modalContent.fields.description.label}
            placeholder={modalContent.fields.description.placeholder}
            value={formData.description}
            onChange={(value) => handleChange('description', value)}
            className=''
          />
      </Modal>
      {alertMessage && <Alert message={alertMessage} type={alertType}  trigger={alertTrigger}/>}
    </main>
  );
}
