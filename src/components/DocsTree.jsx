import React from 'react';
import tree from '../../static/docs-tree.json';
import Link from '@docusaurus/Link';

function findScope(tree, scope) {
    if (!scope || scope === '') return tree;
    const parts = Array.isArray(scope) ? scope : scope.split('/');
    let current = tree;
    for (const part of parts) {
        const found = current.find(item => item.type === 'folder' && item.title === part);
        if (!found) return [];
        current = found.children;
    }
    return current;
}

function renderTree(subtree, level = 0) {
    if (!subtree) return null;
    return (
        <ul className={`relative ml-${level === 0 ? 0 : 8} pl-4 border-l border-gray-200 dark:border-gray-700`}>
            {subtree.map((item, idx) => (
                <li key={item.title + idx} className="relative flex flex-col">
                    <div className="flex items-center group">
                        {level > 0 && (
                            <span
                                className="absolute h-0.5 bg-[#dddddd] dark:bg-gray-700"
                                style={{
                                    width: `${level * 12}px`,
                                    left: `${level * -16}px`
                                }} />
                        )}
                        {item.type === 'folder' ? (
                            <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm mb-1 flex items-center">
                                <i className="fa-solid fa-folder-tree mr-2 !text-[10px] text-gray-400" />
                                {item.emoji} {item.title}
                            </span>
                        ) : (
                            <Link
                                href={item.url}
                                className="transition-colors text-[13px] text-[#346a82] hover:text-[#509dbe] font-medium py-0.5 pl-1 flex items-center"
                            >
                                <span className="mr-1">{item.emoji}</span> {item.title}
                                <span className="fa-solid fa-arrow-up-right-from-square ml-1 text-[10px] opacity-60 transition-opacity" />
                            </Link>
                        )}
                    </div>
                    {item.children && renderTree(item.children, level + 1)}
                </li>
            ))}
        </ul>
    );
}

export default function DocsTree({ scope = '' }) {
    const scopedTree = findScope(tree, scope);
    return (
        // bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm mt-4 mb-6 text-xs max-w-2xl mx-auto
        <div className="bg-white border-solid rounded-[10px] p-[15px] border-[#dfdfdf]">
            <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300 text-[16px] font-semibold">
                <i className="fa-solid fa-route mr-2 text-emerald-600" />
                Гид по разделу:
            </div>
            {renderTree(scopedTree)}
        </div>
    );
} 