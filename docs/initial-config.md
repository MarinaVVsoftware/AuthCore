# Configuración Inicial del Proyecto

Antes de realizar la instalación del proyecto ya sea en un entorno local o productivo, es necesario realizar un conjunto de preparaciones previas:

1. [Crear un proyecto de Firebase](#1-Crear-un-proyecto-de-firebase)
2. [Preparar entorno de desarrollo](#2-Preparar-entorno-de-desarrollo)
3. [Preparar variables de entorno y keys](#3-Preparar-variables-de-entorno-y-keys)

### 1. Crear un proyecto de firebase

---

El proyecto consume los servicios de **Firebase Authentication** y **Firebase Realtime Database**. Es importante habilitar dichos servicios en una cuenta de Firebase y entregar las credenciales de acceso a AuthCore para que consuma dichos servicios.

> _NOTA: Para la configuración de Firebase se requiere crear una cuenta de Firebase, la cual solicita un correo electrónico válido. Se recomienda conservar dicho correo para el resto de las configuraciones del proyecto_.

Para efectos de esta guía, se recomienda seguir el siguiente **enlace oficial de Firebase sobre como crear y configurar un proyecto** en su plataforma: [Tutorial: Agrega Firebase a tu App](https://firebase.google.com/docs/admin/setup/?hl=es-419#add_firebase_to_your_app). Posterior a la configuración del proyecto, Firebase permitirá descargar un archivo tipos .json con los datos de configuración necesarios. Adicionalmente, en la configuración del proyecto se encuentra una sección para configurar Firebase Client, con las credenciales expuestas. Es necesario tanto las credenciales privadas (json) como las expuestas.

Es necesario obtener la url de las bases de datos de Firebase y en cada una copiar el siguiente grupo de reglas:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Es necesario generar 2 proyectos dentro de la plataforma de Firebase, dado que el sistema opera mediante 2 instancias (una productiva, y otra de desarrollo y testing). El resultado de este proceso debe ser dos conjuntos de datos sensibles como los siguientes:

##### **Firebase Server Credentials**

```
type
project_id
private_key_id
private_key
client_email
client_id
auth_uri
token_uri
auth_provider_x509_cert_url
client_x509_cert_url
```

##### **Firebase Client Credentials**

```
api_key
auth_domain
database_url
project_id
storage_bucket
messaging_sender_id
```

##### **Firebase Database Credentials**

```
database_url
```

Al terminar toda la configuración de Firebase y obtención de credenciales, hace falta crear un usuario de autenticación en cada proyecto. Para ello solo hay que ir al servicio de "Firebase Authentication" y darle al botón "Añadir Usuario". Los correos y contraseñas usadas deben guardarse para pasos posteriores de la guía.

![firebase auth](https://lh3.googleusercontent.com/PMF1cN44BRNPOgO8FUJ_BkQ5x2_6OmlhcRLF-Wlb4FLYqND3LNFMHxTeCqTfiR3Zjn-XYDHUdcQ)

### 2. Preparar entorno de desarrollo

---

En caso que intente realizar la instalación de este repositorio en una estación de trabajo, manténgase en esta guía. Si desea instalar este repositorio en un servidor para hacer su despliegue para consumo público, diríjase al primero de los tres tutoriales de instalación productiva: [Sección 1 - Configuración de servicios con el proveedor 1&1](https://github.com/MarinaVVsoftware/AuthCore/blob/master/docs/ionos-config.md).

Antes de realizar la instalación del proyecto es necesario preparar la estación de trabajo con las herramientas y software necesario para su ejecución. A continuación la lista de software requerido por el proyecto:

- se recomienda que la estación de trabajo opere con S.O. Windows 10 actualizado.
- [Node.js](<[https://nodejs.org/es/](https://nodejs.org/es/)>) 12.4.0 o superior.
- [npm](<[https://github.com/npm/cli/releases/tag/v6.9.0](https://github.com/npm/cli/releases/tag/v6.9.0)>) 6.9.0 o superior.
- [Visual Studio Code](<[https://code.visualstudio.com/](https://code.visualstudio.com/)>) 1.35 o superior. - Instalar el plugin de VSC [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (Obligatorio). - instalar el plugin de VSC [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens) (Opcional). - instalar el plugin de VSC [Ad jsdoc comments](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments) (Opcional).
- [Insomnia](<[https://insomnia.rest/download/](https://insomnia.rest/download/)>) 6.5.4 o superior.
- [Github Desktop](<[https://desktop.github.com/](https://desktop.github.com/)>) 2.0.4 o superior.

> _NOTA: Esta guía se reserva únicamente como guía de instalación del proyecto **"AuthCore"** y por tanto es responsabilidad del lector investigar sobre la instalación y configuración de cada uno de los softwares requeridos._

Una vez instalado y configurado el software requerido, es necesario seguir los siguientes pasos para prepara el entorno de desarrollo:

1. A través de **Github Desktop** clonar el [repositorio de AuthCore](<[https://github.com/MarinaVVsoftware/AuthCore](https://github.com/MarinaVVsoftware/AuthCore)>).
2. Abrir el proyecto clonado con **Visual Studio Code**. Si está sobre Github Desktop, presionar el atajo <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>A</kbd>.
3. Dentro de Visual Studio Code presionar el atajo <kbd>CTRL</kbd>+<kbd>Ñ</kbd> para **abrir una consola de línea de comandos**.

> _Esta consola debe abrirse con el cli de CMD, dado que esta guía se explica bajo el mismo. Si VSC abre la consola con Bash, Git, PowerShell u otro, es responsabilidad del lector investigar como configurarlo o traducir la guía a otra línea de comandos._

5. **Verificar** las instalaciones y versiones de **node.js** y **npm** con los siguientes comandos:

   node -v
   npm -v

6. Si no arroja errores, y las versiones son las especificadas por esta guía, entonces se procede a **instalar las dependencias** ejecutando el siguiente comando:

   npm install

7. Si la instalación se realizó correctamente, en el archivo raíz del proyecto clonado se habrá generado un archivo "package-lock.json" y un folder llamado "node_modules" con la instalación de las dependencias del proyecto.

### 3. Preparar variables de entorno y keys

---

Para que el proyecto funcione requiere ciertos **datos que no pueden ser expuestos al público** (ya que comprometería la seguridad de la aplicación). Estos datos se proveen mediante 3 archivos dentro del folder del proyecto, a continuación se explica como generarlos y donde ubicarlos:

##### **Archivo .env**

este archivo se ubica en la raíz de la carpeta del proyecto (a la altura del folder **./src** ). Se nombra como **".env"**.

![env file](https://lh3.googleusercontent.com/j_c-iIo7viWRRe2hKe8SUbUjSmbwqd4ueDiVOl0gz4HX1hI1Sy56g4vJd4D2sE_p5F_GpLp0vRs)

En esta url [Template Variables de Entorno de AuthCore](https://github.com/MarinaVVsoftware/AuthCore/blob/master/docs/templates/env.md) se encuentra un template del contenido del archivo **.env**. Debe llenarse correctamente para el adecuado funcionamiento de **AuthCore**.

> _Se recomienda cambiar los valores de puertos. Use puertos entre los valores 2015-49151 que no estén siendo usados por ninguna otra aplicación. Deben cambiarse tanto en los campos **\_HOST** como **\_PORT**._

> _los campos **\_HOST** y **\_PORT** locales deben ser iguales a los de desarrollo, y por convención development tiene el puerto anterior al de producción (si prod tiene el puerto 4000, dev tiene 3999). development debe tener un puerto diferente siempre. Estas reglas sirven para los deploys en servidores._

> _En el campo **DEV_EMAILS** hay que colocar el o los correos configurados en Firebase Authentication. Esto es **Obligatorio**, ya que el sistema requiere esos datos para autenticar con Insomnia y testear el funcionamiento de AuthCore._

> _Se recomienda mantener un respaldo de estos archivos de variables de entorno en lugares seguros como "Bóvedas Digitales"._

> _NOTA: En caso que necesite hacer uso de las cuentas, configuraciones y servidores de la empresa "Marina V&V", comunicarse con la misma para la solicitud de dicha información. La empresa posee respaldos en Bóvedas Digitales de las variables de entorno de las aplicaciones, si usted está configurando los sistemas de la empresa, puede requerir los existentes._

##### **Archivos public.key y private.key**

Estos archivos se deben alojar en un folder llamado "keys" a la altura del folder **./src**, y se deben nombrar exactamente "public.key" y "private.key".

![keys](https://lh3.googleusercontent.com/m7jcXoCk0qb-A6bx8tDsRC0GKzCytaCDBWHdPyYzrTWrs9TGrV6Ec4-byJcxtYzDvuOhWUNlm-I)

Dentro, deben contener claves de firma RSA con SHA-256 de 256 bits encriptadas que sirven para la autenticación entre las diferentes aplicaciones del sistema. Se adjunta la siguiente url para generar el par de llaves encriptadas en caso de no poseerlas: [rsa-key-generator online](http://csfieldguide.org.nz/en/interactives/rsa-key-generator/index.html).

el contenido de las keys debe llevar la siguiente sintaxis (sin las llaves "<>" ):

```
-----BEGIN PUBLIC KEY-----
<key>
-----END PUBLIC KEY-----
```

```
-----BEGIN PRIVATE KEY-----
<key>
-----END PRIVATE KEY-----
```

[Volver al inicio.](#Configuración-Inicial-del-Proyecto)
