import { useState } from "react";
import { User, Users, MessageCircle } from "lucide-react";

const JoinChat = ({ onJoin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onJoin(username, room);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-200 px-4">
      
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-slate-100 transition-all duration-300">
        
        {/* App Logo / Icon Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#005c4b] p-3.5 rounded-2xl shadow-lg mb-3 text-white">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Chat App</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Enter your username and group name to join</p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block px-1">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none border border-slate-200 focus:border-[#00a884] focus:bg-white transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Group Name Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block px-1">
              Group Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <Users className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Enter group name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none border border-slate-200 focus:border-[#00a884] focus:bg-white transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#00a884] hover:bg-[#008f6f] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>JOIN CHAT</span>
          </button>

        </form>

      </div>
    </div>
  );
};

export default JoinChat;

