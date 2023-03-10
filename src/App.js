import "./App.css";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faPaperPlane);

function App() {
  const [input, setInput] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || undefined)
  const [message, setMessage] = useState([]);

  const theInput = document.getElementById("input");
  const messages = document.getElementById("messages");

  let nextId = 0;

  useEffect(() => {
    localStorage.setItem("message", JSON.stringify(message))// everytime message state changes, this is triggered
    //messages.innerHTML = message.map(mess => (<p key={mess.id}>{mess.message}</p>));
  }, [message]);

  useEffect(() => {
    const mess = JSON.parse(localStorage.getItem("message"))
    if(mess){
      setMessage(mess);
    }
  }, [])

  const handleChange = (e) => {
    if (e.key === "Enter") {
      message.push({
        id: nextId++,
        message: e.target.value
      }); //adding message to the array
      //setMessage(message => [...message, e.target.value]); //store messages in state array
      theInput.value = "";
      //messages.innerHTML += "<p>" + name + ": " + input + "</p>";
    }
  };

  const handleClick = (e) => {
    setMessage(message => [...message, e.target.value])
    messages.innerHTML = "<p>" + name + ": " + input + "</p>";
    theInput.value = "";
  };

  const nameEnter = (e) => {
    if(e.key==="Enter")
    {
      setName(e.target.value)
      localStorage.setItem("name", e.target.value);
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
      <div id="messages">{message.map(mess=> (
        <p key={mess.id}>{mess.message}</p>
      ))}</div>
    </div>
  );
}

export default App;