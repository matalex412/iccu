import React from "react";
import { FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/client";

const CustomEvent = (event: any) => {

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
        await deleteDoc(doc(db, "events", event.event.resource));
    }
  };

  return (
    <div className="flex justify-between p-1">
      {event.title}
      {auth.currentUser && <button onClick={handleDelete} title="Delete event">
        <FaTrash />
      </button>}
    </div>
  );
};

export default CustomEvent;
