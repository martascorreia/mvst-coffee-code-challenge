import React from 'react';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  color: string;
  price: number;
};

export const Card = ({ title, description, imageUrl, type, color, price }: Props) => {
  const formattedPrice = price === 0 ? 'Free in the MVST office' : `${price.toFixed(2)} €`;

  return (
    <div className="card">
      <div className="type" style={{ backgroundColor: color}}>
        {type}
      </div>
      <img src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>      
      <p className="price">{formattedPrice}</p>
    </div>
  );
};
