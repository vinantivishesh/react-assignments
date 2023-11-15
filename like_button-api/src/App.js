import "./styles.css";
import { useState } from "react";
import { FaRegHeart, FaSpinner } from "react-icons/fa";

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

export default function App() {
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function likeUnlikeAction () {
    try {
      setPending(true);
      setError(null);

      const response = await fetch('https://www.greatfrontend.com/api/questions/like-button', 
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like'
          }),
        }
      );
      if (!response.ok) {
        const res = await response.json();
        setError(res.error);
        return;
      }
      setLiked(!liked);
    } finally {
        setPending(false);
    }

    // setTimeout(() => {
    //   setLiked(!liked);
    //   setPending(false);
    // }, 1000);
  };

  return (
    <div>
      <button
        className={classNames(
          "like-button",
          liked ? "like-button--liked" : "like-button--default"
        )}
        disabled={pending}
        onClick={likeUnlikeAction}
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
