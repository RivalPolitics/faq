// Автоматическая загрузка HTML контента из JS файлов
// Используем динамические импорты для загрузки контента

import { getAllSlugs, isValidSlug } from './config';

const contentCache = {};

// Функция для динамической загрузки контента
const loadContentModule = async (slug) => {
  try {
    const module = await import(`./content/${slug}.js`);
    return module.default;
  } catch (error) {
    console.error(`Не удалось загрузить контент для ${slug}:`, error);
    return `<p>❌ Контент не найден для: ${slug}</p>`;
  }
};

// Предзагрузка всех известных slug'ов
const preloadContent = async () => {
  const knownSlugs = getAllSlugs(); // Динамически получаем все slug'ы из конфигурации

  for (const slug of knownSlugs) {
    try {
      if (!contentCache[slug]) {
        const content = await loadContentModule(slug);
        contentCache[slug] = content;
      }
    } catch (error) {
      console.warn(`Не удалось предзагрузить контент для ${slug}:`, error);
    }
  }
};

// Запускаем предзагрузку
preloadContent();

// Основная функция для получения контента
export const getContent = (slug) => {
  // Возвращаем из кеша, если есть
  if (contentCache[slug]) {
    return contentCache[slug];
  }

  return `<p>❌ Контент не найден для: ${slug}</p>`;
};

// Асинхронная версия для динамической загрузки
export const loadContent = async (slug) => {
  // Если уже есть в кеше
  if (contentCache[slug]) {
    return contentCache[slug];
  }

  // Загружаем динамически
  const content = await loadContentModule(slug);
  contentCache[slug] = content; // Кешируем
  return content;
};

// Функция для регистрации нового контента (для разработки)
export const registerContent = (slug, content) => {
  contentCache[slug] = content;
};

// Получить список доступных slug'ов
export const getAvailableSlugs = () => {
  return Object.keys(contentCache);
};

// Функция для принудительной перезагрузки контента
export const reloadContent = async (slug) => {
  delete contentCache[slug];
  return await loadContent(slug);
}; 