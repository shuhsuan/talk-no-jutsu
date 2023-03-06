import "./App.css";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faPaperPlane);

function App() {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const theInput = document.getElementById("input");
  const messages = document.getElementById("messages");

  const handleChange = (e) => {
    if (e.key === "Enter") {
      theInput.value = "";
      messages.innerHTML += "<p>" + name + ": " + input + "</p>";
    }
  };

  const handleClick = () => {
    messages.innerHTML = "<p>" + name + ": " + input + "</p>";
    theInput.value = "";
  };

  const nameEnter = (e) => {
    if(e.key==="Enter")
    {
      setName(e.target.value)
      document.getElementById("displayName").innerHTML = "Your username has been set to " + e.target.value; 
      document.getElementById("name").value="";
    }
  }

  return (
    <div className="App">
      <input autocomplete="off" id="name" onKeyDown={nameEnter} 
      placeholder="Your username"/>
      <p id="displayName"></p>
      <div className="inputBit">
        <input
          id="input"
          type="text"
          onInput={(e) => setInput(e.target.value)}
          onKeyDown={handleChange}
          autoComplete="off"
        ></input>
        <button id="sendButton" onClick={handleClick}>
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
        </button>
      </div>
      <div id="messages"></div>
    </div>
  );
}

export default App;