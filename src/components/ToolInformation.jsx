import { Switch } from "@mui/material";
import { useState } from "react";
export default function ({ imgSrc, name, description, imgAlt, status }) {
  const [relayState, setRelayState] = useState(0);

  function modeOnSwitch() {
    if (relayState == 0) {
      setRelayState(1);
    } else {
      setRelayState(0);
    }
  }
  return (
    <>
      <div className="bg-white box-shadow w-11/12 md:room-card min-width my-5 mr-5">
        <img className="bg-cover w-full h-64 md:h-1/2" src={imgSrc} alt={imgAlt} />
        <div className="flex items-center justify-between h-20 w-full p-2 bg-blue-200">
          <div className="flex-col">
            <h4 className="font-medium">{name.toUpperCase()}</h4>
            {name == 'Exhaust Fan' ? <h2>Status: {relayState == 0 ? 'OFF' : 'ON'}</h2> : < div ></div>}
          </div>

          {name == 'Exhaust Fan' ? <div>
            <button>Controller</button>
            <Switch onChange={modeOnSwitch} />
          </div> : < div ></div>}

        </div>
        <div className="p-3 min-h-fit sm:p-5 bg-slate-200 md:bg-white flex justify-end">
          <p className="text-justify md:text-center text-sm md:text-base">
            {description}
          </p>
        </div>
      </div >
    </>
  );
}
