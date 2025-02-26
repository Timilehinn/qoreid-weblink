import { useEffect, useState } from "react";
import "./App.css";

var keys = [
  'customer_id',
  'firstname',
  'lastname',
  'email',
  'phone'
] as const;

type DefaultState = { [K in (typeof keys)[number]]: string };

const defaultState: DefaultState = Object.fromEntries(
  keys.map(key => [key, ""])
) as DefaultState;

function App() {

  const params = new URLSearchParams(window.location.search);
  const [ config, setConfig ] = useState<DefaultState>(defaultState)

  useEffect(() => {
    var data: any = {};
    keys.map(key => {
      data[key] = params.get(key);
    });
    setConfig(data);
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
    {JSON.stringify(config)}
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <qoreid-button
            id="QoreIDButton"
            flowId="${import.meta.env.VITE_FLOW_ID}"
            clientId="${import.meta.env.VITE_CLIENT_ID}"
            productCode="liveness_nin"
            customerReference="${config.customer_id}"
            applicantData='{"firstname": "${config.firstname}", "lastname": "${config.lastname}", "phone": "${config.phone}", "email": "${config.email}"}'
          ></qoreid-button>
          `,
        }}
      />
    </>
  );
}

export default App;
