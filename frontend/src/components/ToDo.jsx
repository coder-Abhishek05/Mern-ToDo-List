


import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios
      .delete(`${baseURL}/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/";
        }
      });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <div className="toDo">
      {text}
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;
