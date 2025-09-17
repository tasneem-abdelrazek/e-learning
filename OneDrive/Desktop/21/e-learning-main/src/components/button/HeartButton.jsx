// FavoriteButton.jsx
import { useState } from "react";
import Button from "./button";

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);
  const color = liked ? "#EF4444" : "#1E3A8A"; // أحمر و أزرق تعليمي

  return (
    <Button
      text={
        <span className="flex items-center gap-2" style={{ color }}>
          <i className="ri-heart-add-fill" style={{ fontSize: "18px", color }}></i>
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
