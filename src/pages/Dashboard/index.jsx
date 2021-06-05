import { Redirect } from "react-router-dom";
const DashBoard = ({ authenticated }) => {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  const User = JSON.parse(localStorage.getItem("@Doit:user"));
  const userName = User.name.split(" ");

  return <div>{userName[0]} seu checklist</div>;
};

export default DashBoard;
