"use client";
import {
    useAccount,
    useDisconnect,
    useStarkProfile,
} from "@starknet-react/core";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GenericModal from "./GenericModal";

const AddressBar = () => {
    const { address } = useAccount();
    const { data: starkProfile } = useStarkProfile({
        address,
    });

    const { disconnect } = useDisconnect();

    if (!address) {
        return null;
    }

    return (
        <button
            onClick={() => disconnect()}
            className="w-[12.5rem] h-14 grid py-2 px-[1.25rem]
          place-items-center rounded-2xl gap-2 text-textPrimary
          font-medium text-base bg-transparent font-roboto border-gray-500 border"
        >
            <span>
                {address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
            </span>
        </button>
    );
};

export default AddressBar;
