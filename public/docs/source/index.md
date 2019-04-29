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
curl -X GET -G "http://marshal/api/answers" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/answers");

let headers = {
    "Authorization": "Bearer {token}",
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
curl -X GET -G "http://marshal/api/answer/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/answer/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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
curl -X POST "http://marshal/api/answer-add" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/answer-add");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`POST api/answer-add`


<!-- END_58930841cebafd39d57bb15e55429d79 -->

<!-- START_94acdbbb2fd39a6986d5c237442948aa -->
## Изменение параметров ответа

> Example request:

```bash
curl -X PUT "http://marshal/api/answer-update/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/answer-update/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`PUT api/answer-update/{id}`


<!-- END_94acdbbb2fd39a6986d5c237442948aa -->

<!-- START_25a994f99a99a06997539cf1012d139c -->
## Удаление ответа

> Example request:

```bash
curl -X DELETE "http://marshal/api/answer-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/answer-delete/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/answer-delete/{id}`


<!-- END_25a994f99a99a06997539cf1012d139c -->

#Car

API методы для работы с автомобилями пользователя
<!-- START_b5807964b67925bcb310ef24f51967da -->
## Получение списка автомобилей

> Example request:

```bash
curl -X GET -G "http://marshal/api/cars" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/cars");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/cars`


<!-- END_b5807964b67925bcb310ef24f51967da -->

<!-- START_aba474a5cdf326a52188f558e43ce4ab -->
## Получение данных по автомобилю

> Example request:

```bash
curl -X GET -G "http://marshal/api/car/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/car/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/car/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID автомобиля

<!-- END_aba474a5cdf326a52188f558e43ce4ab -->

<!-- START_5f33245fbcedb8d7c9d362711d7ad82c -->
## Создание нового автомобиля

> Example request:

```bash
curl -X POST "http://marshal/api/car-add" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"user_id":4,"car_brand_id":2,"car_model_id":2,"year":2008,"vin":"2GNFLGEK6C6345315"}'

```

```javascript
const url = new URL("http://marshal/api/car-add");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "user_id": 4,
    "car_brand_id": 2,
    "car_model_id": 2,
    "year": 2008,
    "vin": "2GNFLGEK6C6345315"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
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
`POST api/car-add`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    user_id | integer |  required  | ID пользователя
    car_brand_id | integer |  required  | ID марки
    car_model_id | integer |  required  | ID модели
    year | integer |  optional  | Год выпуска
    vin | string |  optional  | VIN номер

<!-- END_5f33245fbcedb8d7c9d362711d7ad82c -->

<!-- START_e1be7d1a160d7c8fc89eb443565cf03d -->
## Изменение автомобиля

> Example request:

```bash
curl -X PUT "http://marshal/api/car-update/{id}" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"user_id":4,"car_brand_id":2,"car_model_id":2,"year":2008,"vin":"2GNFLGEK6C6345315"}'

```

```javascript
const url = new URL("http://marshal/api/car-update/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "user_id": 4,
    "car_brand_id": 2,
    "car_model_id": 2,
    "year": 2008,
    "vin": "2GNFLGEK6C6345315"
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
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
`PUT api/car-update/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    user_id | integer |  optional  | ID пользователя
    car_brand_id | integer |  optional  | ID марки
    car_model_id | integer |  optional  | ID модели
    year | integer |  optional  | Год выпуска
    vin | string |  optional  | VIN номер
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID автомобиля

<!-- END_e1be7d1a160d7c8fc89eb443565cf03d -->

<!-- START_a7493535a62a79701734e132c253ea79 -->
## Удаление автомобиля

> Example request:

```bash
curl -X DELETE "http://marshal/api/car-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/car-delete/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/car-delete/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID автомобиля

<!-- END_a7493535a62a79701734e132c253ea79 -->

#CarBrand

API методы для работы с марками автомобилей
<!-- START_533fc2081a71a38ab0ceaa37ebb7f4f7 -->
## Получение списка марок машин

> Example request:

```bash
curl -X GET -G "http://marshal/api/carbrands" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/carbrands");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/carbrands`


<!-- END_533fc2081a71a38ab0ceaa37ebb7f4f7 -->

<!-- START_d99b7a8b6e69be47f854bd92dc240784 -->
## Получение данных по марке

> Example request:

```bash
curl -X GET -G "http://marshal/api/carbrand/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/carbrand/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/carbrand/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID марки

<!-- END_d99b7a8b6e69be47f854bd92dc240784 -->

<!-- START_279003fcd7f4facd3b5789334254dc50 -->
## Добавление марки

> Example request:

```bash
curl -X POST "http://marshal/api/carbrand-add" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"car_brand":"Opel"}'

```

```javascript
const url = new URL("http://marshal/api/carbrand-add");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "car_brand": "Opel"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
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
`POST api/carbrand-add`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    car_brand | string |  optional  | Марка

<!-- END_279003fcd7f4facd3b5789334254dc50 -->

<!-- START_aa6b6df1c7fa425ed33849e3bd323b5b -->
## Изменение марки

> Example request:

```bash
curl -X PUT "http://marshal/api/carbrand-update/{id}" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"car_brand":"Opel"}'

```

```javascript
const url = new URL("http://marshal/api/carbrand-update/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "car_brand": "Opel"
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
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
`PUT api/carbrand-update/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    car_brand | string |  optional  | Марка
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID марки

<!-- END_aa6b6df1c7fa425ed33849e3bd323b5b -->

<!-- START_99aecbf73cc1b6b537760aed7104be26 -->
## Удаление марки

> Example request:

```bash
curl -X DELETE "http://marshal/api/carbrand-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/carbrand-delete/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/carbrand-delete/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID марки

<!-- END_99aecbf73cc1b6b537760aed7104be26 -->

#CarBrand

API методы для работы с моделями автомобилей
<!-- START_0fb8c82cae07f2e3c3ffb70fcb88c0ae -->
## Получение списка моделей машин

> Example request:

```bash
curl -X GET -G "http://marshal/api/carmodels" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/carmodels");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/carmodels`


<!-- END_0fb8c82cae07f2e3c3ffb70fcb88c0ae -->

<!-- START_cd79f5317500db45acc17082ef273c9c -->
## Получение списка моделей конкретной марки

> Example request:

```bash
curl -X GET -G "http://marshal/api/models" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"car_brand_id":1}'

```

```javascript
const url = new URL("http://marshal/api/models");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "car_brand_id": 1
}

fetch(url, {
    method: "GET",
    headers: headers,
    body: body
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
`GET api/models`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    car_brand_id | integer |  optional  | ID марки

<!-- END_cd79f5317500db45acc17082ef273c9c -->

<!-- START_870ad1ac852b769f132ee3a334c3ef03 -->
## Получение данных по модели

> Example request:

```bash
curl -X GET -G "http://marshal/api/carmodel/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/carmodel/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/carmodel/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID модели

<!-- END_870ad1ac852b769f132ee3a334c3ef03 -->

<!-- START_9a5f1a20f610b9b354656cc7062aad70 -->
## Добавление модели

> Example request:

```bash
curl -X POST "http://marshal/api/carmodel-add" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"car_model":"Astra","car_brand_id":2}'

```

```javascript
const url = new URL("http://marshal/api/carmodel-add");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "car_model": "Astra",
    "car_brand_id": 2
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
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
`POST api/carmodel-add`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    car_model | string |  optional  | Модель
    car_brand_id | integer |  optional  | ID марки

<!-- END_9a5f1a20f610b9b354656cc7062aad70 -->

<!-- START_df384e0592b162816baf342e7ddf32c8 -->
## Изменение модели

> Example request:

```bash
curl -X PUT "http://marshal/api/carmodel-update/{id}" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"car_model":"Opel","car_brand_id":2}'

```

```javascript
const url = new URL("http://marshal/api/carmodel-update/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "car_model": "Opel",
    "car_brand_id": 2
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
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
`PUT api/carmodel-update/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    car_model | string |  optional  | Модель
    car_brand_id | integer |  optional  | ID марки
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID модели

<!-- END_df384e0592b162816baf342e7ddf32c8 -->

<!-- START_e583d8d756ef5459d24eebf16f473716 -->
## Удаление модели

> Example request:

```bash
curl -X DELETE "http://marshal/api/carmodel-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/carmodel-delete/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/carmodel-delete/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID модели

<!-- END_e583d8d756ef5459d24eebf16f473716 -->

#Category

API методы для работы с категориями
<!-- START_109013899e0bc43247b0f00b67f889cf -->
## Получение списка категорий

> Example request:

```bash
curl -X GET -G "http://marshal/api/categories" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/categories");

let headers = {
    "Authorization": "Bearer {token}",
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
curl -X GET -G "http://marshal/api/category/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/category/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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
curl -X POST "http://marshal/api/category-add" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/category-add");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`POST api/category-add`


<!-- END_0a11b0eb186d7dd32d34472a639afeb4 -->

<!-- START_bc5a68f03fdde1265e94acde87f4b417 -->
## Изменение категории

> Example request:

```bash
curl -X PUT "http://marshal/api/category-update/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/category-update/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`PUT api/category-update/{id}`


<!-- END_bc5a68f03fdde1265e94acde87f4b417 -->

<!-- START_884b14946889011c735504c58cc4eed4 -->
## Удаление категории

> Example request:

```bash
curl -X DELETE "http://marshal/api/category-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/category-delete/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/category-delete/{id}`


<!-- END_884b14946889011c735504c58cc4eed4 -->

#Message

API методы для работы с сообщениями
<!-- START_c61e9c2b3fdeea56ee207c8db3d88546 -->
## Получение списка сообщений

> Example request:

```bash
curl -X GET -G "http://marshal/api/messages" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/messages");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/messages`


<!-- END_c61e9c2b3fdeea56ee207c8db3d88546 -->

<!-- START_ad3844700cec77fd28fd7c7f97f6e087 -->
## Получение списка сообщений для ответа

> Example request:

```bash
curl -X GET -G "http://marshal/api/answerMessages" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/answerMessages");

    let params = {
            "answer_id": "6IREBqI4RdmNid1R",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/answerMessages`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    answer_id |  required  | ID ответа

<!-- END_ad3844700cec77fd28fd7c7f97f6e087 -->

<!-- START_1f140340ce023e790c35181bfe2ff246 -->
## Получение данных по сообщению

> Example request:

```bash
curl -X GET -G "http://marshal/api/message/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/message/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/message/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID сообщения

<!-- END_1f140340ce023e790c35181bfe2ff246 -->

<!-- START_6151e138de030bf121525bbe10ba43b5 -->
## Создание нового сообщения

> Example request:

```bash
curl -X POST "http://marshal/api/message-add" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"answer_id":4,"user_id":1,"message":"hello","attachment":"G4Pl60k0Hrztu81N"}'

```

```javascript
const url = new URL("http://marshal/api/message-add");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "answer_id": 4,
    "user_id": 1,
    "message": "hello",
    "attachment": "G4Pl60k0Hrztu81N"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
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
`POST api/message-add`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    answer_id | integer |  required  | ID ответа
    user_id | integer |  optional  | ID пользователя
    message | string |  optional  | сообщение
    attachment | string |  optional  | вложение

<!-- END_6151e138de030bf121525bbe10ba43b5 -->

<!-- START_572e7976574d0ce4f740defe3e5a3399 -->
## Изменение сообщения

> Example request:

```bash
curl -X PUT "http://marshal/api/message-update/{id}" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"answer_id":4,"user_id":1,"message":"hello","attachment":"MJB6S4gP6p5ZbzR9"}'

```

```javascript
const url = new URL("http://marshal/api/message-update/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "answer_id": 4,
    "user_id": 1,
    "message": "hello",
    "attachment": "MJB6S4gP6p5ZbzR9"
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
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
`PUT api/message-update/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    answer_id | integer |  optional  | ID ответа
    user_id | integer |  optional  | ID пользователя
    message | string |  optional  | сообщение
    attachment | string |  optional  | вложение
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID сообщения

<!-- END_572e7976574d0ce4f740defe3e5a3399 -->

<!-- START_e8adc2d02144370ed930106b8330a039 -->
## Удаление сообщения

> Example request:

```bash
curl -X DELETE "http://marshal/api/message-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/message-delete/{id}");

    let params = {
            "id": "q7UfPGZi3EX5xvg4",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/message-delete/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID сообщения

<!-- END_e8adc2d02144370ed930106b8330a039 -->

#Request

API методы для работы с заявками
<!-- START_8f3e0849f59d202e000098a13fc95f23 -->
## Получение списка заявок

> Example request:

```bash
curl -X GET -G "http://marshal/api/requests" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/requests");

let headers = {
    "Authorization": "Bearer {token}",
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

<!-- START_ac047069d815902d680786e49aee8877 -->
## Получение списка заявок пользователя

> Example request:

```bash
curl -X GET -G "http://marshal/api/userRequests" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/userRequests");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/userRequests`


<!-- END_ac047069d815902d680786e49aee8877 -->

<!-- START_8c27fe57ed283926960b1f2821c3dce9 -->
## Получение данных по заявке и списка ответов

> Example request:

```bash
curl -X GET -G "http://marshal/api/request/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/request/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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
curl -X POST "http://marshal/api/request-add" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/request-add");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`POST api/request-add`


<!-- END_4e156c3f4b1d4057d00862f18071d036 -->

<!-- START_01ceca6128a7cd6c8dca4cd4b3b7f0eb -->
## Изменение заявки

> Example request:

```bash
curl -X PUT "http://marshal/api/request-update/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/request-update/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`PUT api/request-update/{id}`


<!-- END_01ceca6128a7cd6c8dca4cd4b3b7f0eb -->

<!-- START_47d746fe47d935af7176bab8bd78afc0 -->
## Удаление заявки

> Example request:

```bash
curl -X DELETE "http://marshal/api/request-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/request-delete/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/request-delete/{id}`


<!-- END_47d746fe47d935af7176bab8bd78afc0 -->

#Shop

API методы для работы с магазинами
<!-- START_8f173edd89d1c1da6a80dad0d9d5121f -->
## Получение списка магазинов с категориями

> Example request:

```bash
curl -X GET -G "http://marshal/api/shops" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/shops");

let headers = {
    "Authorization": "Bearer {token}",
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
curl -X GET -G "http://marshal/api/shop/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/shop/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

<!-- START_bebfc0a8c45164027b88ad5710fe3437 -->
## Получить избранные магазины

> Example request:

```bash
curl -X GET -G "http://marshal/api/favorite-shops" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/favorite-shops");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/favorite-shops`


<!-- END_bebfc0a8c45164027b88ad5710fe3437 -->

<!-- START_c2ea90c93f08a6a9f395c7bf37ba570c -->
## Добавление нового магазина

> Example request:

```bash
curl -X POST "http://marshal/api/shop-add" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/shop-add");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`POST api/shop-add`


<!-- END_c2ea90c93f08a6a9f395c7bf37ba570c -->

<!-- START_4b1439459a6cf265dbdb516e6bfadf18 -->
## Обновление данных по магазину

> Example request:

```bash
curl -X PUT "http://marshal/api/shop-update/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/shop-update/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`PUT api/shop-update/{id}`


<!-- END_4b1439459a6cf265dbdb516e6bfadf18 -->

<!-- START_b7c0c2cfd1e39dd0697eb7d193abd036 -->
## Установить категории

> Example request:

```bash
curl -X PUT "http://marshal/api/shop-set-categories/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/shop-set-categories/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`PUT api/shop-set-categories/{id}`


<!-- END_b7c0c2cfd1e39dd0697eb7d193abd036 -->

<!-- START_21f421204fc013f8cc46abcab3f9a166 -->
## Добавить в избранное

> Example request:

```bash
curl -X PUT "http://marshal/api/favorite-shop-add/{id}" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"comment":"'\u041e\u0442\u043b\u0438\u0447\u043d\u044b\u0439 \u043c\u0430\u0433\u0430\u0437\u0438\u043d'"}'

```

```javascript
const url = new URL("http://marshal/api/favorite-shop-add/{id}");

    let params = {
            "id": "4",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "comment": "'\u041e\u0442\u043b\u0438\u0447\u043d\u044b\u0439 \u043c\u0430\u0433\u0430\u0437\u0438\u043d'"
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
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
`PUT api/favorite-shop-add/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    comment | string |  optional  | Комментарий
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID магазина

<!-- END_21f421204fc013f8cc46abcab3f9a166 -->

<!-- START_da04524bfcf3b0a5d5f4d0c73ee6b5e0 -->
## Удалить из избранного

> Example request:

```bash
curl -X PUT "http://marshal/api/favorite-shop-remove/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/favorite-shop-remove/{id}");

    let params = {
            "id": "4",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`PUT api/favorite-shop-remove/{id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID магазина

<!-- END_da04524bfcf3b0a5d5f4d0c73ee6b5e0 -->

<!-- START_163c55e940a56ff97ed791554db5e084 -->
## Удаление магазина

> Example request:

```bash
curl -X DELETE "http://marshal/api/shop-delete/{id}" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/shop-delete/{id}");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`DELETE api/shop-delete/{id}`


<!-- END_163c55e940a56ff97ed791554db5e084 -->

#User

API методы для работы с пользователями
<!-- START_c3fa189a6c95ca36ad6ac4791a873d23 -->
## login api

> Example request:

```bash
curl -X POST "http://marshal/api/login" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/login");

let headers = {
    "Authorization": "Bearer {token}",
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

> Example response (401):

```json
{
    "error": "Unauthorised"
}
```

### HTTP Request
`POST api/login`


<!-- END_c3fa189a6c95ca36ad6ac4791a873d23 -->

<!-- START_d7b7952e7fdddc07c978c9bdaf757acf -->
## Register api

> Example request:

```bash
curl -X POST "http://marshal/api/register" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.ru","password":"abS34T3fSg4","c_password":"abS34T3fSg4","initial":true}'

```

```javascript
const url = new URL("http://marshal/api/register");

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "name": "Test",
    "email": "test@test.ru",
    "password": "abS34T3fSg4",
    "c_password": "abS34T3fSg4",
    "initial": true
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "error": {
        "name": [
            "The name field is required."
        ],
        "email": [
            "The email field is required."
        ],
        "password": [
            "The password field is required."
        ],
        "c_password": [
            "The c password field is required."
        ]
    }
}
```

### HTTP Request
`POST api/register`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    name | string |  required  | Имя пользователя
    email | string |  required  | Email
    password | string |  required  | Пароль
    c_password | string |  required  | Повторить пароль
    initial | boolean |  optional  | Признак первичной регистрации

<!-- END_d7b7952e7fdddc07c978c9bdaf757acf -->

<!-- START_f50fecb2993d22653a99f84a5951e92c -->
## details api

> Example request:

```bash
curl -X GET -G "http://marshal/api/details" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/details");

let headers = {
    "Authorization": "Bearer {token}",
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

<!-- START_fc1e4f6a697e3c48257de845299b71d5 -->
## Получение списка пользователей

> Example request:

```bash
curl -X GET -G "http://marshal/api/users" \
    -H "Authorization: Bearer {token}"
```

```javascript
const url = new URL("http://marshal/api/users");

let headers = {
    "Authorization": "Bearer {token}",
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
`GET api/users`


<!-- END_fc1e4f6a697e3c48257de845299b71d5 -->

<!-- START_0adb2a0611d68b1dde0a5561bc20a189 -->
## Изменение профиля пользователя

> Example request:

```bash
curl -X PUT "http://marshal/api/user-update/{id}" \
    -H "Authorization: Bearer {token}" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.ru","password":"abS34T3fSg4","initial":true}'

```

```javascript
const url = new URL("http://marshal/api/user-update/{id}");

    let params = {
            "id": "1",
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let body = {
    "name": "Test",
    "email": "test@test.ru",
    "password": "abS34T3fSg4",
    "initial": true
}

fetch(url, {
    method: "PUT",
    headers: headers,
    body: body
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
`PUT api/user-update/{id}`

#### Body Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    name | string |  optional  | Имя пользователя
    email | string |  optional  | Email
    password | string |  optional  | Пароль
    initial | boolean |  optional  | Признак первичной регистрации
#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    id |  required  | ID пользователя

<!-- END_0adb2a0611d68b1dde0a5561bc20a189 -->


