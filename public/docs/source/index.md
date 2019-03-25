---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://localhost/docs/collection.json)

<!-- END_INFO -->

#Category

API методы для работы с категориями
<!-- START_109013899e0bc43247b0f00b67f889cf -->
## Получение списка категорий

> Example request:

```bash
curl -X GET -G "http://localhost/api/categories" 
```

```javascript
const url = new URL("http://localhost/api/categories");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET api/categories`


<!-- END_109013899e0bc43247b0f00b67f889cf -->

<!-- START_10ee6e46975f0dbd3a6a0a4c3dbc9fc4 -->
## Получение данных и списка магазинов по конкретной категории

> Example request:

```bash
curl -X GET -G "http://localhost/api/category/{id}" 
```

```javascript
const url = new URL("http://localhost/api/category/{id}");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET api/category/{id}`


<!-- END_10ee6e46975f0dbd3a6a0a4c3dbc9fc4 -->

<!-- START_0a11b0eb186d7dd32d34472a639afeb4 -->
## Создание новой категории

> Example request:

```bash
curl -X POST "http://localhost/api/category-add" 
```

```javascript
const url = new URL("http://localhost/api/category-add");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST api/category-add`


<!-- END_0a11b0eb186d7dd32d34472a639afeb4 -->

<!-- START_bc5a68f03fdde1265e94acde87f4b417 -->
## Изменение категории

> Example request:

```bash
curl -X PUT "http://localhost/api/category-update/{id}" 
```

```javascript
const url = new URL("http://localhost/api/category-update/{id}");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`PUT api/category-update/{id}`


<!-- END_bc5a68f03fdde1265e94acde87f4b417 -->

<!-- START_0ddf8bc62feef253fc2ad60405005853 -->
## Удаление категории

> Example request:

```bash
curl -X DELETE "http://localhost/api/category-detele/{id}" 
```

```javascript
const url = new URL("http://localhost/api/category-detele/{id}");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE api/category-detele/{id}`


<!-- END_0ddf8bc62feef253fc2ad60405005853 -->

#Shop

API методы для работы с магазинами
<!-- START_8f173edd89d1c1da6a80dad0d9d5121f -->
## Получение списка магазинов с категориями

> Example request:

```bash
curl -X GET -G "http://localhost/api/shops" 
```

```javascript
const url = new URL("http://localhost/api/shops");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET api/shops`


<!-- END_8f173edd89d1c1da6a80dad0d9d5121f -->

<!-- START_9094ff55330ddf830e2a603f42fcebf7 -->
## Получение данных и категории конкретного магазина

> Example request:

```bash
curl -X GET -G "http://localhost/api/shop/{id}" 
```

```javascript
const url = new URL("http://localhost/api/shop/{id}");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET api/shop/{id}`


<!-- END_9094ff55330ddf830e2a603f42fcebf7 -->

<!-- START_c2ea90c93f08a6a9f395c7bf37ba570c -->
## Добавление нового магазина

> Example request:

```bash
curl -X POST "http://localhost/api/shop-add" 
```

```javascript
const url = new URL("http://localhost/api/shop-add");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST api/shop-add`


<!-- END_c2ea90c93f08a6a9f395c7bf37ba570c -->

<!-- START_4b1439459a6cf265dbdb516e6bfadf18 -->
## Обновление данных по магазину

> Example request:

```bash
curl -X PUT "http://localhost/api/shop-update/{id}" 
```

```javascript
const url = new URL("http://localhost/api/shop-update/{id}");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`PUT api/shop-update/{id}`


<!-- END_4b1439459a6cf265dbdb516e6bfadf18 -->

<!-- START_56087f92d4830df772b98a7bf3ef71e9 -->
## Удаление магазина

> Example request:

```bash
curl -X DELETE "http://localhost/api/shop-detele/{id}" 
```

```javascript
const url = new URL("http://localhost/api/shop-detele/{id}");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE api/shop-detele/{id}`


<!-- END_56087f92d4830df772b98a7bf3ef71e9 -->

#general
<!-- START_c3fa189a6c95ca36ad6ac4791a873d23 -->
## login api

> Example request:

```bash
curl -X POST "http://localhost/api/login" 
```

```javascript
const url = new URL("http://localhost/api/login");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST api/login`


<!-- END_c3fa189a6c95ca36ad6ac4791a873d23 -->

<!-- START_d7b7952e7fdddc07c978c9bdaf757acf -->
## Register api

> Example request:

```bash
curl -X POST "http://localhost/api/register" 
```

```javascript
const url = new URL("http://localhost/api/register");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST api/register`


<!-- END_d7b7952e7fdddc07c978c9bdaf757acf -->

<!-- START_f50fecb2993d22653a99f84a5951e92c -->
## details api

> Example request:

```bash
curl -X GET -G "http://localhost/api/details" 
```

```javascript
const url = new URL("http://localhost/api/details");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET api/details`


<!-- END_f50fecb2993d22653a99f84a5951e92c -->


