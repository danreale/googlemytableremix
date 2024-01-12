import { FaArrowCircleLeft } from "react-icons/fa/index.js";
import { useNavigate } from "@remix-run/react";

export default function BackToPageButton({ text }: { text: string }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <>
      <div className="flex justify-center">
        <button onClick={goBack} className="flex justify-center items-center">
          <FaArrowCircleLeft className=" text-green-700" />
          {text}
        </button>
      </div>
    </>
  );
}
