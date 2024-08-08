import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import { toast } from "sonner";
import { userAppStore } from "@/store";

const Chat = () => {
  const { userInfo } = userAppStore();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please set up a profile first");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
};

export default Chat;
