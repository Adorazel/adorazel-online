# adorazel-online

## Подготовительный этап

Склонировать репозиторий:

    git clone https://github.com/Adorazel/adorazel-online.git
    
Создать конфигурационные файлы:

    cd ./adorazel-online/
    cp ./config/sample.json ./config/default.json
    cp ./config/sample.json ./config/production.json

Отредактировать конфигурационные файлы `default.json` (development) и `production.json`.


## Разработка

Установка:

    npm install
    npm run client:install
    
Запуск:
    
    npm run dev 
    
## Развертывание
    
На сервере должны быть установлены **Docker**, **Docker Compose** и **Traefik**.

Выполнить в консоли команду:
    
    docker-compose up -d --build