import React, { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    const embeddedChatbotConfig = {
      chatbotId: "fGYTLr-2s9l4WGUoy8eT1",
      domain: "www.chatbase.co"
    };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute("chatbotId", embeddedChatbotConfig.chatbotId);
    script.setAttribute("domain", embeddedChatbotConfig.domain);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
    
    </div>
  );
}
