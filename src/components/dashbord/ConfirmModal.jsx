import React from "react";

const ConfirmModal = ({ isOpen, actionType, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const actionText = actionType === "join" ? "start this course" : "remove this course";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-sm p-6 pointer-events-auto animate-fadeIn">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Are you sure?</h2>
        <p className="text-sm text-gray-600 mb-6">
          You are about to {actionText}. Do you want to continue?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg transition ${
              actionType === "join"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {actionType === "join" ? "Join" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
