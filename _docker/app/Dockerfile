FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libzip-dev \
    zip unzip \
    curl \
    git \
    libonig-dev \
    libxml2-dev \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

CMD ["php-fpm"]