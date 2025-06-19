# InfoBadge

InfoBadge — независимый компонент для бейджа с модалкой и лоадером. Каждый экземпляр полностью изолирован и не требует глобального провайдера или стора.

## Основные возможности

- Hover — запускает loader, через 1 сек. фиксируется (pinned)
- Click — сразу фиксирует (pinned)
- Mouseleave (если не pinned) — сбрасывает в idle
- Клик вне или по крестику — сбрасывает в idle
- Loader всегда работает корректно, любое количество InfoBadge на странице
- Нет глобального контекста, нет багов с порталами

## Использование

```jsx
import InfoBadge from './InfoBadge';

<InfoBadge slug="microgoverments" />
```

## Пример

```jsx
<InfoBadge slug="microgoverments" />
<InfoBadge slug="forum" />
```

## Стилизация и конфиг

- Все цвета, иконки и контент настраиваются через config.js и contentLoader.js
- Для добавления нового бейджа — добавьте slug в config.js и соответствующий контент

## Важно

- Не требуется оборачивать в провайдер
- Каждый InfoBadge полностью независим
- Можно использовать в любом месте приложения, в том числе в MDX

## Структура файлов

```
src/components/InfoBadge/
├── content/
│   ├── microgoverments.js
│   ├── economy.js
│   ├── diplomacy.js
│   └── war.js
├── config.js              # 🎯 Централизованная конфигурация
├── contentLoader.js
├── index.jsx
└── README.md
```

## Как редактировать контент

### 1. Редактирование существующего контента

Откройте нужный JS файл в папке `content/` и редактируйте HTML в template literal:

- `microgoverments.js` - контент для бейджа "Микрогосударства"
- `economy.js` - контент для бейджа "Экономика"  
- `diplomacy.js` - контент для бейджа "Дипломатия"
- `war.js` - контент для бейджа "Война"

**Формат файла:**
```javascript
export default `
<p>Ваш HTML контент здесь</p>
<div class="tailwind-classes">
  <!-- Больше HTML -->
</div>
`;
```

### 2. Добавление нового slug'а

1. **Создайте JS файл** в папке `content/`:
   ```bash
   touch src/components/InfoBadge/content/newslug.js
   ```

2. **Добавьте HTML контент** в новый файл:
   ```javascript
   export default `
   <p>Описание нового раздела.</p>
   <div class="mt-3 space-y-2">
     <div class="flex items-center gap-2">
       <i class="fa-solid fa-star text-yellow-500"></i>
       <span class="text-sm font-medium">Особенность 1</span>
     </div>
   </div>
   `;
   ```

3. **Обновите config.js** - добавьте новый slug в `INFOBADGE_CONFIG`:
   ```javascript
   // В файле config.js
   export const INFOBADGE_CONFIG = {
     // ... существующие slug'ы
     newslug: {
       title: "🎯 Новый раздел",
       badge: "Новый раздел",
       color: "emerald" // emerald, blue, purple, red
     }
   };
   ```

4. **Все остальное работает автоматически!** - contentLoader и компонент подхватят новый slug из конфигурации

### 3. Доступные Tailwind классы

Используйте любые Tailwind классы для стилизации:

- **Цвета**: `text-red-500`, `bg-blue-100`, `border-green-200`
- **Размеры**: `text-sm`, `text-lg`, `w-full`, `h-10`
- **Отступы**: `p-2`, `m-4`, `px-3`, `py-1`
- **Flexbox**: `flex`, `items-center`, `justify-center`
- **Иконки**: `fa-solid fa-star` (Font Awesome)

### 4. Примеры HTML структур

#### Простой список с иконками:
```html
<p>Основное описание.</p>
<div class="mt-3 space-y-2">
  <div class="flex items-center gap-2">
    <i class="fa-solid fa-check text-green-500"></i>
    <span class="text-sm font-medium">Пункт 1</span>
  </div>
  <div class="flex items-center gap-2">
    <i class="fa-solid fa-star text-yellow-500"></i>
    <span class="text-sm font-medium">Пункт 2</span>
  </div>
</div>
```

#### Карточка с изображением:
```html
<div class="relative rounded-lg overflow-hidden">
  <img src="/img/example.png" alt="Пример" class="w-full h-32 object-cover" />
  <div class="absolute inset-0 bg-black/30"></div>
  <div class="absolute bottom-2 left-2 text-white">
    <h4 class="font-bold">Заголовок</h4>
    <p class="text-sm">Описание</p>
  </div>
</div>
```

### 5. Преимущества новой структуры

✅ **Централизованная конфигурация** - все slug'ы в одном файле `config.js`  
✅ **Автоматическая загрузка** - контент загружается автоматически из JS файлов  
✅ **Нет дублирования** - HTML код хранится только в одном месте  
✅ **Одна точка входа** - добавили slug в config.js и все работает  
✅ **Подсветка синтаксиса** - VS Code подсвечивает HTML в template literals  
✅ **Динамическое расширение** - легко добавлять новые slug'ы  
✅ **Кеширование** - контент кешируется для быстрой работы

### 6. Централизованное управление

**config.js** - единая точка конфигурации:
- Список всех доступных slug'ов
- Настройки бейджей (название, цвет, иконка)
- Цветовые схемы
- Валидация slug'ов

**Больше не нужно:**
- ❌ Дублировать списки slug'ов в разных файлах
- ❌ Помнить, где что обновлять
- ❌ Синхронизировать изменения между файлами 