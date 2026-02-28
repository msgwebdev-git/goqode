# Живой чат с интеграцией Telegram

## Контекст

GoQodeDev нужен кастомный виджет живого чата на сайте. Посетители пишут сообщения в чат-виджете, сообщения пересылаются в выделенную Telegram-группу, админ отвечает прямо из Telegram. Ответы появляются в чате посетителя в реальном времени через SSE.

**Выбор:** SSE для real-time, форма только с именем, отдельная Telegram-группа (`TELEGRAM_LIVE_CHAT_ID`).

## Архитектура

```
Посетитель (Браузер)                 Админ (Telegram)
     |                                      |
     | POST /api/chat/messages              |
     |----> NestJS Backend -----> Telegram Bot API ---> Telegram Группа
     |                                      |
     | SSE /api/chat/events/:sessionId      | reply_to_message
     |<---- NestJS Backend <----- Webhook POST /api/chat/webhook
```

---

## Шаги реализации

### Шаг 1: Prisma схема + миграция
**Файл:** `backend/prisma/schema.prisma`

Добавить:
- Enum `ChatSender` (USER, ADMIN)
- Модель `ChatConversation` — UUID id, visitorName, visitorSessionId (unique), status, telegramMessageId, timestamps
- Модель `ChatMessage` — autoincrement id, conversationId FK, sender enum, text, createdAt

Конвенции: `@map("snake_case")`, `@@map("table_name")`, `@default(now())`.

Запустить: `cd backend && npx prisma migrate dev --name add-live-chat`

---

### Шаг 2: Backend модуль чата
**Новая директория:** `backend/src/chat/`

#### `dto/create-message.dto.ts`
- sessionId, name, text с валидацией через class-validator

#### `chat.service.ts` — Основная логика:
- RxJS `Subject<SseMessage>` для распределения SSE событий
- `findOrCreateConversation()` — upsert по sessionId
- `sendUserMessage()` — сохранить в БД → отправить SSE → отправить в Telegram с тегом `#conv-{uuid}`
- `getMessages()` — история по sessionId
- `handleTelegramWebhook()` — парсить `reply_to_message.text` на `#conv-{uuid}`, сохранить ADMIN сообщение, отправить SSE
- `sendToTelegram()` — `TELEGRAM_BOT_TOKEN` + `TELEGRAM_LIVE_CHAT_ID`, хранит `telegramMessageId` для threading

#### `chat.controller.ts` — Эндпоинты:
| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/chat/messages` | Пользователь отправляет сообщение |
| GET | `/chat/messages/:sessionId` | История сообщений |
| SSE | `/chat/events/:sessionId` | SSE поток (встроенный `@Sse()` декоратор NestJS) |
| POST | `/chat/webhook` | Обработчик Telegram webhook |

#### `chat.module.ts`
Стандартный модуль. PrismaModule и ConfigModule глобальные — импортировать не нужно.

---

### Шаг 3: Регистрация модуля
**Файл:** `backend/src/app.module.ts`

Добавить `ChatModule` в imports.

---

### Шаг 4: Переменная окружения
Добавить в backend `.env`:
```
TELEGRAM_LIVE_CHAT_ID=<id-группы>
```

После деплоя зарегистрировать webhook:
```bash
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -d '{"url": "https://backend-domain/api/chat/webhook"}'
```

---

### Шаг 5: Frontend API клиент
**Новый файл:** `lib/chat-api.ts`

- `sendChatMessage(sessionId, name, text)` — POST
- `getChatMessages(sessionId)` — GET история
- `createChatEventSource(sessionId)` — EventSource для SSE

Паттерн из `lib/calculator-api.ts`.

---

### Шаг 6: Компонент чат-виджета
**Новый файл:** `components/ChatWidget.tsx`

Клиентский компонент с 3 состояниями:

| Состояние | Описание |
|-----------|----------|
| Закрыт | Плавающая кнопка (fixed bottom-6 right-6, z-50) |
| Пре-чат | Форма ввода имени (Input + Button из shadcn/ui) |
| Чат | Список сообщений + поле ввода + SSE |

Технические детали:
- `framer-motion` AnimatePresence для анимаций
- `localStorage` для sessionId и имени
- `EventSource` для SSE с авто-переподключением
- Дедупликация сообщений по id
- Авто-скролл к последнему сообщению
- Тёмная тема через `dark:` классы
- Иконки: `lucide-react` (MessageCircle, X, Send)
- Панель: 360px ширина, 480px высота

---

### Шаг 7: Интеграция в layout
**Файл:** `app/[locale]/layout.tsx`

Добавить `<ChatWidget />` после `<Footer />`.

---

### Шаг 8: Переводы
**Файлы:** `messages/en.json`, `messages/ro.json`, `messages/ru.json`

Namespace `"ChatWidget"`:
- `openChat` — "Open chat" / "Deschide chat" / "Открыть чат"
- `title` — "GoQode Support" / "Suport GoQode" / "Поддержка GoQode"
- `subtitle` — "We usually reply within a few minutes" / ...
- `namePrompt` — "What's your name?" / ...
- `namePlaceholder` — "Your name" / ...
- `startChat` — "Start chat" / ...
- `emptyState` — "Send a message to start the conversation" / ...
- `messagePlaceholder` — "Type a message..." / ...

---

## Файлы для изменения

| Действие | Файл |
|----------|------|
| Изменить | `backend/prisma/schema.prisma` |
| Создать | `backend/src/chat/chat.module.ts` |
| Создать | `backend/src/chat/chat.controller.ts` |
| Создать | `backend/src/chat/chat.service.ts` |
| Создать | `backend/src/chat/dto/create-message.dto.ts` |
| Изменить | `backend/src/app.module.ts` |
| Создать | `lib/chat-api.ts` |
| Создать | `components/ChatWidget.tsx` |
| Изменить | `app/[locale]/layout.tsx` |
| Изменить | `messages/en.json`, `messages/ro.json`, `messages/ru.json` |

---

## Переиспользование существующего кода

- `PrismaService` (глобальный) — доступ к БД
- `ConfigService` (глобальный) — переменные окружения
- `Button`, `Input` из `components/ui/` — UI примитивы
- `framer-motion` — анимации
- `lucide-react` — иконки
- Паттерн из `lib/calculator-api.ts` — структура API клиента
- Паттерн из `backend/src/submissions/` — структура module/controller/service

---

## Проверка

1. Запустить backend: `cd backend && npm run dev`
2. Запустить frontend: `npm run dev`
3. Открыть `http://localhost:3000`
4. Нажать на пузырь чата → ввести имя → отправить сообщение
5. Проверить сообщение в Telegram-группе с тегом `#conv-{uuid}`
6. Ответить на сообщение в Telegram (reply)
7. Проверить что ответ появился в виджете в реальном времени
8. Обновить страницу — сессия и история сохранены
9. Тест тёмной темы
10. Тест на мобильном (375px)
