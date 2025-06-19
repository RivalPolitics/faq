import React from "react";

/**
 * Базовый блок-список с заголовком, описанием и элементами
 * @param {string} title — жирный заголовок сверху
 * @param {React.ReactNode} description — описание под заголовком (может быть JSX/HTML)
 */
export default function ListBlock({ title, description }) {
    return (
        <div className="bg-white">
            <div className="font-bold text-gray-800 dark:text-gray-100 text-base mb-1">
                <i className="fa-solid fa-circle !text-[5px] align-middle mr-2" />
                {title}
            </div>
            {description && (
                <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {description}
                </div>
            )}
        </div>
    );
} 