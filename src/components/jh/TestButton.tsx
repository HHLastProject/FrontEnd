interface ButtonProps {
  children: string | any;
  onClick: (e: React.MouseEvent) => void | undefined;
}

const TestButton = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default TestButton;