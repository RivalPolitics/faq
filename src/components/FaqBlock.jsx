import React from 'react';

export default function FaqBlock({ items }) {
    return (
        <div className="space-y-4">
            {items.map((item, idx) => (
                <details key={idx} className="bg-[#e1e1e1] dark:bg-gray-800 rounded p-3 group border-[1.4px] border-[#d9d9d9] dark:border-gray-700 select-none">
                    <summary className="font-semibold cursor-pointer text-[15px] flex items-center group-open:text-emerald-700 transition-colors">
                        <i className="fa-solid fa-circle-question text-emerald-600 mr-2 text-xs" />
                        {item.question}
                    </summary>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                        {item.answer}
                    </div>
                </details>
            ))}
        </div>
    );
} 