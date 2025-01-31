'use client';
import React, { useState } from 'react';

interface InputProps {
  value?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, name, placeholder }: InputProps) => {
  const [newValue, setNewValue] = useState<string>(value ? value : '');

  return (
    <div>
      <input
        className="break-words border border-gray-300 rounded-md py-2 px-4 w-full"
        placeholder={placeholder}
        onChange={(e) => setNewValue(e.target.value)}
        name={name}
        value={newValue}></input>
    </div>
  );
};

export default Input;
