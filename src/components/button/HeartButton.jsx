import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartButton = ({ liked, onToggle, size = 24 }) => {
  return (
    <button onClick={() => onToggle(!liked)}>
      {liked ? <FaHeart size={size} color="red" /> : <FaRegHeart size={size} color="red" />}
    </button>
  );
};

export default HeartButton;