export default function Select({
  label,
  name,
  value,
  onChange,
  item = [],
  disabled = false,
}) {
  const isDisabled =
    disabled || !item || (Array.isArray(item) && item.length === 0);

  // Determine background style class based on disabled state
  const bgClass = isDisabled ? "bg-slate-200" : "bg-white";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 mt-4 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${bgClass}`}
        disabled={isDisabled}
      >
        <option value="">Select ...</option>
        {Array.isArray(item) && item.length > 0 ? (
          item.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No Data
          </option>
        )}
      </select>
    </div>
  );
}
