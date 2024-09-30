import React, { useEffect, useState } from "react";
import Card from "./Card";

const DramaList = () => {
  const [dramas, setDramas] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch("/dramas")
      .then(response => response.json())
      .then(data => setDramas(data))
      .catch(error => console.error("Error fetching dramas:", error));
  }, []);

  return (
    <div className="">
      {dramas.map(drama => (
        <Card key={drama.id} drama={drama} />
      ))}
    </div>
  );
};

export default DramaList;
