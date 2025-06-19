const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.join(__dirname, '../docs');
const OUTPUT = path.join(__dirname, '../static/docs-tree.json');

function parseFrontmatter(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const fmMatch = content.match(/^---([\s\S]*?)---/);
    if (!fmMatch) return {};
    const fm = fmMatch[1];
    const slug = fm.match(/slug:\s*"([^"]+)"/);
    const title = fm.match(/title:\s*"([^"]+)"/);
    return {
        slug: slug ? slug[1] : undefined,
        title: title ? title[1] : undefined
    };
}

function buildTree(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const folders = [];
    const files = [];
    for (const item of items) {
        if (item.name.startsWith('.')) continue;
        const absPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            // Title для папки из README.md(x)
            let readme = null;
            if (fs.existsSync(path.join(absPath, 'README.mdx'))) readme = path.join(absPath, 'README.mdx');
            else if (fs.existsSync(path.join(absPath, 'README.md'))) readme = path.join(absPath, 'README.md');
            let title = item.name;
            if (readme) {
                const meta = parseFrontmatter(readme);
                if (meta.title) title = meta.title;
            }
            folders.push({
                type: 'folder',
                title,
                children: buildTree(absPath)
            });
        } else if (
            item.isFile() &&
            (item.name.endsWith('.md') || item.name.endsWith('.mdx')) &&
            !/^readme\.mdx?$/i.test(item.name)
        ) {
            const meta = parseFrontmatter(absPath);
            // Emoji — первые символы до пробела, если есть
            let base = item.name.replace(/\.(md|mdx)$/, '');
            let title = meta.title || base;
            const emoji = title.match(/^([\p{Emoji}\p{So}\p{Sc}\p{Sk}\p{Sm}\p{P}]+) /u)?.[1] || undefined;
            let url = meta.slug || absPath
                .replace(DOCS_ROOT, '')
                .replace(/\\/g, '/')
                .replace(/ /g, '%20')
                .replace(/\.mdx?$/, '');

            url = '/docs' + url;

            files.push({
                type: 'file',
                title,
                ...(emoji ? { emoji } : {}),
                url
            });
        }
    }
    return [...folders, ...files];
}

const tree = buildTree(DOCS_ROOT);
fs.writeFileSync(OUTPUT, JSON.stringify(tree, null, 2), 'utf8');
console.log('Docs tree generated!'); 