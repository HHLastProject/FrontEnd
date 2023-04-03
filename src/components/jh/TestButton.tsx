interface ButtonProps {
  children: any;
  onClick: () => void;
}

const TestButton = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default TestButton;