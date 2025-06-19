// Централизованная конфигурация для InfoBadge
// Одна точка входа для всех slug'ов

export const INFOBADGE_CONFIG = {
    microgoverments: {
        title: "Microgoverments",
        badge: "🌍 Microgoverments",
        slug: "microgoverments",
        color: "emerald",
        icon: "fa-globe"
    },
    forum: {
        title: "Форум",
        badge: "Форум",
        slug: "forum",
        color: "blue",
        icon: "fa-comments"
    },
    quorum: {
        title: "Кворум",
        badge: "Кворум",
        slug: "quorum",
        color: "fuchsia",
        icon: "fa-users"
    },
    applicant: {
        title: "Подать заявку",
        badge: "Подать заявку",
        slug: "applicant",
        color: "blue",
        icon: "fa-file-pen"
    }
};

// Получить все доступные slug'ы
export const getAllSlugs = () => Object.keys(INFOBADGE_CONFIG);

// Получить конфигурацию для конкретного slug'а
export const getSlugConfig = (slug) => INFOBADGE_CONFIG[slug];

// Проверить, существует ли slug
export const isValidSlug = (slug) => slug in INFOBADGE_CONFIG;

// Добавить новый slug (для динамического расширения)
export const addSlugConfig = (slug, config) => {
    INFOBADGE_CONFIG[slug] = config;
};

// Цветовые схемы
export const COLOR_CLASSES = {
    emerald: {
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200",
        modal: "border-emerald-200 bg-emerald-50"
    },
    blue: {
        badge: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
        modal: "border-blue-200 bg-blue-50"
    },
    fuchsia: {
        badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-200",
        modal: "border-fuchsia-200 bg-fuchsia-50"
    },
    purple: {
        badge: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
        modal: "border-purple-200 bg-purple-50"
    },
    red: {
        badge: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
        modal: "border-red-200 bg-red-50"
    }
}; 