import { useState } from "react";
import Button from "./button"; 

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  const color = liked ? "red" : "black";

  return (
    <Button
      text={
        <span className="flex items-center gap-2" style={{ color }}>
          <i
            className="ri-heart-add-fill"
            style={{ fontSize: "18px", color }}
          ></i>
          {liked ? "Added" : " Favorite"}
        </span>
      }
      variant="whiteToGradient"
      shape="rounded"
      size="md"
      onClick={() => setLiked(!liked)}
    />
  );
}
