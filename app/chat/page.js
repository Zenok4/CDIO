"use client"
import { ChevronLeft, Send } from "lucide-react";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      me: false,
      content: "Xin chào! Chúng tôi có thể giúp được gì cho bạn?",
    },
    {
      me: true,
      content: "...............",
    },
  ]);

  useEffect(() => {
    // This effect will run every time the chats array changes
    console.log("Chats updated:", chats);
    // You can add any other side effects here, like scrolling to the bottom of the chat
  }, [chats]);

  const handleSendMessage = (isMe) => {
    if (message.trim()) {
      setChats(prevChats => [...prevChats, { me: isMe, content: message }]);
      setMessage("");
    }
  };

  return (
    <div className="mx-auto flex flex-col h-[75vh] bg-gray-100 mt-5 mb-10">
      {/* Header */}
      <div className="p-4 flex items-center bg-white shadow">
        <button className="text-gray-500 text-xl">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-gray-400 text-lg ml-4">chat với hiệu thuốc</h2>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
        {chats.length > 0 &&
          chats.map((chat, index) => (
            <div key={index}>
              {/* Tin nhắn từ hệ thống */}
              {chat.me === false && (
                <div className="flex items-start space-x-2 mb-4">
                  <span className="text-gray-500 text-sm">C</span>
                  <div className="bg-white p-3 rounded-lg shadow text-gray-700">
                    {chat.content}
                  </div>
                </div>
              )}

              {/* Tin nhắn của người dùng */}
              {chat.me === true && (
                <div className="flex justify-end space-x-2 mb-4">
                  <div className="bg-white p-3 rounded-lg shadow text-gray-700">
                    {chat.content}
                  </div>
                  <span className="text-gray-500 text-sm">U</span>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Nút tùy chọn */}
      <div className="flex justify-around py-2">
        <button className="bg-white px-4 py-2 shadow text-gray-700 @apply rounded-[20px]">
          Gặp bác sĩ tư vấn
        </button>
        <button className="bg-white px-4 py-2 shadow text-gray-700 @apply rounded-[20px]">
          Gặp dược sĩ nhà thuốc
        </button>
        <button className="bg-white px-4 py-2 shadow text-gray-700 @apply rounded-[20px]">
          tư vấn cụ thể
        </button>
        <button className="bg-white px-4 py-2 shadow text-gray-700 @apply rounded-[20px]">
          công dụng thuốc có tốt không
        </button>
        <button className="bg-white px-4 py-2 shadow text-gray-700 @apply rounded-[20px]">
          có tích điểm không
        </button>
      </div>

      {/* Input Chat */}
      <div className="p-3 bg-white flex items-center shadow" onClick={() => handleSendMessage(true)}>
        <input
          type="text"
          value={message}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 border rounded-full"
          onChange={ev => setMessage(ev.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded-full ml-2">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
