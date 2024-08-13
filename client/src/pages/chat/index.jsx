import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import { toast } from "sonner";
import { userAppStore } from "@/store";
// import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";
import ContactsContainer from "./components/contacts-container";

const Chat = () => {
  const { userInfo } = userAppStore();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please set up a profile first");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div className="flex h-[100vh] text-white overflow-hidden">
    <ContactsContainer></ContactsContainer>
   
    <ChatContainer></ChatContainer>
  </div>;
};

export default Chat;
