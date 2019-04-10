# MarinaCore



### guia de routes, controllers y response methods
http://expressjs.com/en/guide/routing.html

### tipos de parámetros en API's, Buenas prácticas
https://stackoverflow.com/questions/4024271/rest-api-best-practices-where-to-put-parameters

hay 4 tipos de parámetros:

- Locators - identificadores de recursos como ID's, vista de la página, etc.
- Filters - busquedas, ordenamientos, paginados, resultados.
- States - session identifier, api keys.
- Content - Data y contenido.

hay 4 lugares donde colocar estos parámetros:

- Request headers & cookies
- URL query string ("GET" vars) (tipo example.com/pages?param1=data)
- URL paths (tipo example.com/user1)
- Body query string/multipart ("POST" vars)

las maneras de usarse (reglas de uso de parámetros) son:

1. *Locators* se colocan en el URL path.
2. *States* se alojan en los headers 
3. *Filters* se colocan como variables en la URL para envíos GET
4. *Content* se ubica en el body de métodos POST

### Códigos de estados

#### 1xx Informational

- 100 Continue

#### 2xx Sucess

- 200 Ok
- 201 Created
- 204 No Content

#### 3xx Redirection

- 304 Not Modified

#### 4xx Client Error

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

#### 5xx Server Error

- 500 Internal Server Error