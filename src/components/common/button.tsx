export default function Button({
  handleOnClick,
  label,
  isSelected,
}: {
  handleOnClick: () => void;
  label: string;
  isSelected?: boolean;
}) {
  return (
    <button
      type="button"
      className={`border-2 border-[#222831] rounded px-3 py-1 font-bold hover:bg-[#6a4c93] ${
        isSelected && "bg-[#1982c4]"
      }`}
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
}
