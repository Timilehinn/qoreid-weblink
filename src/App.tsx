import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dashboard.qoreid.com/qoreid-sdk/qoreid.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `
     <qoreid-button
            id="QoreIDButton"
            flowId="1142"
            clientId="5QZ78WT9TUH74NVZY8OL"
            productCode="liveness_nin"
            customerReference="fsdfsdf"
            applicantData='{"firstname": "John", "lastname": "Doe", "phone": "08080808080", "email": "jon@nomail.com"}'
          ></qoreid-button>
          `,
        }}
      />
    </>
  );
}

export default App;
