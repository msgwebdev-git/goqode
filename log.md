## Лог разработки

### День 1 (~6ч)
создал проект на некст, тайпскрипт и tailwind
дальше взяться за eslint, postcss и tsconfig
настроил eslint, postcss и tsconfig, алиас @/* работает
теперь шрифты — подключил Google Fonts через next/font/google: Manrope Variable
указал subsets: latin, cyrillic — кириллица нужна для RO и RU
шрифт работает через font-sans, всё ок
базовый layout.tsx готов, page.tsx рендерится

### День 2 (~5ч)
перехожу к i18n — поставил next-intl
настроил 3 локали: ro (дефолтная), en, ru
написал routing.ts с defineRouting, request.ts для серверных компонентов
navigation.ts — обёртка для Link, redirect, usePathname, useRouter
middleware proxy.ts для роутинга по языкам
создал структуру messages/ — ro.json, en.json, ru.json
layout.tsx обернул в NextIntlClientProvider, передаю messages через getMessages
проверил — /en, /ru, /ro всё переключается, структура app/[locale]/ работает

### День 3 (~5ч)
берусь за Fluid Design System
поставил tailwind-clamp, настроил плагин: min 375px, max 1920px
globals.css — 153 строки, написал с нуля
CSS-переменные в oklch — light и dark тема
акцентный цвет #C9FD48 (кислотный зелёный) — главный акцент бренда
настроил border-radius: 0.625rem по дефолту
keyframes для spotlight-анимации
подключил tw-animate-css плагин
dark-вариант через .dark класс + next-themes
проверил — переключение тем работает, fluid-размеры скейлятся от мобилки до 1920

### День 4 (~5ч)
собираю UI-кит
поставил Radix UI — accordion, dialog, dropdown-menu, navigation-menu, tabs, slot, label
поставил class-variance-authority, clsx, tailwind-merge
утилита cn() в lib/utils.ts
начал клепать компоненты в стиле Shadcn:
Button, Card, Badge, Input, Label, Textarea — базовые
Accordion, Tabs — на Radix
Dialog, Sheet, Dropdown Menu, Navigation Menu — на Radix
Drawer — на vaul
Carousel — на embla-carousel
Chart — обёртка для Recharts
вышло 14 базовых компонентов, UI-кит собран

### День 5–6 (~12ч)
берусь за Navbar — вышло на 397 строк
sticky-хедер, фиксируется при скролле
логотип — два SVG (goQode - dark.svg и goQode - white.svg), переключается по теме
мега-меню Solutions — grid 2x3 + 1, каждый пункт с иконкой и описанием
переключатель языков RO/EN/RU — на десктопе Dropdown, на мобиле кнопки
мобильное меню через Sheet (Radix), с аккордеоном для Solutions
кнопка CTA «Обсудить проект» в хедере
навбар адаптивен, на мобиле гамбургер
дальше Footer — 143 строки
логотип light/dark свап
4-колоночный grid: лого+описание, навигация, контакты, соцсети
соцсети — Instagram, LinkedIn, Telegram (иконки из Tabler)
и ThemeToggle — 59 строк, переключалка sun/moon с проверкой mounted

### День 7–8 (~14ч)
самый сложный блок — анимационные компоненты
первый — Shuffle.tsx, 438 строк
поставил gsap и @gsap/react
SplitText разбивает текст по символам
ScrollTrigger для запуска по скроллу
эффект shuffle — каждый символ меняется рандомно перед показом финального
есть hover-триггер с debounce
направления shuffle — left, right, up, down
кастомный charset для scramble-символов
переход цвета от colorFrom к colorTo во время анимации
GPU-ускорение через will-change и transform-gpu
самый тяжёлый анимационный компонент, но работает плавно

дальше TrueFocus.tsx — 180 строк
эффект blur/focus — слова меняются по очереди
каждое слово сначала размыто, потом фокусируется
glow-эффект через drop-shadow
скобки-индикаторы вокруг активного слова
есть hover-режим — навёл и слово фокусируется
на Motion (framer-motion)

RotatingText.tsx — 232 строки
ротация текста с посимвольной анимацией
Intl.Segmenter для разбивки (поддержка юникода)
stagger с настраиваемым направлением — first, last, center, random
AnimatePresence для входа/выхода
автоматическая ротация с интервалом
spring-физика: damping 25, stiffness 300

CountUp.tsx — 114 строк
анимированный счётчик чисел
useMotionValue + useSpring для плавного отсчёта
spring: damping 60, stiffness 300, mass 0.5
срабатывает по useInView
форматирование через Intl.NumberFormat
поддержка десятичных и кастомных разделителей

ScrollReveal.tsx — 119 строк
пословная анимация по скроллу через GSAP
opacity от 0.1 до 1, rotation и blur
scrub: true — привязка к позиции скролла
stagger 0.05 между словами

### День 9 (~6ч)
TargetCursor.tsx — 314 строк
кастомный курсор — заменяет дефолтный на десктопе
4 угловых элемента следят за курсором с параллаксом
GSAP ticker для frame-by-frame обновлений
анимация вращения на бесконечном repeat
pulse-эффект по клику (scale)
определение мобилки через navigator.maxTouchPoints
easing: power3.out, power1.out, power2.out

LogoLoop.tsx — 497 строк, самый большой компонент
бесконечная карусель логотипов
НЕ на GSAP/Framer — написал свой RAF-loop с нуля
velocity-based scrolling с exponential smoothing (TAU 0.25)
ResizeObserver для пересчёта при ресайзе
ленивая загрузка изображений
fade-градиенты по краям
hover-пауза и замедление
динамический расчёт количества копий для бесшовного цикла
direction: left, right, up, down
самый оптимизированный компонент — мемоизация через React.memo

### День 10–11 (~12ч)
перехожу к сборке главной страницы
HeroSection.tsx — 110 строк
Shuffle для заголовка, TrueFocus для подзаголовка
container-variants с staggerChildren 0.15
два CTA — основной (#C9FD48) и вторичный
hover: scale 1.02, glow-тень

SolutionsSection.tsx — 777 строк, самый жирный компонент по строкам
bento-grid из 7 карточек услуг
Card1 — ракета с анимированными кругами
Card2 — мокап дашборда (top bar, sidebar, stats, chart area)
Cards 3–7 — разные grid-варианты с иконками
каждая карточка со своим hover-эффектом
адаптив: на мобилке в одну колонку

ProcessSection.tsx — 499 строк
горизонтальный скролл с каруселью шагов
active card state — текущий шаг подсвечивается
анимации иконок при активации
tags-контейнер на каждом шаге
scroll-driven pipeline внизу

### День 12 (~6ч)
CasesSection.tsx — 362 строки
featured case — большая карточка 16:9 с hover zoom (scale 1.05)
grid мелких карточек — теги, год, gradient overlay
ViewAllCard — отдельная карточка с вращающимися кругами
staggered grid с delay-based reveals

AboutSection.tsx — 310 строк
статистика компании, преимущества списком
team message
простая секция, без тяжёлых анимаций

BlogSection.tsx — 181 строка
превью статей, grid-layout
пока с placeholder-данными

главная собрана — page.tsx: HeroSection → SolutionsSection → ProcessSection → CasesSection → AboutSection → BlogSection

### День 13–14 (~14ч)
начинаю самую амбициозную страницу — Events
поставил three, @react-three/fiber (alpha), @react-three/drei, @react-three/rapier, meshline

Lanyard.tsx — 306 строк, 3D-компонент с физикой
Canvas с камерой: position [0, 0, 30], fov 25
Rapier physics engine, гравитация [0, -50, 0]
верёвка из сегментов с rope joints (distance 2.5)
сферический joint для карточки
CatmullRomCurve3 для интерполяции ленты
перетаскивание мышкой — kinematicPosition
MeshLineGeometry для рендера верёвки
Lightformer для реалистичного освещения
meshPhysicalMaterial — clearcoat, roughness, metalness
на мобилке снижаю dpr до 1.5
загрузка GLB-модели card.glb через useGLTF
обернул в dynamic() с ssr: false
долго возился с физикой, но результат крутой

EventsHero.tsx — 83 строки
Shuffle-заголовок, CalendarDays иконка в CTA
Lanyard рендерится поверх как overlay

EventFlowSection.tsx — 170 строк
шаги-flow с анимированными connection lines
ConnectionLine: ширина от 0% до 100% с easeOut
pulse-кольца на иконках: scale [1, 1.3, 1]
staggerChildren 0.15, delayChildren 0.2

SolutionsShowcase.tsx — 603 строки
sticky scroll стэкинг — 5 карточек решений с параллаксом
useScroll + useTransform для scroll-linked анимаций
каждая карточка масштабируется: 1 - (cards.length - i) * 0.05
внутри — демо-визуалы:
WebsiteDemoVisual — плавающие карточки Y [0, -10, 0]
QRTicketDemoVisual — 3D flip по hover + тень
CheckInDemoVisual — сканирующая линия
AnalyticsDemoVisual — анимация высоты баров графика
AdditionalServicesDemoVisual — staggered карточки
самый насыщенный компонент Events-страницы

TicketDemoSection.tsx — 344 строки
интерактивный 3D-тикет с QR-кодом
perspective transforms: rotateY, rotateX по hover
SVG QR-код с анимированными rect-элементами
scanning line: top ["10%", "90%", "10%"]
shine-эффект через gradient-анимацию

### День 15 (~6ч)
дособираю Events-страницу
EventComparisonSection.tsx — 133 строки, сравнение «Агрегаторы vs Кастомная платформа»
staggered cards, glow-эффект на акцентной карточке

EventProcessSection.tsx — процесс работы, шаги с иконками
EventResultsSection.tsx — метрики с числами
EventCTASection.tsx — финальный CTA

events/page.tsx — 48 строк, собирает все 9 подкомпонентов
Events готова, выглядит как отдельный продуктовый лендинг

### День 16 (~8ч)
Automation — самая большая страница, 903 строки в одном файле

AutomationHero — Shuffle-заголовок + beam-flow визуализация
SVG-пути для анимированных лучей между нодами
ноды интеграций: CRM, Email, Webhook, Postgres, AI Agent, Analytics
анимированные коннекторы

AutomationTypesSection — bento-grid 3 колонки, 6 типов автоматизации с иконками

AutomationDemoSection — анимированный pipeline
Trigger → Bot → Database → Mail → Users → Done
каждый шаг появляется последовательно с задержкой
отображение таймингов обработки

AutomationComparisonSection — таблица До/После, 5 метрик с иконками

AutomationProcessSection — вертикальный timeline, 5 шагов
градиентная линия между шагами

AutomationResultsSection — 4 карточки с CountUp-метриками
анимированные числа при скролле

AutomationCTASection — большая CTA-карточка, текст меняется по hover, контактные данные, 3 значка преимуществ

### День 17 (~6ч)
Growth — 353 строки
GrowthHero — Shuffle-заголовок, TrendingUp иконка, CTA
SolutionOverview — аккордеон 7 пунктов с AnimatedPlusX (плюс поворачивается в крестик)
sticky заголовок слева, контент справа
ResultsSection — 3 stat-карточки (BarChart3, Target, Zap) с CountUp
GrowthCTA — большой CTA с hover text swap

Launch — 353 строки, структура идентична Growth
LaunchHero — Rocket иконка вместо TrendingUp
аккордеон 7 пунктов, другой контент
ResultsSection — digital presence, first leads, conversion growth
по сути клон Growth с другими переводами и иконками

### День 18 (~8ч)
Platforms — 860 строк, вторая по размеру страница

PlatformsHero — ContainerScroll компонент
внутри мокап дашборда: top bar, sidebar, stats row, chart area
3D-вращение по скроллу, выглядит эффектно

PlatformTypesSection — Shuffle + 3 карточки (Cloud, ShoppingCart, Users)

FeaturesSection — аккордеон с иконкой + заголовок, 3 фичи (Zap, Lock, Globe)

ProcessSection — 4-фазный timeline с scroll-driven анимацией
12 шагов распределены по 4 фазам
номерация, стрелки, каскадная анимация

BentoGridSection — 5 карточек
Architecture 2x2, Security, API, Analytics, Responsive
визуализация tech stack внутри карточки

TechStackSection — 4 категории (Frontend, Backend, Database, DevOps)
иконки грузятся с svgl.app — внешние SVG логотипы технологий

StatsSection — 3 метрики с большими числами

PlatformsCTA — финальная кнопка

### День 19 (~6ч)
Contact — 447 строк
двухшаговая форма с slide-переходами
AnimatePresence mode="wait" с direction-based анимацией
variants: enter → center → exit

Step 1: имя, email, телефон
UnderlineInput — кастомный инпут с анимированной подчёркивающей линией
focus: width 0% → 100%

Step 2: сообщение, выбор услуги (5 pill-кнопок), checkbox согласия
UnderlineTextarea — то же самое для textarea

Success state — анимированная галочка на spring (stiffness 200)
кнопка сброса для нового запроса

EmailPill — копирование email в буфер с анимацией смены иконки
mailto-ссылка формируется динамически

тёмная левая панель (70% высоты) + светлая правая форма
дизайн контрастный, выглядит дорого

дальше Solutions/Branding и Solutions/Support — подстраницы решений
интегрировал в навбар в мега-меню Solutions

### День 20 (~5ч)
дополнительные UI-компоненты

chart-area-gradient.tsx — 131 строка
Recharts AreaChart с linear gradient fills
градиент opacity 0.8 → 0.1

chart-bar-active.tsx — 112 строк
Bar chart с подсветкой активного бара
stroke-dasharray для пунктирной обводки

ScrollStack.tsx — 350 строк
стэкинг карточек при скролле
подключил Lenis для smooth scroll, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
свой RAF-loop для трансформов
scale, rotation, blur, translateY по скроллу
ResizeObserver для динамического пересчёта
оптимизация через threshold: 0.1px — не обновляем DOM если разница меньше

background-beams.tsx — 142 строки
50+ SVG-путей с анимированными gradient-линиями
рандомные задержки и длительности
бесконечный repeat, цвета: cyan → purple → pink

spotlight.tsx — 57 строк, SVG spotlight-эффект
card-hover-effect.tsx — 64 строки, hover-подсветка с layoutId

### День 21 (~5ч)
переводы — самая монотонная часть
971+ ключей на каждый из 3 языков
namespace'ы:
Navbar (13 ключей + submenu), Hero, Solutions, Cases, About, Contact
Process, Launch, Growth, Platforms, Automation, Events
Support, Branding, Footer, Testimonials, Blog, Clients
всего около 2900 ключей перевода
ro — румынский, основной
en — английский
ru — русский
проверил все страницы на всех трёх языках — нигде не вылезает fallback

### День 22–23 (~10ч)
тестирование и полировка
проверил на разных разрешениях — 375px, 768px, 1024px, 1440px, 1920px, 2560px
tailwind-clamp скейлится как надо, нигде не ломается
кроссбраузерность — Chrome, Safari, Firefox
3D Lanyard на мобилке — снизил dpr, работает без лагов
проверил все анимации — Shuffle, TrueFocus, CountUp, LogoLoop
ScrollTrigger корректно срабатывает
prefers-reduced-motion — Shuffle его уважает
Lanyard dynamic import — не ломает SSR
проверил все формы, все аккордеоны, все hover-эффекты
поправил мелкие баги — тайминги, z-index, overflow
финальная полировка easing-кривых
accessibility — семантика, ARIA, keyboard navigation на Radix-компонентах
всё готово
