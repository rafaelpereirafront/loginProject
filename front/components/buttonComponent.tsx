interface ButtonProps {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonComponent = ({ children, disabled, onClick }: ButtonProps) => {
  const status = disabled ? { background: "#a9a9a9" } : {};

  return (
    <button
      type="submit"
      className="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-600 py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
      style={status}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
