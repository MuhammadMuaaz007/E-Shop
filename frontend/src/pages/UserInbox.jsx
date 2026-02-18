import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../styles/styles";

const ENDPOINT = "https://socket-ecommerce-tu68.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  // Socket listener for incoming messages
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        images: data.images || null,
      });
    });
  }, []);

  // Add incoming message to current chat
  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  // Fetch user conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
          { withCredentials: true }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user, messages]);

  // Socket add user & online users list
  useEffect(() => {
    if (user) {
      socketId.emit("addUser", user._id);
      socketId.on("getUsers", (data) => setOnlineUsers(data));
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMember = chat.members.find((member) => member !== user?._id);
    return onlineUsers.some((u) => u.userId === chatMember);
  };

  // Fetch messages for current chat
  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get(`${server}/message/get-all-messages/${currentChat._id}`);
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // Send text message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((m) => m !== user._id);

    socketId.emit("sendMessage", { senderId: user._id, receiverId, text: newMessage });

    try {
      const res = await axios.post(`${server}/message/create-new-message`, message);
      setMessages([...messages, res.data.message]);
      updateLastMessage(newMessage);
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  };

  const updateLastMessage = async (text) => {
    await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
      lastMessage: text,
      lastMessageId: user._id,
    });
  };

  // Image upload
  const handleImageUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (imageData) => {
    const receiverId = currentChat.members.find((m) => m !== user._id);

    socketId.emit("sendMessage", { senderId: user._id, receiverId, images: imageData });

    try {
      const res = await axios.post(`${server}/message/create-new-message`, {
        images: imageData,
        sender: user._id,
        text: "",
        conversationId: currentChat._id,
      });
      setMessages([...messages, res.data.message]);
      updateLastMessage("Photo");
      setImages(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Scroll to last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {!open && (
        <>
          <Header />
          <h1 className="text-center text-3xl py-4 font-bold text-gray-800">
            Your Messages
          </h1>
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg divide-y divide-gray-200">
            {conversations.map((conv, i) => (
              <MessageList
                key={i}
                data={conv}
                index={i}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(conv)}
                setActiveStatus={setActiveStatus}
                loading={loading}
              />
            ))}
          </div>
        </>
      )}

      {open && currentChat && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

// ---------------- Message List ----------------
const MessageList = ({ data, index, setOpen, setCurrentChat, me, setUserData, userData, online, setActiveStatus, loading }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((m) => m !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [me, data]);

  const handleClick = () => {
    setOpen(true);
    setCurrentChat(data);
    setUserData(user);
    setActiveStatus(online);
    navigate(`/inbox?${data._id}`);
  };

  return (
    <div
      className="flex items-center p-4 cursor-pointer hover:bg-gray-100 transition rounded-md"
      onClick={handleClick}
    >
      <div className="relative">
        <img src={user?.avatar?.url} alt="" className="w-12 h-12 rounded-full object-cover" />
        <span
          className={`absolute top-0 right-0 w-3 h-3 rounded-full border border-white ${
            online ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
        <p className="text-gray-500 text-sm truncate">
          {!loading && data?.lastMessageId === userData?._id ? `${userData?.name.split(" ")[0]}: ` : "You: "} {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

// ---------------- Seller Inbox ----------------
const SellerInbox = ({ setOpen, newMessage, setNewMessage, sendMessageHandler, messages, sellerId, userData, activeStatus, scrollRef, handleImageUpload }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg flex flex-col h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
        <div className="flex items-center">
          <img src={userData?.avatar?.url} alt="" className="w-14 h-14 rounded-full object-cover" />
          <div className="ml-3">
            <p className="font-semibold text-gray-800">{userData?.name}</p>
            <p className="text-sm text-green-500">{activeStatus ? "Active Now" : "Offline"}</p>
          </div>
        </div>
        <AiOutlineArrowRight className="cursor-pointer" size={24} onClick={() => setOpen(false)} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            ref={scrollRef}
            className={`flex items-end ${msg.sender === sellerId ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== sellerId && (
              <img src={userData?.avatar?.url} alt="" className="w-10 h-10 rounded-full object-cover mr-2" />
            )}
            <div className="flex flex-col items-end">
              {msg.text && (
                <div className={`px-4 py-2 rounded-lg text-white ${msg.sender === sellerId ? "bg-gray-800" : "bg-green-500"}`}>
                  {msg.text}
                </div>
              )}
              <span className="text-xs text-gray-400 mt-1">{format(msg.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Send Message */}
      <form onSubmit={sendMessageHandler} className="flex items-center p-4 border-t relative">
        <input type="file" id="image" className="hidden" onChange={handleImageUpload} />
        <label htmlFor="image" className="mr-3 cursor-pointer text-gray-600 hover:text-gray-800">
          <TfiGallery size={24} />
        </label>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="ml-3 text-gray-600 hover:text-gray-800">
          <AiOutlineSend size={24} />
        </button>
      </form>
    </div>
  );
};

export default UserInbox;
