import React, { useRef } from "react";
import "../styles.css"

interface Props {
  todoo: string;
  setTodoo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todoo, setTodoo, handleSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="input" onSubmit={(e) => {
      handleSubmit(e)
      inputRef.current?.blur();
    }}>
      <input
        type="text"
        ref={inputRef}
        value={todoo}
        onChange={(e) => setTodoo(e.target.value)}
        className="input_box"
        placeholder="Digite a sua tarefa..."
      />
      <button className="input_submit" type="submit">+</button>
    </form>
  );
}

export default InputField;