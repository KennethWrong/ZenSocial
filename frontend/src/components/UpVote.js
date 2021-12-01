import { BsArrowUpCircle } from "react-icons/bs";
import { IconContext } from "react-icons";

function Upvote(props) {
    return (
      <IconContext.Provider
        value={{size: '50px' }}
      >
        <div>
          <BsArrowUpCircle color={props.color}/>
        </div>
      </IconContext.Provider>
    );
  }

export default Upvote