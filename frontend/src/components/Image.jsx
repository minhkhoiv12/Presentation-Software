import React from "react";

const Image = ({ add_image }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
        (img, i) => (
          <div
            key={i}
            onClick={() => add_image("http://localhost:5173/pixora.png")}
            className="w-full h-[90px] overflow-hidden rounded-md cursor-pointer"
          >
            <img
              className="w-full h-full"
              src="http://localhost:5173/pixora.png"
              alt=""
            />
          </div>
        )
      )}
    </div>
  );
};
export default Image;
