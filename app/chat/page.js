"use client";
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

  const handleSendMessage = (isMe) => {
    if (message.trim()) {
      setChats((prevChats) => [...prevChats, { me: isMe, content: message }]);
      setMessage("");
      handleChatboxMessage(message);
    }
  };

  const handleChatboxMessage = ({ message: String }) => {
    let response = "";

    if (message.includes("mệt mỏi")) {
      response =
        "Cảm giác mệt mỏi có thể do thiếu ngủ, căng thẳng hoặc thiếu dinh dưỡng. Nếu kéo dài, bạn nên kiểm tra sức khỏe tổng quát.";

      if (message.includes("nóng người")) {
        response +=
          " Kèm theo nóng người có thể là dấu hiệu của sốt nhẹ hoặc mất nước. Hãy uống nhiều nước và nghỉ ngơi.";
      }
    }

    if (message.includes("sốt")) {
      response =
        "Bạn nên uống nhiều nước, nghỉ ngơi và theo dõi nhiệt độ. Nếu sốt trên 39°C, hãy đến gặp trực tiếp bác sĩ.";

      if (message.includes("đau họng")) {
        response +=
          " Kèm theo đau họng có thể là dấu hiệu của viêm họng hoặc cúm. Hãy uống nước ấm và tránh đồ lạnh.";
      }
    }

    if (message.includes("đau đầu")) {
      response =
        "Hãy thử thư giãn, tránh căng thẳng và uống đủ nước. Nếu đau dữ dội hoặc kèm theo sốt cao, hãy đi kiểm tra ngay.";

      if (message.includes("chóng mặt")) {
        response +=
          " Nếu kèm theo chóng mặt, có thể bạn đang bị thiếu máu hoặc vấn đề về huyết áp. Hãy theo dõi thêm.";
      }
    }

    if (message.includes("đau bụng")) {
      response =
        "Bạn bị đau bụng ở vị trí nào? Nếu là đau quặn kèm tiêu chảy, có thể do rối loạn tiêu hóa.";

      if (message.includes("tiêu chảy")) {
        response +=
          " Hãy uống nhiều nước để tránh mất nước và theo dõi triệu chứng.";
      }
    }

    if (message === "Gặp bác sĩ tư vấn") {
      response =
        "Bạn muốn gặp bác sĩ tư vấn? Hãy đặt lịch hẹn với bác sĩ của chúng tôi ngay!";
    }
    if (message === "Gặp dược sĩ nhà thuốc") {
      response =
        "Bạn muốn gặp dược sĩ? Chúng tôi có dược sĩ tư vấn miễn phí, vui lòng ghé qua nhà thuốc gần nhất.";
    }
    if (message === "tư vấn cụ thể") {
      response =
        "Vui lòng mô tả chi tiết triệu chứng hoặc thắc mắc của bạn để chúng tôi tư vấn chính xác hơn.";
    }
    if (message === "công dụng thuốc có tốt không") {
      response =
        "Các loại thuốc được cung cấp tại hệ thống của chúng tôi đều đảm bảo chất lượng và được kiểm định an toàn.";
    }
    if (message === "có tích điểm không") {
      response =
        "Chúng tôi có chương trình tích điểm cho khách hàng thân thiết. Bạn có thể kiểm tra điểm của mình trong tài khoản.";
    }

    // Nếu không có triệu chứng nào khớp, phản hồi mặc định
    if (response === "") {
      response =
        "Triệu chứng của bạn chưa có trong hệ thống. Vui lòng mô tả chi tiết hơn để tôi có thể tư vấn tốt nhất.";
    }
    setChats((prevChats) => [...prevChats, { me: false, content: response }]);
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
        <button
          className="bg-white px-4 py-2 shadow text-gray-700 rounded-[20px]"
          onClick={() => {
            setMessage("Gặp bác sĩ tư vấn");
            handleSendMessage(true);
          }}
        >
          Gặp bác sĩ tư vấn
        </button>
        <button
          className="bg-white px-4 py-2 shadow text-gray-700 rounded-[20px]"
          onClick={() => {
            setMessage("Gặp dược sĩ nhà thuốc");
            handleSendMessage(true);
          }}
        >
          Gặp dược sĩ nhà thuốc
        </button>
        <button
          className="bg-white px-4 py-2 shadow text-gray-700 rounded-[20px]"
          onClick={() => {
            setMessage("tư vấn cụ thể");
            handleSendMessage(true);
          }}
        >
          tư vấn cụ thể
        </button>
        <button
          className="bg-white px-4 py-2 shadow text-gray-700 rounded-[20px]"
          onClick={() => {
            setMessage("công dụng thuốc có tốt không");
            handleSendMessage(true);
          }}
        >
          công dụng thuốc có tốt không
        </button>
        <button
          className="bg-white px-4 py-2 shadow text-gray-700 rounded-[20px]"
          onClick={() => {
            setMessage("có tích điểm không");
            handleSendMessage(true);
          }}
        >
          có tích điểm không
        </button>
      </div>

      {/* Input Chat */}
      <div
        className="p-3 bg-white flex items-center shadow"
        onClick={() => handleSendMessage(true)}
      >
        <input
          type="text"
          value={message}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 border rounded-full"
          onChange={(ev) => setMessage(ev.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded-full ml-2">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
