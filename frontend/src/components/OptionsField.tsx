type OptionsFieldProps = {
  selected: string;
  options: string[];
  onSelect: (option: string) => void;
  label?: string;
  className: string;
};

export const OptionsField = ({selected, options, onSelect, label = 'Select an option', className}: OptionsFieldProps) => (
  <div className={`field-container ${className}`}>
    <label className='field-label'>{label}</label>
    <div className="options-field-buttons">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`options-field ${
            selected === option
              ? 'filled-field'
              : 'empty-field'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);
