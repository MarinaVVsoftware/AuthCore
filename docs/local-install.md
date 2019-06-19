# Instalación Local

Para realizar la instalación en local es necesario realizar el siguiente proceso:

1. [Ejecutar Proyecto](#1-Ejecutar-el-proyecto)
2. [Validar con Insomnia](#2-Validar-con-Insomnia)

### 1. Ejecutar el proyecto

---

Para la ejecución basta con ir a Visual Studio Code y en una línea de comandos ejecutar el siguiente comando:

```bash
npm run local
```

### 2. Validar con Insomnia

---

Para verificar el funcionamiento del proyecto hay que hacer uso de Insomnia como **REST Client**. Para ello hay que seguir los siguientes pasos:

1. Descargar el proyecto de testing de AuthCore: [AuthCore Insomnia Workspace](https://github.com/MarinaVVsoftware/AuthCore/blob/master/docs/API%20testing/Authcore-Auth.json).
2. Importar mediante Insomnia.

![Import Insomnia](https://lh3.googleusercontent.com/n-gdaBkQjTbpQ0Y_MABthlPvr-Lf3tFIhs61Lz4szpbhuVh0O-o68poOYD9DyDgVYd-TWyru6rU)

3. Crear un **Private Environment** en Insomnia y colocar en formato json las credenciales del email de autenticación creado en el paso 1.

![Private Environment](https://lh3.googleusercontent.com/cdEFMKP6M8Ji-KtWz1XqcTNxBObKl6YXrSuFmUANqXY_v4BGVBcS4wz09Hr9d5DLpkxBYMTzRao)

```json
{
  "email": "email@email.com",
  "password": "password"
}
```

4. Activar el grupo de variables de entorno para el workspace

![Activate Environment](https://lh3.googleusercontent.com/KXchrfWHKIsxw4H2p1R2Cq7lxlK74eV5wcR5qtLlm8GojtTIu0oDmCztdXD4n4HGGNPdzvim9RY)

Con esto, el proyecto de testing queda configurado. Esta configuración sirve para el "chaining requests" configurado. El endpoint "Auth" al ejecutarse hace uso del correo configurado en Firebase, y entrega un JWT. Este "Token" sirve para acceder al resto de los endpoints de AuthCore, los cuales están bloqueados por protección de autenticación.

> _NOTA: Aquí se hace énfasis en la seguridad de los datos sensibles usados para configurar AuthCore._

5. Ejecutar Endpoint **Auth**. Debe retornar correctamente un Json Web Token.

[Volver al inicio.](#Instalación-Local)
