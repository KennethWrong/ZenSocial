import { BsArrowDownCircle } from "react-icons/bs";
import { IconContext } from "react-icons";

function Downvote(props) {
    return (
      <IconContext.Provider
        value={{ color: props.color, size: '50px' }}
      >
        <div>
          <BsArrowDownCircle/>
        </div>
      </IconContext.Provider>
    );
}

export default Downvote