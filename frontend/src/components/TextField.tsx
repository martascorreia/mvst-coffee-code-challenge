'use client';

type TextFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: string;
  className: string;
};

export const TextField = ({ label, value, placeholder, onChange, type = 'text', className}: TextFieldProps) => (
  <div className={`field-container ${className}`}>
    <label className='field-label'>{label}</label>
    <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`text-field ${value ? 'filled-field' : 'empty-field'}`}
      />
  </div>
);
