import "./styles.css";
import { useState } from "react";
import { FaRegHeart, FaSpinner } from "react-icons/fa";

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

export default function App() {
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);

  const likeUnlike = () => {
    setPending(true);
    setTimeout(() => {
      setLiked(!liked);
      setPending(false);
    }, 1000);
  };

  return (
    <div>
      <button
        className={classNames(
          "like-button",
          liked ? "like-button--liked" : "like-button--default"
        )}
        disabled={pending}
        onClick={likeUnlike}
      >
        {pending ? (
          <FaSpinner className="heart"></FaSpinner>
        ) : (
          <FaRegHeart className="heart" />
        )}
        <span>{liked ? "Liked" : "Like"}</span>
      </button>
    </div>
  );
}
