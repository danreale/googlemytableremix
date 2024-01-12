import { Link } from "@remix-run/react";
import { FaCrown } from "react-icons/fa/index.js";
export default function NavigationHeader() {
  return (
    <header>
      <h1 className=" grid justify-center items-center text-4xl text-center py-2 space-y-2 ">
        <div className="flex justify-center items-center text-center">
          <Link to="/">
            <label htmlFor="" className="text-[#4285f4]">
              G
            </label>
            <label htmlFor="" className="text-[#ea4335]">
              o
            </label>
            <label htmlFor="" className="text-[#fbbc05]">
              o
            </label>
            <label htmlFor="" className="text-[#4285f4]">
              g
            </label>
            <label htmlFor="" className="text-[#34a853]">
              l
            </label>
            <label htmlFor="" className="text-[#ea4335]">
              e
            </label>
            <label htmlFor="" className="text-green-700">
              {" "}
              My Table
            </label>
            <FaCrown className="mx-auto h-10 w-auto text-green-700" />
          </Link>
        </div>
      </h1>
    </header>
  );
}
