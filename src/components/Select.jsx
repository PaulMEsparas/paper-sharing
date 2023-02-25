const Select = ({ options, handleChange, name }) => {
  return (
    <select
      name={name}
      onChange={handleChange}
      className="border-slate-300 outline-none border rounded-lg text-sm px-2 py-3 mr-1"
    >
      {options.map((opt) => (
        <option value={opt.value} key={opt.name}>
          {opt.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
