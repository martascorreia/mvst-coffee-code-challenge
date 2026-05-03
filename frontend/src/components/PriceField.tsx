'use client';

type PriceFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className: string;
};

export const PriceField = ({ value, onChange, label = 'Price', placeholder = '', className }: PriceFieldProps) => (
  <div className={`field-container ${className}`}>
    <label className='field-label'>{label}</label>
    <div className="price-field-wrapper">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`price-field ${value ? 'filled-field' : 'empty-field'}`}
      />
      <span className="price-symbol">€</span>
    </div>
  </div>
);
