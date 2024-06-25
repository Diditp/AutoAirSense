import { Switch } from "@mui/material";
import { useState, useEffect } from "react";
import database from "../database/firebase_database";
import { ref, update, onValue } from 'firebase/database';

export default function ({ imgSrc, name, description, imgAlt, mode }) {
  const [relayState, setRelayState] = useState(1);
  const [exhaustStatus, setExhaustStatus] = useState('Hidup'); // Atur ke 'Hidup' di awal

  const writeDataToFirebase = () => {
    const dataLogger = {
      relayState: relayState
    }
    update(ref(database, 'dataLogger'), dataLogger);
  };

  useEffect(() => {
    const dataLogger = ref(database, "dataLogger");
    onValue(dataLogger, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setExhaustStatus(data.exhaustStatus);
      }
    });
  }, []);

  function modeOnSwitch() {
    if (relayState === 0) {
      setRelayState(1);
      setExhaustStatus('Hidup'); // Saat relay hidup, atur status ke 'Hidup'
      writeDataToFirebase();
    } else {
      setRelayState(0);
      setExhaustStatus('Mati'); // Saat relay mati, atur status ke 'Mati'
      writeDataToFirebase();
    }
  }

  return (
    <>
      <div className="bg-white box-shadow w-11/12 md:room-card min-width my-5 mr-5">
        <img className="bg-cover w-full h-64 md:h-1/2" src={imgSrc} alt={imgAlt} />
        <div className="flex items-center justify-between h-20 w-full p-2 tool-middle">
          <div className="flex-col">
            <h4 className="font-medium">{name.toUpperCase()}</h4>
            {name === 'Exhaust Fan' ? <h2>Status: {exhaustStatus}</h2> : null}
          </div>

          {name === 'Exhaust Fan' ? (
            <div>
              <button>Controller</button>
              {mode === 0 ? <Switch onChange={modeOnSwitch} /> : <Switch disabled />}
            </div>
          ) : null}

        </div>
        <div className="p-3 min-h-fit sm:p-5 tool-footer md:tool-footer flex justify-end">
          <p className="text-justify md:text-center text-sm md:text-base">
            {description}
          </p>
        </div>
      </div >
    </>
  );
}
