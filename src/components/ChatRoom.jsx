import { useEffect, useState } from "react";
import { LogOut, SendHorizontal, MessageSquare } from "lucide-react";

const ChatRoom = ({ username, room, socket, onLeave }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send", { text: message, room: room, username: username });
      setMessages((prev) => [...prev, { text: message, room, username }]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-[#efeae2] shadow-2xl rounded-2xl overflow-hidden border border-slate-200 my-4">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-[#005c4b] px-6 py-4 text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-wide text-white">{room}</h2>
            <p className="text-xs text-emerald-200 font-medium">Active User:<span className="text-white font-semibold">{username}</span></p>
          </div>
        </div>
        <button 
          type="button"
          className="flex items-center space-x-2 bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer active:scale-95" 
          onClick={onLeave}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Chat Message Area without white container box */}
      <div 
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{
          backgroundColor: "#efeae2",
          backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
          backgroundRepeat: "repeat"
        }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-2">
            <MessageSquare className="w-10 h-10 stroke-1 text-slate-500" />
            <p className="text-sm font-medium">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isOwn = msg.username === username;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isOwn ? "items-end" : "items-start"} animate-fadeIn`}
              >
                <span className="text-[11px] font-semibold text-slate-600 mb-1 px-1">
                  {msg.username}
                </span>
                <div className={`relative px-4 py-2.5 rounded-xl shadow-sm max-w-md text-sm leading-relaxed ${
                  isOwn 
                    ? "bg-[#d9fdd3] text-slate-900 rounded-tr-none" 
                    : "bg-white text-slate-900 rounded-tl-none border border-slate-100"
                }`}>
                  <p className="break-words">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Input Form */}
      <form className="bg-[#f0f2f5] px-6 py-3 flex items-center space-x-3 border-t border-slate-200 shadow-inner" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
          className="flex-1 bg-white text-slate-800 placeholder-slate-400 rounded-xl px-5 py-3 text-sm outline-none border border-slate-300 focus:border-[#00a884] transition-all shadow-inner"
        />
        <button 
          type="submit" 
          className="flex items-center justify-center bg-[#00a884] hover:bg-[#008f6f] text-white p-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
          disabled={!message.trim()}
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
};

export default ChatRoom;

