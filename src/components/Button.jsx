const Button = ({ type, onClick, disabled }) => {
  const isPrev = type === "prev";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2 rounded-lg font-medium text-sm
        transition-all duration-200
        ${disabled 
          ? "opacity-50 cursor-not-allowed bg-gray-600 text-gray-300" 
          : "bg-amber-500 hover:bg-amber-600 text-black active:scale-95"
        }
      `}
    >
      {isPrev ? "← Previous" : "Next →"}
    </button>
  );
};

export default Button;