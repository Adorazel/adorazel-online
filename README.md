# adorazel-online

Для работы приложения требуется база данных **MongoDB**.

Создать её и получить ссылку для подключения можно по адресу https://www.mongodb.com

Не забудьте указать ip-адрес вашего сервера в настройках сетевого доступа

## Подготовительный этап

Склонируйте репозиторий:

    git clone https://github.com/Adorazel/adorazel-online.git
    
Создайте конфигурационные файлы:

    cd ./adorazel-online/
    cp ./config/sample.json ./config/default.json
    cp ./config/sample.json ./config/production.json

Отредактируйте конфигурационные файлы `default.json` (development) и `production.json`.
    
## Развёртывание
    
На сервере должны быть установлены **Docker**, **Docker Compose** и **Traefik**.

Выполните в консоли команду:
    
    docker-compose up -d --build
    
## Альтернативный вариант развёртывания

Установка:

    npm install
    npm run client:install

Сборка:

    npm run client:build
    
Запуск:

    npm run start
    
## Разработка

Установка:

    npm install
    npm run client:install
    
Запуск:
    
    npm run dev 