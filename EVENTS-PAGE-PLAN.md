# План: Страница "Event решения" для GoQode

## Цель
Создать полноценную страницу Event решения, демонстрирующую полный цикл event-менеджмента: сайт для продажи билетов, QR-билеты, check-in система, аналитика.

## Текущее состояние
- **Готово:** Hero секция + 3D Lanyard анимация (~25%)
- **Файлы:** `/app/[locale]/events/page.tsx`, `/components/events/EventsHero.tsx`, `/components/events/Lanyard.tsx`

---

## Секции для реализации

### 1. EventFlowSection (визуальный flow)
**Концепция:** Горизонтальная цепочка этапов с анимацией
```
[Сайт] → [QR-билеты] → [Check-in] → [Аналитика] → [Пост-анализ]
```
- 5 этапов с pulse-анимацией точек
- Mobile: вертикальный stack

---

### 2. EventServicesSection (accordion)
**Паттерн:** SolutionOverview из `/app/[locale]/launch/page.tsx`

| # | Услуга | Ключевые функции |
|---|--------|------------------|
| 1 | Сайт мероприятия | Landing page, интеграция платежей, корзина, промокоды |
| 2 | QR-билеты | Генерация уникальных кодов, email рассылка, PDF билеты |
| 3 | Check-in система | Scanner app, real-time dashboard, offline режим |
| 4 | Аналитика | Reports, dashboards, export, real-time метрики |
| 5 | Доп. сервисы | Email рассылки, напоминания, опросы, сертификаты |

---

### 3. TicketDemoSection (интерактивный билет)
**Концепция:** 3D карточка билета с QR-кодом
- Hover эффект: анимация сканирования (зеленая линия)
- Информация: название события, дата, место, уникальный код
- Framer Motion для 3D transform

---

### 4. EventDashboardSection (preview дашборда)
**Паттерн:** ContainerScroll анимация
- Mockup интерфейса с графиками продаж билетов
- Real-time счетчик check-ins
- Статистика посещаемости по времени
- Демографика участников

---

### 5. EventResultsSection (метрики)
**Паттерн:** ResultsSection из launch page с CountUp анимацией

| Иконка | Число | Суффикс | Описание |
|--------|-------|---------|----------|
| CalendarDays | 100 | + | Проведенных мероприятий |
| Users | 50000 | + | Зарегистрированных участников |
| QrCode | 99.9 | % | Точность сканирования |

---

### 6. EventProcessSection (процесс работы)
**Паттерн:** 4 шага с horizontal scroll на desktop, vertical stack на mobile

| Шаг | Название | Описание |
|-----|----------|----------|
| 1 | Brief | Понимание формата и требований мероприятия |
| 2 | Setup | Настройка сайта, платежей и QR-системы |
| 3 | Event Day | Проведение, check-in, live monitoring |
| 4 | Analysis | Отчеты, финансовая сводка, рекомендации |

---

### 7. EventCTASection (call to action)
**Паттерн:** LaunchCTA с CalendarDays иконкой
- Lime green (#C9FD48) карточка
- Hover эффект с двумя текстами
- Анимированная иконка
- Контактный email: hello@goqode.dev

---

## Файловая структура

```
/components/events/
├── EventsHero.tsx           [существует]
├── Lanyard.tsx              [существует]
├── EventFlowSection.tsx     [создать]
├── EventServicesSection.tsx [создать]
├── TicketDemoSection.tsx    [создать]
├── EventDashboardSection.tsx [создать]
├── EventResultsSection.tsx  [создать]
├── EventProcessSection.tsx  [создать]
└── EventCTASection.tsx      [создать]

/app/[locale]/events/
└── page.tsx                 [обновить - добавить все секции]

/messages/
├── en.json                  [дополнить Events namespace]
├── ro.json                  [дополнить Events namespace]
└── ru.json                  [дополнить Events namespace]
```

---

## Структура страницы (page.tsx)

```tsx
export default function EventsPage() {
  return (
    <main className="min-h-screen w-full">
      <div className="relative">
        <EventsHero />
        <div className="absolute inset-0 z-20">
          <Lanyard />
        </div>
      </div>
      <EventFlowSection />
      <EventServicesSection />
      <TicketDemoSection />
      <EventDashboardSection />
      <EventResultsSection />
      <EventProcessSection />
      <EventCTASection />
    </main>
  );
}
```

---

## Порядок реализации

### Фаза 1: Основной контент
1. `EventServicesSection.tsx` — accordion с 5 услугами
2. `EventResultsSection.tsx` — метрики с CountUp
3. Обновить `page.tsx` — добавить секции
4. Добавить переводы в `/messages/en.json`

### Фаза 2: Визуальные компоненты
5. `EventFlowSection.tsx` — визуальный flow процесса
6. `TicketDemoSection.tsx` — интерактивный билет
7. `EventCTASection.tsx` — call to action

### Фаза 3: Сложные компоненты
8. `EventDashboardSection.tsx` — dashboard mockup
9. `EventProcessSection.tsx` — процесс с horizontal scroll

### Фаза 4: Финализация
10. Переводы для ro и ru локалей
11. Responsive тестирование (375px, 768px, 1920px)
12. Оптимизация анимаций (reduce motion)

---

## Технические требования

### Design System (CLAUDE.MD)
- Horizontal padding: `clamp-[px,12,24]`
- Vertical padding: `clamp-[py,24,48]`
- Gap: `clamp-[gap,16,32]`
- Typography: `clamp-[text,...]`
- Акцентный цвет: `#C9FD48`

### Анимации
- Framer Motion variants (container, itemVariant)
- Stagger children: 0.1s
- CountUp для чисел
- AnimatedPlusX для accordion

### Иконки (Lucide)
- CalendarDays — события
- QrCode — билеты
- ScanLine — check-in
- BarChart3 — аналитика
- Mail — рассылки
- Users — участники
- Ticket — билеты
- CheckCircle — валидация
- ArrowRight — CTA

---

## Критические файлы для референса

| Файл | Использование |
|------|---------------|
| `/app/[locale]/launch/page.tsx` | Паттерн SolutionOverview, ResultsSection, CTA |
| `/components/ProcessSection.tsx` | Паттерн horizontal scroll |
| `/components/ui/container-scroll-animation.tsx` | Для dashboard preview |
| `/components/SolutionsSection.tsx` | Card паттерны |

---

## Верификация

1. Запустить `npm run dev`
2. Проверить страницы:
   - `/en/events`
   - `/ro/events`
   - `/ru/events`
3. Тестировать viewport: 375px, 768px, 1440px, 1920px
4. Проверить:
   - Анимации и hover эффекты
   - Accordion открытие/закрытие
   - CountUp срабатывание при scroll
   - 3D билет интерактивность
   - Lanyard физика
5. Lighthouse: Performance > 90
