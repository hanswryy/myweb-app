// import React from "react";
// import image from "../images/actor.png";

// const Actor = () => {
//   return (
//     // actor card that consist of actor image and actor name below it
//     <div className="flex-shrink-0">
//       <img className="w-30 h-44 rounded-xl" src={image} alt={`Actor`} />
//       <p className="text-sm text-center mt-2">Actor</p>
//     </div>
//   );
// };

// export default Actor;
import React from "react";

const Actor = ({ name, photo }) => {
  return (
    // Actor card that consists of actor image and actor name below it
    <div className="flex-shrink-0">
      <img
        className="w-30 h-44 rounded-xl"
        src={photo} // Gunakan URL foto aktor, jika tidak ada gunakan gambar placeholder
        alt={`Actor`}
      />
      <p className="text-sm text-center mt-2">{name}</p> {/* Tampilkan nama aktor */}
    </div>
  );
};

export default Actor;
