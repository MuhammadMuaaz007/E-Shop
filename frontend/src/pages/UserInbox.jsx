import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../styles/styles";

const ENDPOINT = "localhost:4000";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
console.log("[UserInbox] Socket connecting to:", ENDPOINT);

/* ======================= MAIN ======================= */
const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);

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

  /* ================= SOCKET ================= */
  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log("[UserInbox] Received getMessage:", data);
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
    if (!user?._id) return;

    const fetchConversations = async () => {
      const res = await axios.get(
        `${server}/conversation/get-all-conversation-user/${user._id}`,
        { withCredentials: true },
      );
      setConversations(res.data.conversations);
    };

    fetchConversations();
  }, [user]);

  /* ================= ONLINE USERS ================= */
  useEffect(() => {
    if (!user?._id) return;

    console.log("[UserInbox] Emitting addUser:", user._id);
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {
      console.log("[UserInbox] Online users:", users);
      setOnlineUsers(users);
    });

    return () => socket.off("getUsers");
  }, [user]);

  const onlineCheck = (chat) => {
    const otherUserId = chat.members.find((m) => m !== user._id);
    return onlineUsers.some((u) => u.userId === otherUserId);
  };

  /* ================= MESSAGES ================= */
  useEffect(() => {
    if (!currentChat?._id) return;

    const fetchMessages = async () => {
      const res = await axios.get(
        `${server}/message/get-all-messages/${currentChat._id}`,
      );
      setMessages(res.data.messages);
    };

    fetchMessages();
  }, [currentChat]);

  /* ================= SEND MESSAGE ================= */
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const receiverId = currentChat.members.find((m) => m !== user._id);

    console.log("[UserInbox] Sending message:", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    const res = await axios.post(`${server}/message/create-new-message`, {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    });

    setMessages((prev) => [...prev, res.data.message]);
    setNewMessage("");

    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: newMessage,
        lastMessageId: user._id,
      },
    );
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full">
      {!open ? (
        <>
          <Header />
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>

          {conversations.map((item, index) => (
            <MessageList
              key={item._id}
              data={item}
              index={index}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              me={user._id}
              setUserData={setUserData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
              loading={loading}
            />
          ))}
        </>
      ) : (
        <UserInboxChat
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
        />
      )}
    </div>
  );
};

/* ================= MESSAGE LIST ================= */
const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  loading,
}) => {
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const shopId = data.members.find((m) => m !== me);

    const fetchShop = async () => {
      const res = await axios.get(`${server}/shop/get-shop-info/${shopId}`);
      setShop(res.data.shop);
    };

    fetchShop();
  }, [data, me]);

  const handleClick = () => {
    navigate(`/inbox?${data._id}`);
    setOpen(true);
    setCurrentChat(data);
    setUserData(shop);
    setActiveStatus(online);
    setActive(index);
  };

  return (
    <div
      className={`w-full flex p-3 cursor-pointer ${
        active === index ? "bg-[#00000010]" : ""
      }`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={shop?.avatar?.url}
          className="w-[50px] h-[50px] rounded-full"
          alt=""
        />
        <span
          className={`w-[12px] h-[12px] rounded-full absolute top-[2px] right-[2px] ${
            online ? "bg-green-400" : "bg-gray-400"
          }`}
        />
      </div>

      <div className="pl-3">
        <h1 className="text-[18px]">{shop?.name}</h1>
        <p className="text-[15px] text-gray-600">
          {!loading && data.lastMessageId === me ? "You: " : `${shop?.name}: `}
          {data.lastMessage}
        </p>
      </div>
    </div>
  );
};

/* ================= USER CHAT ================= */
const UserInboxChat = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  userData,
  activeStatus,
  scrollRef,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between p-5">
      {/* Header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex items-center">
          <img
            src={userData?.avatar?.url}
            className="w-[55px] h-[55px] rounded-full"
            alt=""
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-semibold">{userData?.name}</h1>
            {activeStatus && (
              <p className="text-green-600 text-sm">Active now</p>
            )}
          </div>
        </div>

        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Messages */}
      <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
        {messages.map((item, index) => (
          <div
            key={index}
            ref={scrollRef}
            className={`flex my-2 ${
              item.sender === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div>
              <div
                className={`p-2 rounded text-white ${
                  item.sender === userId ? "bg-black" : "bg-green-500"
                }`}
              >
                {item.text}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {format(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessageHandler}
        className="p-3 flex items-center relative"
      >
        <input
          type="text"
          required
          placeholder="Enter your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className="absolute right-4">
          <AiOutlineSend size={22} />
        </button>
      </form>
    </div>
  );
};

export default UserInbox;
