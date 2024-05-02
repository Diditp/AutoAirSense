import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faWind, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';

const SensorCard = ({ type, icon, data, description }) => {

  const getIconBySensorType = (sensorType) => {
    switch (icon) {
      case 'temperature':
        return faTemperatureHigh;
      case 'wind':
        return faWind;
      case 'humidity':
        return faTint;
      case 'dust':
        return faCloud;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white ww-200 mt-5">
      <div className="sensor-card flex items-center mb-1 box-shadow">
        <div className="sm:w-1/2 w-52 hh-70 sensor-card flex justify-center items-center">
          <FontAwesomeIcon size='xl' icon={getIconBySensorType(icon)} color='white' />
        </div>
        <div className="sm:w-1/2 w-52 hh-70 sensor-card-right flex flex-col items-center justify-center">
          <div className="text-2xs font-semibold">{type}</div>
          <div className="text-1xl ">{data}</div>
        </div>
      </div>
      <div className="text-gray-600 round text-center">
        {description}
      </div>
    </div>
  );
};

export default SensorCard;
