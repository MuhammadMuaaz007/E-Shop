import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import styles from "../../styles/styles";
import { server } from "../../server";

/* ================= SOCKET ================= */
const ENDPOINT = "http://localhost:4000";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

/* ================= MAIN ================= */
const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollRef = useRef(null);

  /* ================= RECEIVE MESSAGE ================= */
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => socket.off("getMessage");
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  /* ================= CONVERSATIONS ================= */
  useEffect(() => {
    if (!seller?._id) return;

    const fetchConversations = async () => {
      const res = await axios.get(
        `${server}/conversation/get-all-conversation-seller/${seller._id}`,
        { withCredentials: true }
      );
      setConversations(res.data.conversations);
    };

    fetchConversations();
  }, [seller]);

  /* ================= ONLINE USERS ================= */
  useEffect(() => {
    if (!seller?._id) return;

    socket.emit("addUser", seller._id);
    socket.on("getUsers", (users) => setOnlineUsers(users));

    return () => socket.off("getUsers");
  }, [seller]);

  const isOnline = (chat) => {
    const receiverId = chat.members.find((m) => m !== seller._id);
    return onlineUsers.some((u) => u.userId === receiverId);
  };

  /* ================= MESSAGES ================= */
  useEffect(() => {
    if (!currentChat?._id) return;

    const fetchMessages = async () => {
      const res = await axios.get(
        `${server}/message/get-all-messages/${currentChat._id}`
      );
      setMessages(res.data.messages);
    };

    fetchMessages();
  }, [currentChat]);

  /* ================= SEND MESSAGE ================= */
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const receiverId = currentChat.members.find((m) => m !== seller._id);

    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    const res = await axios.post(`${server}/message/create-new-message`, {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    });

    setMessages((prev) => [...prev, res.data.message]);
    setNewMessage("");

    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      }
    );
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[92%] bg-white m-5 h-[85vh] rounded-xl shadow overflow-hidden">
      {!open ? (
        <>
          <h1 className="text-center text-2xl font-semibold py-4 border-b">
            Messages
          </h1>

          <div className="overflow-y-auto h-full">
            {conversations.map((item, index) => (
              <MessageList
                key={item._id}
                data={item}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                online={isOnline(item)}
                setActiveStatus={setActiveStatus}
                isLoading={isLoading}
              />
            ))}
          </div>
        </>
      ) : (
        <SellerInbox
          scrollRef={scrollRef}
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

/* ================= MESSAGE LIST ITEM ================= */
const MessageList = ({
  data,

  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  isLoading,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = data.members.find((m) => m !== me);

    const fetchUser = async () => {
      const res = await axios.get(`${server}/user/user-info/${userId}`);
      setUser(res.data.user);
    };

    fetchUser();
  }, [data, me]);

  const handleClick = () => {
    navigate(`/dashboard-messages?${data._id}`);
    setOpen(true);
    setCurrentChat(data);
    setUserData(user);
    setActiveStatus(online);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-100 transition"
    >
      <div className="relative">
        <img
          src={user?.avatar?.url}
          className="w-12 h-12 rounded-full object-cover"
          alt=""
        />
        <span
          className={`absolute top-0 right-0 w-3 h-3 rounded-full ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>

      <div className="flex-1">
        <h2 className="font-medium">{user?.name}</h2>
        <p className="text-sm text-gray-600 truncate">
          {!isLoading && data.lastMessageId === me
            ? "You: "
            : `${user?.name}: `}
          {data.lastMessage}
        </p>
      </div>
    </div>
  );
};

/* ================= SELLER INBOX ================= */
const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
        <div className="flex items-center gap-3">
          <img
            src={userData?.avatar?.url}
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div>
            <h2 className="font-semibold">{userData?.name}</h2>
            {activeStatus && (
              <p className="text-xs text-green-600">Active now</p>
            )}
          </div>
        </div>

        <AiOutlineArrowRight
          size={22}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={scrollRef}
            className={`flex ${
              msg.sender === sellerId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                msg.sender === sellerId
                  ? "bg-black text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[10px] text-gray-200 mt-1">
                {format(msg.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessageHandler}
        className="p-4 border-t flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
        />
        <button type="submit">
          <AiOutlineSend size={22} />
        </button>
      </form>
    </div>
  );
};

export default DashboardMessages;
