import React from "react";
import image from "../images/actor.png";

const Actor = () => {
  return (
    // actor card that consist of actor image and actor name below it
    <div className="flex-shrink-0">
      <img className="w-30 h-44 rounded-xl" src={image} alt={`Actor`} />
      <p className="text-sm text-center mt-2">Actor</p>
    </div>
  );
};

export default Actor;
