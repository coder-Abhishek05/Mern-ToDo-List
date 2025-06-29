
import React, { useEffect, useState } from "react";
import ToDo from "../components/ToDo";
import axios from "axios";
import { baseURL } from "../utils/constant";
import Popup from "../components/Popup";
import decodeToken from "../utils/decodeToken";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  const [userEmail, setUserEmail] = useState("");

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };


    useEffect(() => {
      const token = localStorage.getItem("token");
      const decoded = decodeToken(token);

      if (decoded?.email) {
        setUserEmail(decoded.email);
      } else {
        console.warn("Email not found in decoded token");
      }
    }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/get`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setToDos(res.data))
      .catch((err) => {
        console.error("Fetch error:", err);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      });
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(
        `${baseURL}/save`,
        { toDo: input },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => {
        console.error("Save error:", err);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      });
  };

  return (
    <main>
      <div className="container">


        <div className="header">
          <h1 className="title">ToDo App</h1>
          <div className="user-info">
            <button onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <span>{userEmail}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>



        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>

      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
