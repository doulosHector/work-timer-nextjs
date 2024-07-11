const Button = ({
  onClick,
  children,
  color,
}: {
  onClick: () => void;
  children: React.ReactNode;
  color: "blue" | "red" | "yellow";
}) => {
  const styles = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
  };
  return (
    <button
      className={`px-4 py-2 ${styles[color]} text-white rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
