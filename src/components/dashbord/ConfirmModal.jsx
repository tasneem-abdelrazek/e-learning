import React from "react";
import Button from "../button/button";

const ConfirmModal = ({ isOpen, actionType, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center rounded-3xl p-4 z-10 backdrop-blur-sm">
      <p className="mb-4 font-semibold text-gray-800 text-center">
        {actionType === "join"
          ? "Are you sure you want to join this course?"
          : "Are you sure you want to unjoin this course?"
        }
      </p>
      <div className="flex gap-3">
        <Button 
          text="Cancel" 
          variant="secondary" 
          shape="rounded" 
          size="sm" 
          onClick={onCancel} 
        />
        <Button 
          text="Confirm" 
          variant={actionType === "join" ? "greenSpecial" : "redSpecial"} 
          shape="rounded" 
          size="sm" 
          onClick={onConfirm} 
        />
      </div>
    </div>
  );
};

export default ConfirmModal;