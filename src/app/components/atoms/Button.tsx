const Button = ({
  onClick,
  children,
  color,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  color: "blue" | "red" | "yellow";
  disabled?: boolean;
}) => {
  const styles = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
  };
  return (
    <button
      className={`px-4 py-2 ${styles[color]} text-white rounded ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
