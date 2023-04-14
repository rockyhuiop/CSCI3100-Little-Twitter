import "../components/chatbox/chatbox.css";
import Topbar from "../components/chatbox/topbar/topbar";
import MessageTopbar from "../components/chatbox/messageTopbar/messageTopbar";
import Conversation from "../components/chatbox/conversation/conversation";
import Message from "../components/chatbox/message/message";
import SearchedUser from "../components/chatbox/searchedUser/searchedUser";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../utils/UserContext";
import axios from "axios";
import { io } from "socket.io-client";

const Chatbox = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const socket = useRef();
    // get the login in user information
    const { user: currentUser } = useUser();
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8001");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderID,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        if (currentUser){
            socket.current.emit("addUser", currentUser.tweetID);
        }
    }, [currentUser]);

    //fetching all the conversation room for the login in user
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    "/conversation/" + currentUser.tweetID
                );
                // setting the state for conversation room to data we fetched from backend
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [currentUser?currentUser.tweetID:currentUser]);

    //tackling user input for search
    useEffect(() => {
        const saveSearchTerm = async (searchTerm) => {
            const res = await axios.get("/SearchUserById/" + searchTerm);
            setSearchResult(res.data);
        };
        saveSearchTerm();
    }, [searchTerm]);

    function handleInputChange(event) {
        setSearchTerm(event.target.value);
    }

    function findConversations(targetUserID) {}

    //fetching all the message of the current Selected conservation
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/message/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    // dealing with the new message send by the login user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser.tweetID,
            text: newMessage,
            conversationID: currentChat._id,
        };

        const receiverID = await currentChat.members.find(
            (member) => member !== currentUser.tweetID
        );

        socket.current.emit("sendMessage", {
            senderID: currentUser.tweetID,
            receiverID: receiverID,
            text: newMessage,
        });

        try {
            const res = await axios.post("/message", message);
            // appending new message to current message state
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="messenger">
            <div className="chatMenu">
                <Topbar />
                <div className="chatMenuWrapper">
                    <input
                        placeholder="Search for friends"
                        className="chatMenuInput"
                        onChange={handleInputChange}
                    />
                    {searchTerm == ""
                        ? conversations.map((c) => (
                              <div onClick={() => setCurrentChat(c)}>
                                  <Conversation
                                      conversation={c}
                                      currentUser={currentUser}
                                  />
                              </div>
                          ))
                        : searchResult.map((searchedUser) => (
                              <div onClick={findConversations(searchedUser)}>
                                  <SearchedUser searchedUser={searchedUser} />
                              </div>
                          ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                <MessageTopbar
                                    currentChat={currentChat}
                                    currentUser={currentUser}
                                />
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message
                                            message={m}
                                            own={
                                                m.sender === currentUser.tweetID
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="Start a new message"
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    value={newMessage}
                                ></textarea>
                                <button
                                    className="chatSubmitButton"
                                    onClick={handleSubmit}
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <body>
                            <span className="NotSelectedConversationText">
                                <h1>Select a message</h1>
                            </span>
                            <span className="NotSelectedConversationText">
                                <h3>
                                    Choose from your existing convserations,
                                    start a new one or just keep diving
                                </h3>
                            </span>
                        </body>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
