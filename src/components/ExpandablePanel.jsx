import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="mb-2 border rounded bg-gray-50 hover:bg-gray-100">
        <div className="flex p-2 justify-between items-center ">
          <div className="flex flex-row items-center justify-between ">
            {header}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <GoChevronDown className="size-8" />
            ) : (
              <GoChevronLeft className="size-8" />
            )}
          </div>
        </div>
        {expanded && <div className="p-2 border-t">{children}</div>}
      </div>
    </>
  );
}

export default ExpandablePanel;
