import React from 'react';

export default ({ name, value, options, onChange }) => {
  const withoutOptions = !options || options.length === 0;

  return (
    <select name={name} value={value} onChange={onChange} disabled={withoutOptions}>
      <option key={-1} value="">--</option>
      {options && options.map((option, i) => (<option key={i} value={option.value}>{option.name}</option>))}
    </select>
  );
};
