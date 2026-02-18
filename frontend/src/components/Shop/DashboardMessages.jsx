import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { TfiGallery } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { format } from "timeago.js";
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
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
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
  useEffect(() => {
    const userId = seller?._id;
    if (seller) {
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat?.members?.find((member) => member !== seller?._id);
    const online = onlineUsers?.find((user) => user?.userId === chatMembers);

    return online ? true : false;
  };

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
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
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
          userData={userData}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};
const MessageList = ({
  data,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  activeStatus,
}) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setCurrentChat(data);
    setOpen(true);
  };
  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me._id);
    const getUser = async () => {
      axios
        .get(`${server}/user/user-info/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.user);
          setUserData(res.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    };
    getUser();
  }, [data, me, online, setActiveStatus]);

  return (
    <div
      className="w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                    bg-[#f7f8fa] hover:bg-[#eaeef3]"
      onClick={() => handleClick(data._id)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={userData?.avatar?.url}
          alt="Avatar"
          className="w-[52px] h-[52px] rounded-full object-cover"
        />

        {/* Online status */}
        {online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {userData ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-[16px] font-semibold text-gray-900 truncate">
                {userData.name}
              </h1>
              <span className="text-[12px] text-gray-500 mt-6">
                {activeStatus ? "Active Now" : "Offline"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-gray-600 truncate">
                {data?.lastMessageId === userData._id
                  ? "You: "
                  : userData.name.split(" ")[0] + ": "}
                {data?.lastMessage}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <h1 className="text-[16px] font-semibold text-gray-400 truncate">
              Loading...
            </h1>
          </div>
        )}
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
  userData,
  activeStatus,
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
        <div className="flex items-center gap-2">
          {userData ? (
            <>
              <img
                src={userData.avatar?.url}
                alt="Seller"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{userData.name}</p>
                <span
                  className={`text-xs flex items-center gap-1 ${
                    activeStatus ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  ● {activeStatus ? "Active" : "Offline"}
                </span>
              </div>
            </>
          ) : (
            <div className="text-gray-400">Loading...</div>
          )}
        </div>

        <AiOutlineArrowRight
          size={23}
          className="cursor-pointer text-gray-600"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages?.map((msg, index) => {
          const isSeller = msg.sender === sellerId;

          return (
            <div
              key={index}
              className={`flex mb-3 ${
                isSeller ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[70%] bg-[#38c776] text-white p-3 rounded-lg">
                <p className="text-sm">{msg.text}</p>
                <span className="block text-xs text-white/70 mt-1">
                  {format(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessageHandler}
        className="flex items-center gap-3 p-4 bg-white"
      >
        {/* Gallery Icon */}
        <button type="button" className="text-gray-500 hover:text-gray-700">
          <TfiGallery size={23} />
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-5 py-3 text-sm border rounded-full
                     bg-transparent focus:outline-none focus:ring-0"
        />

        <button type="submit" className="text-blue-500 hover:text-blue-600">
          <AiOutlineSend size={25} />
        </button>
      </form>
    </div>
  );
};

export default DashboardMessages;
