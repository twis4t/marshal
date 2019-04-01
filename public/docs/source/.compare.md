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
[Get Postman Collection](http://marshal/docs/collection.json)

<!-- END_INFO -->

#Answer

API методы для работы с ответами (откликами) на заявки
<!-- START_ffba39ee142f0e0f3df7d5ab3a06906b -->
## Получение списка ответов

> Example request:

```bash
curl -X GET -G "http://marshal/api/answers" 
```

```javascript
const url = new URL("http://marshal/api/answers");

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
`GET api/answers`


<!-- END_ffba39ee142f0e0f3df7d5ab3a06906b -->

<!-- START_55a883d02cc8a9d0fbedc14330d96ac0 -->
## Получение данных ответа и сообщений по нему

> Example request:

```bash
curl -X GET -G "http://marshal/api/answer/{id}" 
```

```javascript
const url = new URL("http://marshal/api/answer/{id}");

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
`GET api/answer/{id}`


<!-- END_55a883d02cc8a9d0fbedc14330d96ac0 -->

<!-- START_58930841cebafd39d57bb15e55429d79 -->
## Создание нового ответа

> Example request:

```bash
curl -X POST "http://marshal/api/answer-add" 
```

```javascript
const url = new URL("http://marshal/api/answer-add");

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
`POST api/answer-add`


<!-- END_58930841cebafd39d57bb15e55429d79 -->

<!-- START_94acdbbb2fd39a6986d5c237442948aa -->
## Изменение параметров ответа

> Example request:

```bash
curl -X PUT "http://marshal/api/answer-update/{id}" 
```

```javascript
const url = new URL("http://marshal/api/answer-update/{id}");

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
`PUT api/answer-update/{id}`


<!-- END_94acdbbb2fd39a6986d5c237442948aa -->

<!-- START_2004f51cb9764abff326b3da3344d606 -->
## Удаление ответа

> Example request:

```bash
curl -X DELETE "http://marshal/api/answer-detele/{id}" 
```

```javascript
const url = new URL("http://marshal/api/answer-detele/{id}");

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
`DELETE api/answer-detele/{id}`


<!-- END_2004f51cb9764abff326b3da3344d606 -->

#Category

API методы для работы с категориями
<!-- START_109013899e0bc43247b0f00b67f889cf -->
## Получение списка категорий

> Example request:

```bash
curl -X GET -G "http://marshal/api/categories" 
```

```javascript
const url = new URL("http://marshal/api/categories");

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
curl -X GET -G "http://marshal/api/category/{id}" 
```

```javascript
const url = new URL("http://marshal/api/category/{id}");

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
curl -X POST "http://marshal/api/category-add" 
```

```javascript
const url = new URL("http://marshal/api/category-add");

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
curl -X PUT "http://marshal/api/category-update/{id}" 
```

```javascript
const url = new URL("http://marshal/api/category-update/{id}");

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
curl -X DELETE "http://marshal/api/category-detele/{id}" 
```

```javascript
const url = new URL("http://marshal/api/category-detele/{id}");

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

#Request

API методы для работы с заявками
<!-- START_8f3e0849f59d202e000098a13fc95f23 -->
## Получение списка заявок

> Example request:

```bash
curl -X GET -G "http://marshal/api/requests" 
```

```javascript
const url = new URL("http://marshal/api/requests");

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
`GET api/requests`


<!-- END_8f3e0849f59d202e000098a13fc95f23 -->

<!-- START_8c27fe57ed283926960b1f2821c3dce9 -->
## Получение данных по заявке и списка ответов

> Example request:

```bash
curl -X GET -G "http://marshal/api/request/{id}" 
```

```javascript
const url = new URL("http://marshal/api/request/{id}");

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
`GET api/request/{id}`


<!-- END_8c27fe57ed283926960b1f2821c3dce9 -->

<!-- START_4e156c3f4b1d4057d00862f18071d036 -->
## Создание новой заявки

> Example request:

```bash
curl -X POST "http://marshal/api/request-add" 
```

```javascript
const url = new URL("http://marshal/api/request-add");

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
`POST api/request-add`


<!-- END_4e156c3f4b1d4057d00862f18071d036 -->

<!-- START_01ceca6128a7cd6c8dca4cd4b3b7f0eb -->
## Изменение заявки

> Example request:

```bash
curl -X PUT "http://marshal/api/request-update/{id}" 
```

```javascript
const url = new URL("http://marshal/api/request-update/{id}");

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
`PUT api/request-update/{id}`


<!-- END_01ceca6128a7cd6c8dca4cd4b3b7f0eb -->

<!-- START_d62ce0015a84418e64c348d457504dd6 -->
## Удаление заявки

> Example request:

```bash
curl -X DELETE "http://marshal/api/request-detele/{id}" 
```

```javascript
const url = new URL("http://marshal/api/request-detele/{id}");

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
`DELETE api/request-detele/{id}`


<!-- END_d62ce0015a84418e64c348d457504dd6 -->

#Shop

API методы для работы с магазинами
<!-- START_8f173edd89d1c1da6a80dad0d9d5121f -->
## Получение списка магазинов с категориями

> Example request:

```bash
curl -X GET -G "http://marshal/api/shops" 
```

```javascript
const url = new URL("http://marshal/api/shops");

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
curl -X GET -G "http://marshal/api/shop/{id}" 
```

```javascript
const url = new URL("http://marshal/api/shop/{id}");

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
curl -X POST "http://marshal/api/shop-add" 
```

```javascript
const url = new URL("http://marshal/api/shop-add");

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
curl -X PUT "http://marshal/api/shop-update/{id}" 
```

```javascript
const url = new URL("http://marshal/api/shop-update/{id}");

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
curl -X DELETE "http://marshal/api/shop-detele/{id}" 
```

```javascript
const url = new URL("http://marshal/api/shop-detele/{id}");

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
curl -X POST "http://marshal/api/login" 
```

```javascript
const url = new URL("http://marshal/api/login");

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
curl -X POST "http://marshal/api/register" 
```

```javascript
const url = new URL("http://marshal/api/register");

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
curl -X GET -G "http://marshal/api/details" 
```

```javascript
const url = new URL("http://marshal/api/details");

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


