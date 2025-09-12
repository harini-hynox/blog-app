

function Card({ image, name, duration }) {
  return (
    <div className="w-[40%] p-4  rounded-2xl shadow-md text-center h-[45%] bg-[#cdd6f6]">
        <div className="flex flex-col items-center h-[75%] ">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className=" object-cover rounded-xl w-[80%] p-[8%] "
      />

      {/* Name */}
      <h2 className="text-lg font-semibold">{name}</h2>

      {/* Duration */}
      <p className="text-gray-600">{duration}</p>
      </div>
    </div>
  );
}

export default Card;
