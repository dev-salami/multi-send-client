import React from "react";

function Tab({ tab }: { tab: string }) {
  return (
    <div className="text-xs flex gap-2 items-center mb-2 px-2">
      <div className="flex gap-1 items-center ">
        <p
          className={`${
            tab === "form" ? "bg-[#00a7ff]" : "bg-green-500/50"
          }  rounded-full h-6 w-6 flex items-center justify-center`}
        >
          {tab > "form" ? <span>☑</span> : 1}
        </p>
        <span className="font-semibold text-[#00a7ff]">Form</span>
      </div>
      <div className="w-full border-b border-gray-500"></div>
      <div className="flex gap-1 items-center ">
        <p
          className={`${
            tab === "preview" ? "bg-[#00a7ff]" : "bg-green-500/50"
          }  rounded-full h-6 w-6 flex items-center justify-center`}
        >
          {tab > "preview" ? <span>☑</span> : 2}
        </p>
        <span className="font-semibold text-[#00a7ff]">Preview</span>
      </div>
      <div className="w-full border-b border-gray-500"></div>
      <div className="flex gap-1 items-center ">
        <p
          className={`${
            tab === "send" ? "bg-[#00a7ff]" : "bg-green-500/50"
          }  rounded-full h-6 w-6 flex items-center justify-center`}
        >
          {tab > "send" ? <span>☑</span> : 3}
        </p>
        <span className="font-semibold text-[#00a7ff]">Send</span>
      </div>
    </div>
  );
}

export default Tab;
