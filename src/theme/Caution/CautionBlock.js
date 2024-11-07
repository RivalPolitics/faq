import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

const CautionBlock = ({ children }) => {
  return (
    <div
      class="flex p-4 mb-4 text-sm text-yellow-600 rounded-lg bg-yellow-100/35 border-solid border-[0.5px] border-yellow-500"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Danger</span>
      <div>
        <span class="font-medium text-[15px]">Внимание!</span>
        <div class="mt-[5px]">{children}</div>
      </div>
    </div>
  );
};

export default CautionBlock;
