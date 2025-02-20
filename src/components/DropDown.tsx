import React from "react";

type DropDownProps = {
  cities: { name: string; latitude: string; longitude: string }[];
  citySelection: (city: {
    name: string;
    latitude: string;
    longitude: string;
  }) => void;
};

const DropDown: React.FC<DropDownProps> = ({ cities, citySelection }) => {
  return (
    <div className="dropdown">
      {cities.map((city, index) => (
        <p key={index} onClick={() => citySelection(city)}>
          <strong>{city.name}</strong> <br />
          <small>
            Lat: {city.latitude}, Lon: {city.longitude}
          </small>
        </p>
      ))}
    </div>
  );
};

export default DropDown;
