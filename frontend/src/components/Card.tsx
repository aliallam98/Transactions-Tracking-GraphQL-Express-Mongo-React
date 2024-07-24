import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

interface IProps {
  transactionType: "saving" | "expense" | "investment"
}

const Card = ({transactionType}:IProps) => {
  const [loading] = useState(false);

  const handleDelete = ()=>{}
  return (
    <div
      className={cn("rounded-md p-4 bg-gradient-to-br bg-white/10",
      transactionType === "saving" && categoryColorMap.saving,
      transactionType === "expense" && categoryColorMap.expense,
      transactionType === "investment" && categoryColorMap.investment,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{"category"}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${"transaction._id"}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {"description"}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {"paymentType"}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${"amount"}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {"location" || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{"formattedDate"}</p>
          <img
            // src={authUser?.profilePicture}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
