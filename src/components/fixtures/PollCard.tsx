"use client";

import { useState } from "react";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { colors } from "../../utils/colors";
import Button from "../Buttons";

interface PollCardProps {
  question: string;
  profileImage: string;
}

export default function PollCard({ question, profileImage }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-white w-full rounded-lg flex justify-between gap-3 shadow-sm border border-gray-100 p-4">
      <div className="w-full">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <img
                src={profileImage || "/src/assets/images/deciderImage.png"}
                alt="Profile"
                //   fill
                className="object-cover fill-current"
              />
            </div>
            <p className="font-normal text-base  text-gray-900">{question}</p>
          </div>
        </div>

        <div className="mt-4 w-full flex items-center justify-between gap-3">
          <button
            onClick={() => handleVote("Yes")}
            className={`w-full py-3 px-4 rounded-md text-center font-medium transition-colors ${
              selectedOption === "Yes"
                ? "bg-green-600 text-white-800"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleVote("No")}
            className={`w-full py-3 px-4 rounded-md text-center font-medium transition-colors ${
              selectedOption === "No"
                ? "bg-gray-300 text-gray-800"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <Button.Outline
          content={
            <div className="flex items-center space-x-2">
              <RiEdit2Line size={18} color={colors.grey700} />
              <p className="text-sm font-normal text-[#2A2E33]">Edit</p>
            </div>
          }
          className="w-[100px] cursor-pointer flex items-center"
          title=""
          // onClick={toggleUpdateModal}
        />
        <Button.Outline
          content={
            <div className="flex items-center space-x-2">
              <RiDeleteBin5Line size={18} color={colors.grey700} />
              <p className="text-sm font-normal text-[#2A2E33]">Delete</p>
            </div>
          }
          className="w-[100px] cursor-pointer flex items-center"
          title=""
          // onClick={toggleDeleteModal}
        />
      </div>
    </div>
  );
}
