# Требования:
1. PHP 7.2 + 
2. Apache
3. Nodejs, npm
4. DB MySQL 5.6 +

# Установка:
1. Переходим в нужную директорию
2. Запускаем команду  `git clone https://github.com/twis4t/marshal.git`
3. Запускаем команду `npm install`
4. Запускаем команду `composer install`
5. Копируем файл `.env`, в нем указываем:
	- новый адрес сайта `APP_URL` и имя БД `DB_DATABASE`
    - параметры подключения к БД	
6. Запускаем команду `php artisan key:generate`
7. Запускаем команду `php artisan migrate`
8. Запускаем команду `php artisan passport:install --force`
9. Запускаем команду `php artisan passport:client --password`. Имя приложения: `marshal-back`

# Тестовые данные
1. Если добавились новые файлы в /database `composer dumpautoload`
2. Запускаем сидеры `php artisan db:seed`