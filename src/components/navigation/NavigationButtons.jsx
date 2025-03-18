import { useNavigate } from "react-router-dom";

const NavigationButton = ({ to, children }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)}>{children}</button>
  );
};

export default NavigationButton;
