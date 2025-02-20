import React, { useState } from "react";
import DropDown from "./DropDown";

const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { name: string; latitude: string; longitude: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    latitude: string;
    longitude: string;
  } | null>(null);

  /**
   * Fetch city suggestions
   */
  const fetchCities = async (search: string) => {
    if (search.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}&addressdetails=1`
      );
      const data = await response.json();

      setSuggestions(
        data.map((item: any) => ({
          name: item.display_name,
          latitude: item.lat,
          longitude: item.lon,
        }))
      );
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const citySelection = (city: {
    name: string;
    latitude: string;
    longitude: string;
  }) => {
    setSelectedLocation(city);
    setShowDropDown(false);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <>
      <div className="announcement">
        <div>
          {selectedLocation
            ? `Your adress is: ${selectedLocation.name} (Lat: ${selectedLocation.latitude}, Lon: ${selectedLocation.longitude})`
            : "Select your address"}
        </div>
      </div>
      <div className="dropdown-container">
        <input
          type="text"
          value={query}
          placeholder="Search for an adress..."
          onChange={(e) => {
            setQuery(e.target.value);
            fetchCities(e.target.value);
          }}
          onFocus={() => setShowDropDown(true)}
        />
        {showDropDown && suggestions.length > 0 && (
          <DropDown cities={suggestions} citySelection={citySelection} />
        )}
      </div>
    </>
  );
};

export default Menu;
