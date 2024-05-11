import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [trips, setTrips] = useState([]);
  const [query, setQuery] = useState("");

  async function fetchTrips() {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${query}`
    );
    console.log("Response data:", response.data);
    if (response.data.data && Array.isArray(response.data.data)) {
      setTrips(response.data.data);
    }
  }

  useEffect(() => {
    fetchTrips();
  }, [query]);

  return (
    <div className="App mx-[120px] ibm-plex-sans-thai-regular">
      <h1 className="app-title text-4xl text-center font-bold text-blue-500 my-7">
        เที่ยวไหนดี
      </h1>
      <div>
        <h2 className="input-title block mx-10 my-4">ค้นหาที่เที่ยว</h2>
        <input
          className="block px-[378px] m-auto border-b-4 text-center"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </div>
      <div className="trip-list mt-8">
        {trips
          .filter((trip) => {
            if (query === "") {
              return true;
            } else if (
              trip.description.toLowerCase().includes(query.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .map((trip) => (
            <div className="trip" key={trip.eid || `trip-${Math.random()}`}>
              <div className="trip-large-photo">
                <img
                  className="float-left object-cover h-60 w-60 mx-6"
                  src={trip.photos[0]}
                />
              </div>
              <div className="trip-detail pb-[220px] leading-7">
                <h1 className="text-2xl font-semibold">{trip.title}</h1>
                <p className="truncate">{trip.description}</p>
                <a
                  href={trip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-1 text-blue-400"
                >
                  {" "}
                  อ่านต่อ
                </a>
                <div>
                  หมวด{" "}
                  <span className="font-semibold">
                    {trip.tags.slice(0, -1).join(" ")}
                    {trip.tags.length > 1 && " และ"} {trip.tags.slice(-1)}
                  </span>
                </div>
                <div>
                  {trip.photos.slice(1, 4).map((photo, index) => (
                    <img
                      key={index}
                      className="float-left object-cover h-20 w-20 mr-3"
                      src={photo}
                      alt={`Photo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
