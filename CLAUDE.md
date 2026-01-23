# Claude Rules для GoQodeDev

## Fluid Design System

### Viewport диапазон
- **Min:** 375px (iPhone)
- **Max:** 1920px (точка остановки, дальше фиксированные значения)

### Конфигурация tailwind-clamp
```css
@plugin "tailwind-clamp" {
  minSize: 23.4375rem;   /* 375px */
  maxSize: 120rem;       /* 1920px */
}
```

---

## Отступы (Spacing)

### Горизонтальные отступы контейнера
| Viewport | Значение |
|----------|----------|
| 375px | 12px |
| 1920px+ | 24px |

**Класс:** `clamp-[px,12,24]`

### Вертикальные отступы секций
| Viewport | Значение |
|----------|----------|
| 375px | 24px |
| 1920px+ | 48px |

**Класс:** `clamp-[py,24,48]`

### Gap между элементами
- Маленький: `clamp-[gap,8,16]`
- Средний: `clamp-[gap,16,32]`
- Большой: `clamp-[gap,24,48]`

---

## Типографика

### Размеры шрифтов
| Элемент | Mobile | Desktop | Класс |
|---------|--------|---------|-------|
| Hero | 32px (2rem) | 80px (5rem) | `clamp-[text,2rem,5rem]` |
| H1 | 28px (1.75rem) | 64px (4rem) | `clamp-[text,1.75rem,4rem]` |
| H2 | 24px (1.5rem) | 48px (3rem) | `clamp-[text,1.5rem,3rem]` |
| H3 | 20px (1.25rem) | 32px (2rem) | `clamp-[text,1.25rem,2rem]` |
| H4 | 18px (1.125rem) | 24px (1.5rem) | `clamp-[text,1.125rem,1.5rem]` |
| Body | 16px (1rem) | 20px (1.25rem) | `clamp-[text,1rem,1.25rem]` |
| Small | 14px (0.875rem) | 16px (1rem) | `clamp-[text,0.875rem,1rem]` |
| Caption | 12px (0.75rem) | 14px (0.875rem) | `clamp-[text,0.75rem,0.875rem]` |

### Line Height
- Заголовки: `leading-tight` (1.25)
- Текст: `leading-relaxed` (1.625)

---

## Структура компонентов

### Базовая секция
```tsx
<section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
  {/* контент */}
</section>
```

### Секция с заголовком
```tsx
<section className="w-full clamp-[px,12,24] clamp-[py,24,48]">
  <h2 className="clamp-[text,1.5rem,3rem] font-semibold leading-tight">
    Заголовок секции
  </h2>
  <p className="clamp-[text,1rem,1.25rem] leading-relaxed mt-4">
    Описание секции
  </p>
</section>
```

### Grid layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 clamp-[gap,16,32]">
  {/* items */}
</div>
```

---

## Запрещено

1. **НЕ использовать фиксированные max-width** для контейнеров:
   - `max-w-3xl`, `max-w-4xl`, `max-w-7xl` и т.д.

2. **НЕ использовать фиксированные padding/margin** для основных контейнеров:
   - `px-4`, `px-8`, `py-16`, `py-32` — только для внутренних элементов

3. **НЕ центрировать контейнеры** через `mx-auto` на верхнем уровне

---

## Разрешено

1. **Использовать clamp-[...]** для всех fluid значений
2. **Использовать фиксированные размеры** для:
   - Иконки
   - Кнопки (высота)
   - Мелкие UI элементы
3. **Использовать breakpoints** для изменения layout:
   - `sm:`, `md:`, `lg:`, `xl:` — для grid columns, flex direction

---

## Цветовая схема

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Tailwind классы
- Фон: `bg-white dark:bg-black` или `bg-zinc-50 dark:bg-zinc-950`
- Текст основной: `text-black dark:text-zinc-50`
- Текст вторичный: `text-zinc-600 dark:text-zinc-400`

---

## Шрифты

- **Sans:** Manrope Variable (`font-sans`)
- Подключен через `next/font/google` с subsets: `latin`, `cyrillic`

---

## Мультиязычность (i18n)

### Библиотека: next-intl

### Локали
- **ro** — Румынский (по умолчанию)
- **en** — Английский
- **ru** — Русский

### Структура файлов
```
/i18n/
  routing.ts     # Конфигурация локалей
  request.ts     # Server-side config
/messages/
  ro.json        # Румынские переводы
  en.json        # Английские переводы
  ru.json        # Русские переводы
/app/[locale]/
  layout.tsx     # Layout с NextIntlClientProvider
  page.tsx       # Страницы с useTranslations
proxy.ts         # Middleware для роутинга
```

### Использование переводов
```tsx
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("Namespace");

  return <h1>{t("key")}</h1>;
}
```

### Формат messages/*.json
```json
{
  "Namespace": {
    "key": "Текст перевода",
    "nested": {
      "key": "Вложенный текст"
    }
  }
}
```

### Ссылки между страницами
```tsx
import { Link } from "@/i18n/navigation";

<Link href="/about">О нас</Link>
```

---

## Примеры готовых паттернов

### Hero секция
```tsx
<section className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center clamp-[px,12,24]">
  <h1 className="clamp-[text,2rem,5rem] font-bold leading-tight text-black dark:text-white">
    Главный заголовок
  </h1>
  <p className="clamp-[text,1rem,1.25rem] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-6">
    Описание или подзаголовок
  </p>
</section>
```

### Карточка
```tsx
<div className="clamp-[p,16,32] bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
  <h3 className="clamp-[text,1.25rem,2rem] font-semibold">Заголовок</h3>
  <p className="clamp-[text,0.875rem,1rem] text-zinc-600 dark:text-zinc-400 mt-2">
    Описание карточки
  </p>
</div>
```

### Кнопка
```tsx
<button className="h-12 clamp-[px,20,32] rounded-full bg-foreground text-background font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200">
  Действие
</button>
```
