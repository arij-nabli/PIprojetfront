import React from 'react';

const Chatbot = () => {
  return (
    <iframe 
      srcDoc={`
        <html>
        
          <script>
          window.embeddedChatbotConfig = {
          chatbotId: "fGYTLr-2s9l4WGUoy8eT1",
          domain: "www.chatbase.co"
          }
          </script>
          <script
          src="https://www.chatbase.co/embed.min.js"
          chatbotId="fGYTLr-2s9l4WGUoy8eT1"
          domain="www.chatbase.co"
          defer>
          </script>
          
        </html>
      `}
      width="300"
      height="400"
      frameBorder="0"
     
    ></iframe>
  );
};

export default Chatbot;
