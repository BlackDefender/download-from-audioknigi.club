# download-from-audioknigi.club
Скрипт для скачивания аудиокниг с сайта audioknigi.club

Для работы скритпа нужен плагин Greasemonkey(Firefox) или Tampermonkey(Chrome, Vivaldi и прочие браузеры на основе Chromium) для добавления пользовательских скриптов на страницу.

## Установка
#### Firefox
Устанавливаем плагин Greasemonkey.
Кликаем на иконке плагина, выбираем пункт "Создать скрипт".

В открывшемся окне вводим название Download form audioknigi.club, в качестве пространства имен указываем http://audioknigi.club. Остальные поля оставляем пустыми. Жмем ОК.

В открывшемся окне редактора добавляем код из файла app.js. Жмем кнопку Сохранить.

#### Chrome
Устанавливаем плагин Tampermonkey.
Кликаем на иконке плагина, выбираем пункт Добавить новый скрипт.
Убираем имеющийся в редакторе текст и вставляем следующий:
```
// ==UserScript==
// @name         Download form audioknigi.club
// @namespace    https://audioknigi.club/
// @version      1.0
// @author       BlackDefender
// @include      https://audioknigi.club/*
// @run-at       document-body
// @grant        none
// ==/UserScript==
```
После добавляем код из файла app.js.
Сохраняем.

## Использование
При заходе на audioknigi.club на страницу книги вверху справа появится кнопка "скачать".

В скачанном файле будет список адресов аудиофайлов выбранной книги.
Его можно загрузить с помощью DownloadMaster.
