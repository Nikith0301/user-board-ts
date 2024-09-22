interface InputProps {
    value: string;
    onChange: (value: string) => void;
  }
  
 const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 bg-slate-500"
      />
    );
  };
  export default Input;