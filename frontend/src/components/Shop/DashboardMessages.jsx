import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { TfiGallery } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});
import socketIO from "socket.io-client";

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  });
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          {
            withCredentials: true,
          },
        );

        setConversations(response.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    getConversation();
  }, [seller]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const response = await axios.get(
            `${server}/message/get-all-messages/${currentChat._id}`,
            {
              withCredentials: true,
            },
          );
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessages();
  }, [currentChat]);

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessagesId: seller._id,
    });
    axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error updating last message:", error);
      });
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== seller._id,
    );
    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage(res.data.message._id);
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {/* All messages list */}
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-poppins">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
        />
      )}
    </div>
  );
};
const MessageList = ({ data, setOpen, setCurrentChat }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setCurrentChat(data);
    setOpen(true);
  };
  return (
    <div
      className="w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                    bg-[#f7f8fa] hover:bg-[#eaeef3]"
      onClick={() => handleClick(data._id)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src="http://localhost:8000/Gemini_Generated_Image_lg3dzmlg3dzmlg3d-1766570146336-152761747.png"
          alt="Avatar"
          className="w-[52px] h-[52px] rounded-full object-cover"
        />

        {/* Online status */}
        <span className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-green-400 border-2 border-white rounded-full" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-semibold text-gray-900 truncate">
            Shahriar Sajeeb
          </h1>
          <span className="text-[12px] text-gray-500">2:45 PM</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-gray-600 truncate">
            <span className="font-medium">You:</span> Yeah I am good
          </p>

          {/* Unread badge (optional) */}
          <span
            className="ml-2 min-w-[20px] h-[20px] bg-blue-500 text-white text-[12px]
                           flex items-center justify-center rounded-full"
          >
            2
          </span>
        </div>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-md justify-between">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-slate-100 border-b">
        <div className="flex items-center gap-3">
          <img
            src="http://localhost:8000/Gemini_Generated_Image_lg3dzmlg3dzmlg3d-1766570146336-152761747.png"
            alt="Seller avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-sm sm:text-base font-semibold">
              Shahriar Sajeeb
            </h1>
            <p className="text-xs text-green-600">● Active now</p>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer text-gray-600 hover:text-black"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
        />
      </div>
      {/* Messages container with scroll */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll flex-1">
        {messages &&
          messages.map((item, index) => (
            <React.Fragment key={index}>
              {/* Incoming message */}
              <div
                className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`}
              >
                {item.sender !== sellerId && (
                  <img
                    src="http://localhost:8000/Gemini_Generated_Image_lg3dzmlg3dzmlg3d-1766570146336-152761747.png"
                    alt="user avatar"
                    className="w-[40px] h-[40px] rounded-full mr-3"
                  />
                )}

                <div className="w-max p-2 rounded bg-[#38c776] text-[#fff] h-min">
                  <p>{item.text}</p>
                </div>
              </div>
              {/* Outgoing message */}
              {/* <div className="flex w-full justify-end my-2">
                <div className="w-max p-2 rounded bg-[#38c776] text-[#fff] h-min">
                  <p>{item.text}</p>
                </div>
              </div> */}
            </React.Fragment>
          ))}
      </div>
      {/* Input */}
      <form
        onSubmit={sendMessageHandler}
        className="sticky bottom-0 w-full flex items-center gap-2 p-3 border-t bg-white"
      >
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          aria-label="Upload image"
        >
          <TfiGallery size={20} />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="text-blue-500 hover:text-blue-600"
          aria-label="Send message"
        >
          <AiOutlineSend size={22} />
        </button>
      </form>
    </div>
  );
};

export default DashboardMessages;
