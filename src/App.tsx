// App.tsx
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Tipi per i messaggi
interface ChatMessage {
  user: string;
  message: string;
}

const host:string= `${import.meta.env.VITE_LOCAL_IP}:3000` // write your local ip on a .env file 

const socket: Socket = io(`http://${host}`);

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [highlight,setHighlight] = useState<boolean>(false);
  const btnClass:string = highlight ? "highlight" : "";

  useEffect(() => {
    // handler per i messaggi
    const handleInit = (msgs: ChatMessage[]) => setMessages(msgs);
    const handleMessage = (msg: ChatMessage) =>
      setMessages((prev) => [...prev, msg]);

    socket.on("init", handleInit);
    socket.on("message", handleMessage);

    // cleanup: rimuove i listener per evitare doppi messaggi
    return () => {
      socket.off("init", handleInit);
      socket.off("message", handleMessage);
    };
  }, []);

  const sendMessage = () => {
      if (!userName.trim() || !input.trim()) {
        alert("Insert Your Name and message");
        setHighlight(true);
     return;
    }
     setHighlight(false);
    const msg: ChatMessage = { user: userName, message: input };
    socket.emit("message", msg);
    setInput("");
  };

  return (
    <>
    <div className="chat">
      <h1 className="title">Local Chat</h1>

      {/* Input per username */}
      <input
        type="text"
        value={userName}
        className={btnClass}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Write your name..."
        maxLength={10}
        required
        
      />

      {/* Messaggi ricevuti */}
      <div className="rec">
        {messages.map((m, i) => (
          <div key={i}>
            <strong id="user">{m.user}:</strong> {m.message}
          </div>
        ))}
      </div>

      {/* Input per nuovo messaggio */}
      <input
        value={input}
        className={btnClass}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your message..."
        onKeyDown={(e) => {
        if (e.key === "Enter") sendMessage();
        }} 
        required
      />
      <br />
      <button type="button"
      onClick={sendMessage}>Send</button>
      <br />
      <button type="button"
      onClick={()=>
      {
        socket.emit("clearChat");
        setMessages([]);
      }
        }>Delete Chat</button>
    
    </div>
    <footer style={{ textAlign: "center", padding: "10px", color: "#555" }}>
     © Manuel Crispino {new Date().getFullYear()}
    </footer>
    </>
  );
}

export default App;
