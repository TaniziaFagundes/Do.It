import { Container } from "./styles";
import { FiClipboard, FiCalendar } from "react-icons/fi";
import Button from "../Button";
const Card = ({ title, date, onClick }) => {
  return (
    <Container>
      <spam>
        <FiClipboard /> {title}
      </spam>
      <hr />
      <time>
        <FiCalendar /> {date}
      </time>
      <Button onClick={onClick}>Concluir</Button>
    </Container>
  );
};
export default Card;
