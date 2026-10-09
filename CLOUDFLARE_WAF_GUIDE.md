# 🛡️ Руководство по защите MedBooking через Cloudflare (DDoS & WAF)

Это практическое руководство предназначено для обеспечения максимального уровня сетевой и прикладной защиты проекта **MedBooking** (`https://evstifeevdaniil77-coder.github.io/med/` и бэкенда API) от DDoS-атак, бот-нет сетей, спам-флуда и сканеров уязвимостей на **100% бесплатном тарифе Cloudflare Free**.

---

## 📌 Оглавление
1. [Подключение домена к Cloudflare](#1-подключение-домена-к-cloudflare)
2. [Сокрытие реального IP бэкенда (DNS Proxying)](#2-сокрытие-реального-ip-бэкенда-dns-proxying)
3. [Настройка SSL/TLS шифрования](#3-настройка-ssltls-шифрования)
4. [Настройка Web Application Firewall (WAF)](#4-настройка-web-application-firewall-waf)
5. [Защита от ботов: Bot Fight Mode и Turnstile](#5-защита-от-ботов-bot-fight-mode-и-turnstile)
6. [Экстренный режим: Under Attack Mode](#6-экстренный-режим-under-attack-mode)
7. [Полная изоляция Origin-сервера (Zero Trust / Tunnel)](#7-полная-изоляция-origin-сервера-zero-trust--tunnel)

---

## 1. Подключение домена к Cloudflare

1. Зарегистрируйтесь на сайте [cloudflare.com](https://dash.cloudflare.com/sign-up).
2. Нажмите **«Add a Site»** и введите ваш домен (например, `medbooking.com` или домен вашего API).
3. Выберите тариф **Free Plan ($0/mo)**.
4. Cloudflare автоматически просканирует существующие DNS-записи.
5. Замените NS-серверы (Name Servers) у вашего регистратора домена (Reg.ru, Namecheap, GoDaddy и т.д.) на пару NS-серверов, предоставленных Cloudflare (например, `aria.ns.cloudflare.com` и `skip.ns.cloudflare.com`).
6. Дождитесь обновления DNS-делегирования (обычно от 5 до 30 минут).

---

## 2. Сокрытие реального IP бэкенда (DNS Proxying)

> ⚠️ **Критически важно:** Если злоумышленник узнает реальный IP-адрес вашего сервера (Origin IP), он сможет направить DDoS-атаку прямо на сервер в обход всех защит Cloudflare.

1. Перейдите в раздел **DNS** ➔ **Records**.
2. Убедитесь, что для записей `A` и `CNAME` включен статус **Proxied** (оранжевое облако 🟠):
   - `A` `api.medbooking.com` ➔ `[IP_ВАШЕГО_СЕРВЕРА]` (Proxy status: **Proxied**)
   - `CNAME` `medbooking.com` ➔ `[ДОМЕН_ХОСТИНГА]` (Proxy status: **Proxied**)
3. Теперь при DNS-запросах весь мир видит только Anycast IP-адреса Cloudflare. Ваш реальный сервер скрыт за глобальной сетью с емкостью фильтрации трафика более **200+ Тбит/с**.

---

## 3. Настройка SSL/TLS шифрования

1. Перейдите в **SSL/TLS** ➔ **Overview**:
   - Выберите режим **Full (Strict)** — гарантирует сквозное шифрование между посетителем, Cloudflare и вашим бэкендом.
2. Перейдите в **SSL/TLS** ➔ **Edge Certificates**:
   - Включите **Always Use HTTPS** (автоматический редирект HTTP ➔ HTTPS).
   - Включите **Automatic HTTPS Rewrites**.
   - Установите **Minimum TLS Version** на `TLS 1.2` (отсекает устаревшие небезопасные клиенты и старые сканеры).

---

## 4. Настройка Web Application Firewall (WAF)

В бесплатном плане Cloudflare доступны мощные правила кастомного файрвола (Custom Rules) и Rate Limiting Rules.

### 4.1. Rate Limiting для критического эндпоинта `/api/bookings`
1. Перейдите в **Security** ➔ **WAF** ➔ вкладка **Rate limiting rules**.
2. Нажмите **Create rule**:
   - **Rule Name**: `Block Booking Spam / Flooding`
   - **If incoming requests match**:
     - `URI Path` **equals** `/api/bookings`
     - **AND** `Request Method` **equals** `POST`
   - **Rate limit settings**:
     - Запросов: `5`
     - Временной интервал: `10 seconds` (или `1 minute`)
     - Считать по: `IP`
   - **Action**: `Managed Challenge` (или `Block` с кодом 429).
3. Сохраните и активируйте правило.

### 4.2. Блокировка вредоносных User-Agent и агрессивных сканеров
1. Перейдите в **Security** ➔ **WAF** ➔ вкладка **Custom rules**.
2. Создайте правило `Block Malicious Scanners`:
   - Выражение:
     ```text
     (http.user_agent contains "sqlmap") or 
     (http.user_agent contains "nikto") or 
     (http.user_agent contains "acunetix") or 
     (http.user_agent contains "nmap") or 
     (http.user_agent contains "masscan")
     ```
   - **Action**: `Block`.

---

## 5. Защита от ботов: Bot Fight Mode и Turnstile

### 5.1. Bot Fight Mode (Активация в 1 клик)
1. Перейдите в **Security** ➔ **Bots**.
2. Переключите тумблер **Bot Fight Mode** в положение **ON**.
3. Cloudflare автоматически начнет анализировать поведенческие факторы запросов и выдавать невидимые JavaScript-челленджи подозрительным скриптам и ботнетам.

### 5.2. Cloudflare Turnstile (Умная капча вместо рекапчи)
Если вам потребуется дополнительная клиентская проверка:
1. Зайдите в **Turnstile** в боковом меню Cloudflare.
2. Создайте сайт и получите `Sitekey` и `Secret Key`.
3. Turnstile полностью бесплатен, не заставляет пользователей кликать по светофорам и автобусам и защищает от автоматических отправок формы за доли секунды.

---

## 6. Экстренный режим: Under Attack Mode

Если ваш сервис подвергся мощной L7 HTTP-флуд атаке:

1. Откройте панель Cloudflare Dashboard.
2. На главной странице домена найдите блок **Quick Actions** (Быстрые действия) справа.
3. Переключите **Under Attack Mode** в статус **ON** (или в меню **Security** ➔ **Settings** ➔ **Security Level** выберите **I'm Under Attack!**).
4. **Что происходит:**
   - Каждый входящий посетитель перед доступом к сайту видит 3-5 секундный экран проверки целостности браузера от Cloudflare.
   - 99.9% атакующих ботнетов отсекаются на серверах Cloudflare, даже не доходя до вашего бэкенда!
5. После прекращения атаки верните Security Level в значение **Medium** или **High**.

---

## 7. Полная изоляция Origin-сервера (Zero Trust / Tunnel)

Чтобы злоумышленники не смогли отправить запросы напрямую на IP вашего Node.js сервера:

### Вариант А: Настройка фаервола Linux (UFW) по белым спискам Cloudflare
Разрешите входящие подключения на порт `80` и `443` только с официальных подсетей Cloudflare:
```bash
# Официальные IPv4 Cloudflare:
# https://www.cloudflare.com/ips/
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
  sudo ufw allow from $ip to any port 443 proto tcp
  sudo ufw allow from $ip to any port 80 proto tcp
done
sudo ufw default deny incoming
sudo ufw reload
```

### Вариант Б: Cloudflare Tunnel (Рекомендуется!)
Технология **Cloudflare Tunnel (`cloudflared`)**:
- Сервер бэкенда вообще **не открывает публичные порты** в интернет!
- Локальная служба `cloudflared` держит защищенный исходящий тоннель к пограничной сети Cloudflare.
- Даже если злоумышленник узнает ваш публичный IP, на нем нет открытых веб-портов.
- Подключение: в панели Cloudflare перейдите в **Zero Trust** ➔ **Networks** ➔ **Tunnels** ➔ создайте тоннель и запустите одну команду на сервере.

---

## ✅ Итоговый результат защиты

| Уровень защиты | Инструмент | Эффект |
|---|---|---|
| **L3 / L4 DDoS** | Cloudflare Anycast Network | Фильтрация SYN-флуда, UDP-флуда на сетевом уровне до 200+ Тбит/с |
| **L7 HTTP Flood** | WAF & Under Attack Mode | 100% отсечение ботов и флуд-запросов |
| **API Spam** | Cloudflare Rate Limiting + Express Limiter | Не более 5 заявок в 10 минут, предотвращение заспамливания Telegram-бота |
| **Form Injection** | Honeypot trap + Input Sanitizer | Мгновенный сброс авто-скриптов и защита от XSS |
| **Origin Cloaking** | Proxied DNS / Cloudflare Tunnel | Реальный IP сервера защищен от прямого сканирования |
