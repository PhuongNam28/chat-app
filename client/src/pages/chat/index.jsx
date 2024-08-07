import { userAppStore } from "@/store";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = userAppStore();
  const navigate = Navigate;

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please set up a profile first");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  
  return <div>Chat</div>;
};

export default Chat;
