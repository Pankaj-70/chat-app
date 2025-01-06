import React from "react";

function Pattern() {
  const grid = Array.from({ length: 9 }, (_index, index) => index);
  return (
    <div className="flex flex-col w-[23rem] gap-4">
      <div className="grid grid-cols-3">
        {grid.map((item) => (
          <div
            key={item}
            className={`w-28 h-28 m-1 bg-primary/[0.15] rounded-xl shadow-lg flex items-center justify-center ${
              item % 2 == 0 ? "animate-pulse" : ""
            }`}
          ></div>
        ))}
      </div>
      <div className="mt-3 flex flex-col justify-around">
        <div className="font-serif text-center text-2xl font-bold text-gray-400">
          Join Our Community
        </div>
        <div className="text-center font-semibold text-gray-500 mt-3">
          Connect with friends, share moments and stay in touch with your loved
          ones
        </div>
      </div>
    </div>
  );
}

export default Pattern;
