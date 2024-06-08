import React, { useEffect } from "react";

const KommunicateChat = () => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "ed8be5ca0558184cf6add5c0ad7345e9",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);

      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default KommunicateChat;
