# TaskPulse

**TaskPulse** — Fullstack приложение для управления задачами с авторизацией пользователей, правами доступа и
административной панелью.  
Полностью поднимается через **Docker**.

## Стек технологий

- **Frontend:** Vue 3 (Vite, Pinia, Vue Router)
- **Backend:** Laravel 12
- **Аутентификация:** JWT (JSON Web Token)
- **База данных:** MySQL
- **Инфраструктура:** Docker, Docker Compose

---

## Основной функционал

### Пользовательская часть

- Регистрация и авторизация через JWT.
- CRUD для задач пользователя (создание, просмотр, редактирование, удаление).
- Привязка задач к категориям и тегам.
- Фильтрация задач по категориям и тегам.

### Административная панель

- Просмотр списка всех пользователей.
- Управление категориями (создание, редактирование, удаление).
- Управление тегами (создание, редактирование, удаление).

---

## Роли пользователей

- **Пользователь:** управление только своими задачами.
- **Администратор:** полный доступ к пользователям, тегам и категориям.

---

## Установка и запуск проекта

### 1. Клонирование репозитория

```bash
git clone https://github.com/bone1nis/task-pulse.git
cd task-pulse
```

### 2. Конфигурация окружения

Скопируйте файл .env:

```bash
cp fullstack-todo-backend/.env.example fullstack-todo-backend/.env
```

Настройте параметры в backend/.env:

```
APP_NAME=TaskPulse
APP_URL=http://localhost:8080

APP_LOCALE=ru
APP_FAKER_LOCALE=ru_RU

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root
```

### 3. Запуск через Docker Compose

```bash
docker-compose up --build
```

#### Будут подняты сервисы:

backend — Laravel API (порт 8080)  
frontend — Vue 3 SPA (порт 5173)  
db — MySQL (порт 3306)

### 4. Инициализация базы данных и миграции

После того как все контейнеры поднимутся, нужно инициализировать базу данных с помощью миграций и сидов.

```bash
docker exec -it fullstack_app php artisan migrate:refresh --seed
```

### 5. Настройка APP_KEY

Для безопасности приложения необходимо создать секретный ключ:

```bash
docker exec -it fullstack_app php artisan key:generate
```

### 5. Настройка JWT

Для настройки аутентификации через JWT необходимо создать секретный ключ:

```bash
docker exec -it fullstack_app php artisan jwt:secret
```

### 6. Авторизация

Для тестирования приложения можно использовать любую из существующих в базе данных почт и пароль 123456.
