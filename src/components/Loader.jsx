import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center mt-2">
      <div className="border-t-2 border-blue-500 border-solid rounded-full animate-spin h-6 w-6"></div>
    </div>
  );
}

export default Loader;
