<br>
<p  align="center">
<img  src="./client-side/public/bloodplus-logo-light.svg"  alt="bloodplus logo"  width="270"/>
</p>
<p  align="center">
Фуллстек-проект онлайн-магазина кроссовок с панелью администратора и интеграцией платежной системы ЮКаssа.
</p>

## **Стек приложения**
### **Backend (серверная часть)**

-  **Фреймворк**: [NestJS](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnestjs.com%2F) — прогрессивный Node.js фреймворк для построения эффективных и масштабируемых серверных приложений.
-  **База данных и ORM**: [PostgreSQL](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.postgresql.org%2F) с [Prisma](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.prisma.io%2F) для типобезопасного взаимодействия с базой данных.
-  **Аутентификация**: [Passport.js](https://www.google.com/url?sa=E&q=http%3A%2F%2Fwww.passportjs.org%2F) с реализацией:
   -  **JWT-стратегии** (access и refresh токены).
   -  **OAuth 2.0** для входа через Google и Yandex.
   -   **Кастомные декораторы для авторизации**: Для защиты эндпоинтов сервера и реализации ролевой модели доступа был создан кастомный декоратор Auth, который объединяет в себе гварды аутентификации и ролей.
-  **Хеширование паролей**: [Argon2](https://www.google.com/url?sa=E&q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FArgon2) — современный и безопасный алгоритм хеширования.
-  **Работа с файлами**: Загрузка и отдача статических файлов (@nestjs/serve-static, fs-extra).
-  **Валидация**: class-validator и class-transformer для надежной валидации входящих данных.
-  **Платежи**: Интеграция с [YooKassa](https://www.google.com/url?sa=E&q=https%3A%2F%2Fyookassa.ru%2F).
-  **Окружение**: [Docker](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.docker.com%2F) для контейнеризации приложения и базы данных.
### **Frontend (клиентская часть)**
-  **Фреймворк**: [Next.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnextjs.org%2F) (с [Turbopack](https://www.google.com/url?sa=E&q=https%3A%2F%2Fturbo.build%2Fpack)) — React-фреймворк, который позволяет строить высокопроизводительные веб-приложения.
-  **Управление состоянием**:
   - [Zustand](https://www.google.com/url?sa=E&q=https%3A%2F%2Fzustand-demo.pmnd.rs%2F) для глобального состояния.
   - [TanStack Query (React Query)](https://www.google.com/url?sa=E&q=https%3A%2F%2Ftanstack.com%2Fquery%2Flatest) для управления серверным состоянием, кэширования и синхронизации данных.
-  **Стилизация**: [Tailwind CSS](https://www.google.com/url?sa=E&q=https%3A%2F%2Ftailwindcss.com%2F) — utility-first CSS-фреймворк.
-  **UI-компоненты**: [Shadcn/ui](https://www.google.com/url?sa=E&q=https%3A%2F%2Fui.shadcn.com%2F) — коллекция переиспользуемых компонентов на основе [Radix UI](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.radix-ui.com%2F).
-  **Формы**: [React Hook Form](https://www.google.com/url?sa=E&q=https%3A%2F%2Freact-hook-form.com%2F) с валидацией через [Zod](https://www.google.com/url?sa=E&q=https%3A%2F%2Fzod.dev%2F).
-  **HTTP-клиент**: [Axios](https://www.google.com/url?sa=E&q=https%3A%2F%2Faxios-http.com%2F) для выполнения запросов к API.
-  **Аутентификация на клиенте**:
   - Работа с JWT (jwt-decode) и хранение токенов в cookie (js-cookie).
   -  **Middleware для защиты роутов**: Реализован механизм на базе Next.js Middleware для управления доступом к страницам. Он решает следующие задачи:

      -  **Защита роутов**: Ограничивает доступ к страницам профиля (/profile/*) и панели администратора (/admin/*) только для авторизованных пользователей.

      -  **Управление доступом по ролям**: Доступ к панели администратора разрешен только пользователям с ролью ADMIN.

      -  **Автоматическое обновление токенов**: При истечении accessToken middleware автоматически запрашивает новый, используя refreshToken, обеспечивая бесшовный пользовательский опыт без необходимости повторной авторизации.

      -  **Редиректы**: Автоматически перенаправляет пользователей со страниц, требующих авторизации, на страницу входа, и наоборот, если пользователь уже авторизован и пытается зайти на страницу входа/регистрации.

-  **UX/UI**:

   -  **Скелетоны (Skeletons)**: Для улучшения пользовательского опыта во время загрузки данных используются скелетоны. Они отображаются в каталоге, при фильтрации, в профиле, избранном и в формах панели администратора.

   -  **Страница 404**: Для всех несуществующих маршрутов отображается кастомная страница "Не найдено", которая поддерживает светлую и темную темы.

  

  

### **Возможности пользователя**

  

----------

  

- Интерфейс с возможностью переключения между светлой и темной темами (изначально устанавливается системная).

  

- Поиск по названию товара, фильтрация по полу, бренду, сезону, цвету и цене.

  

- Регистрация и вход через email, а также через Google и Yandex.

  

- Добавление/удаление товаров в корзине с синхронизацией для неавторизованных пользователей при их последующей регистрации.

  

- Возможность добавления/удаления товаров в избранное с синхронизацией для неавторизованных пользователей при их последующей регистрации.

  

- Интеграция с платежной системой ЮКаssа для безопасной оплаты.

  

- Возможность оставлять отзывы и ставить оценки товарам.

  

- Просмотр истории и полной информации о своих заказах в личном кабинете.

  

  

### **Возможности администратора**

  

----------

  

- Полное управление каталогом кроссовок на клиенте (создание, чтение, обновление, удаление).

  

- Полное управление и редактирование сущностей на клиенте: бренды, цвета, сезоны и размеры.

  

  

----------

  

## **Скриншоты приложения**

  

  

<details>
<summary><strong>Аутентификация</strong></summary>

<p  align="center">
<a  href="https://iimg.su/i/hHqArE"><img  src="https://s.iimg.su/s/02/bfLuaSrge9BXp8LIXbn94EWZ8nKNZpdmLxP5xKwF.png"></a>
<br>
<em>Регистрация (Светлая тема)</em>
<p  align="center">
<a  href="https://iimg.su/i/o2IvSj"><img  src="https://s.iimg.su/s/02/3HPV4qrsYKOhAgmYW4sNufjZPaA08lmBb90TVG9W.png"></a>
<br>
<em>Авторизация (Темная тема)</em>
</p>
</details>
<details>
<summary><strong>Каталог, фильтрация и поиск</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/X2IzIY"><img  src="https://s.iimg.su/s/02/cBrrEgbdrawvQl3fUacmgFsA4T0nU9ep2zbINT1a.png"></a>
<em>Результаты поиска (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/F2Pbnh"><img  src="https://s.iimg.su/s/02/LBJwRYRqZG1O5dBuOTSqLHpOhLg3a8T4Am8EgX9G.png"></a>
<br>
<em>Каталог (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/GY8lrm"><img  src="https://s.iimg.su/s/02/9rRjf9LWZfwcg4e5jR0lRQz818X8oGk3bbpikxD1.png"></a>
<br>
<em>Фильтрация с одним из выпадающих окон в топ-баре (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/1Bduhl"><img  src="https://s.iimg.su/s/02/15sMSwtnVHgQC9i5SzDqtysUzCluzkbVSm8nWz0E.png"></a>
<br>
<em>Фильтрация с переходом по ссылке (Темная тема)</em>
</p>
</details>
<details>
<summary><strong>Страница товара и отзывы</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/Lx78Hq"><img  src="https://s.iimg.su/s/02/vCsClBF4JDxCPKWYVFS0tDuKvlxH3FGH6YdKASg4.png"></a>
<br>
<em>Страница товара (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/uiK1ob"><img  src="https://s.iimg.su/s/02/4VgfEbJwVp71DZoIIMQZxlmivTZROMn58ldiKhCx.png"></a>
<br>
<em>Страница товара с выбором размера и демонстрация работы информирования пользователя "тостерами" (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/ssggFR"><img  src="https://s.iimg.su/s/02/iqCxwjhiyqzsCt7Sf4ysrjefGUWRNhPyNI9YlOV5.png"></a>
<br>
<em>Отзывы и форма для создания (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/xwGqJ1"><img  src="https://s.iimg.su/s/02/ViuJdjqY687v6NkDhBWgjXc7cZ8ljuGG2ekDafk2.png"></a>
<br>
<em>Отзывы и редактирование оставленного отзыва, демонстрация работы информирования пользователя "тостерами" (Темная тема)</em>
</p>
</details>
<details>
<summary><strong>Корзина и оформление заказа</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/y3jOom"><img  src="https://s.iimg.su/s/02/KRWhl2vd7oJjRsOXUojwzyP2YhqP6QhqF430AV0c.png"></a>
<br>
<em>Корзина у авторизованного пользователя (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/21Hr40"><img  src="https://s.iimg.su/s/02/M9PC9z0Zx2SeDKq4NAyssidssDwqRK3Q6jjgaVvx.png"></a>
<br>
<em>Корзина у неавторизованного пользователя (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/ZfOuay"><img  src="https://s.iimg.su/s/02/NOzIJxaSi42w1aIRuYFbb78UGSVI7bSQEJNiF7yM.png"></a>
<br>
<em>Интеграция с платежной системой ЮКасса</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/rqGGJ7"><img  src="https://s.iimg.su/s/02/vu28RJOkQE7HBukXobUTUdXPth2eb0vuEQSkfXK3.png"></a>
<br>
<em>Сообщение об успешном заказе (Темная тема)</em>
</p>
</details>
<details>
<summary><strong>Профиль пользователя: заказы и избранное</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/zYV4m2"><img  src="https://s.iimg.su/s/02/yJoUIZhmNl8PEaXiDKoYMFJB7W4RvNKW5pAtbFJm.png"></a>
<br>
<em>Пустая история заказов и отображение кнопки панели администратора (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/BgEjAb"><img  src="https://s.iimg.su/s/02/ZmleJWhrHAXDyIIAFd34vp9bqyRebPhx7TLZsp6i.png"></a>
<br>
<em>История с выполненными заказами и отображение кнопки панели администратора (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/tM7i1P"><img  src="https://s.iimg.su/s/02/2IEosMQYTbhtvWXXj6eICbEvHVuWVrzz5kb4qEjh.png"></a>
<br>
<em>Избранное у авторизованного пользователя (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/q5jyVV"><img  src="https://s.iimg.su/s/02/OKMWuBCWIDSHBbX0h67HVztZdLOCZj8nxaMH3wpT.png"></a>
<br>
<em>Избранное у неавторизованного пользователя, с возможностью последующей синхронизацией товаров на сервер (Темная тема)</em>
</p>
</details>
<details>
<summary><strong>Панель администратора</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/x2Lk24"><img  src="https://s.iimg.su/s/02/SsSk5MicBUuQpv2iD1urekvxz4ZESG9bvMi3LD1Z.png"></a>
<br>
<em>Главная страница админ-панели (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/yUMax1"><img  src="https://s.iimg.su/s/02/BpkHdBZ5cmQxEeSlzygq22AmLc0LPU3VO4qFzCkw.png"></a>
<br>
<em>Управление товарами (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/ZSLzJg"><img  src="https://s.iimg.su/s/02/lw8d0A4DMcY2x31HXSkwa2p17dvKUdmusFCKVYb5.png"></a>
<br>
<em>Управление другими сущностями (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/P2aDQD"><img  src="https://s.iimg.su/s/02/VKGg5m7vMqCHT5fsAr90NFYGroGa6cDbJoyLNJcQ.png"></a>
<br>
<em>Форма создания/редактирования товара (Светлая тема)</em>
</p>
</details>
<details>
<summary><strong>Скелетоны</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/mf26AU"><img  src="https://s.iimg.su/s/03/bQPHssgSFHpadMiqzw70U4poXjafs62pfIVd6mnz.png"></a>
<br>
<em>Скелетоны каталога (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/Pk6G6r"><img  src="https://s.iimg.su/s/03/qJqPVxVp4PRPpoBpRdPCdzlQq5mHMNdWr5znl70t.png"></a>
<br>
<em>Скелетоны фильтрации (Светлая тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/mcFfmp"><img  src="https://s.iimg.su/s/03/Nnt6h7cXMKydfI8BDx7d60qP6uIHypzyViBVUFae.png"></a>
<br>
<em>Скелетоны профиля (Светлая тема)</em>
</p>
</details>
<details>
<summary><strong>Страница 404</strong></summary>
<p  align="center">
<a  href="https://iimg.su/i/nnlmU9"><img  src="https://s.iimg.su/s/03/N9faJmqAR73NH1kO7nOeSC45LKvdgoeR4spCzLzJ.png"></a>
<br>
<em>Страница 404 (Темная тема)</em>
</p>
<p  align="center">
<a  href="https://iimg.su/i/CJ5bm9"><img  src="https://s.iimg.su/s/03/Amcouu8qhEZykfMqAhLmmwSY1sDGhfAQFHkV1Nlo.png"></a>
<br>
<em>Страница 404 (Светлая тема)</em>
</p>
</details>

----------
## **Установка и запуск**

### **Предварительные требования**

-  **Node.js** (версия 18.x или выше)

-  **Docker** и **Docker Compose**

-  **Yarn** и **Bun** в качестве менеджеров пакетов.

#### **Шаг 1: Клонирование репозитория**
```
git clone https://github.com/tramalretard/bloodplus-fullstack-sneakers-shop.git
cd bloodplus-fullstack-sneakers-shop
```
#### **Шаг 2: Настройка бэкенда**
1. Перейдите в директорию серверной части.
```
cd server-side
```
2. Создайте файл .env на основе примера.
```
cp .env.example .env
```
3. Заполните переменные окружения в файле .env своими данными (данные для подключения к БД, JWT-секреты, OAuth-ключи).
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET=your_jwt_secret
... и другие переменные
```
4. Запустите контейнер с базой данных PostgreSQL.
```
docker-compose up -d
```
5. Установите зависимости с помощью Yarn.
```
yarn install
```
6. Примените миграции базы данных.
```
npx prisma migrate dev
```
7. Запустите сервер в режиме разработки.
```
yarn start:dev
```
Сервер будет доступен по адресу http://localhost:4200.
#### **Шаг 3: Настройка Frontend**
1. В **новом окне терминала** перейдите в директорию клиентской части.
```
cd client-side
```
2. Создайте файл .env.local и укажите в нем адрес вашего бэкенд-сервера.
```
echo "NEXT_PUBLIC_SERVER_URL=http://localhost:4200" > .env.local
```
3. Установите зависимости с помощью Bun.
```
bun install
```
4. Запустите приложение.
```
bun dev
```
Приложение будет доступно по адресу http://localhost:3000.
#### **Шаг 4: Наполнение контентом**
**Важно:** после первого запуска база данных будет пуста. Чтобы сайт заработал, наполните его контентом через панель администратора.
1.  **Зарегистрируйте нового пользователя** на сайте.
2.  **Сделайте этого пользователя администратором.** Для этого вручную измените его роль в базе данных (например, через TablePlus):
- Подключитесь к вашей Docker-базе данных.
- Найдите таблицу User.
- У вашего пользователя измените значение поля **role** на **ADMIN**.
3.  **Перезайдите в аккаунт** на сайте, чтобы роль в токенах изменилась. В профиле появится кнопка **"Админ-панель"**.
4.  **Через админ-панель** добавьте бренды, сезоны, цвета, размеры и сами кроссовки.
----------
## **Доступные скрипты**
### **Backend** **(в качестве пакетного менеджера используется Yarn)**
- yarn start:dev — запуск сервера в режиме разработки.
- yarn build — сборка проекта для продакшена.
- yarn format — форматирование кода.
- yarn lint — проверка кода.
### **Frontend** **(в качестве пакетного менеджера используется Bun)**
- bun dev — запуск приложения в режиме разработки.
- bun build — сборка проекта для продакшена.
- bun start — запуск продакшн-сборки.
- bun lint — проверка кода.