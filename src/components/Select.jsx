function Select({ options, handleChange, name }) {
  return (
    <select
      name={name}
      onChange={handleChange}
      className="outline-none border  border-slate-300 my-2 rounded-lg text-sm px-2 py-3"
    >
      {options.map((opt) => (
        <option value={opt.value} key={opt.name}>
          {opt.name}
        </option>
      ))}
      ;
    </select>
  );
}

export default Select;
