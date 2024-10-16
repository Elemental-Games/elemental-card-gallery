import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`px-3 py-2 border rounded ${className}`}
  />
);

export default Input;