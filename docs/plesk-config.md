# Configuración en Plataforma Plesk

La siguiente guía tiene como propósito servir para la configuración del proyecto "AuthCore" mediante la plataforma de gestión de servidores [Plesk](https://www.plesk.com/).

los pasos a seguir son los siguientes:

1. [Configuración de dominio o subdominio en Plesk](#1-Configuración-de-dominio-o-subdominio-en-Plesk)
2. [Instalación del proyecto en Plesk](#2-Instalación-del-proyecto-en-Plesk)

### 1. Configuración de dominio o subdominio en Plesk

---

> _NOTA: En este punto de la guía se infiere fuertemente que el lector tiene conocimientos sobre el uso de la plataforma Plesk, que ha configurado previamente el entorno de Plesk, ha instalado los plugins de "Let's Encrypt", "Node", y está familiarizado con la configuración de proyectos de Plesk._

1. Ir a Menu -> Hosting Services -> Domains
2. Seleccionar botón "añadir dominio" o "añadir subdominio"
3. Asignar el mismo nombre que del dominio creado con el proveedor.

> _NOTA: NO ASIGNAR certificado ssl. Aún no, se hace después._

4. Entrar al panel del dominio
5. Crear certificado SSL con el plugin de plesk de "Let's Encrypt".

- asignar un correo.
- marcar la casilla "include www".

6. Ir a la sección "Apache & nginx Settings".
7. Copiar el siguiente código nginx para proxear proyectos de node.js.

> _En la variable "port" (sin brackets) hay que colocar el puerto el cual se le va a asignar al proyecto de node.js. Hay que verificar que no sea un puerto que ya esté siendo usado dentro del sistema._

```nginx
location ~ / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://localhost:[port];
}
```

> _¿Como verificar los puertos? entrar a linux via SSH y ejecutar la siguiente lista de comandos:_

```bash
> cd ..
> netstat -plnt
```

esto arrojará la lista de puertos activos. Solo es necesario revisar que el puerto deseado no esté ocupado por algun servicio.

> _NOTA IMPORTANTE: El puerto que se utilice en el script proxy debe ser el mismo puerto de despliegue que se coloque en las variables de entorno de AuthCore. Si se está configurando un entorno de deploy para development, se usa el mismo puerto para dev._

### 2. Instalación del proyecto en Plesk

---

1. Ir al panel del dominio.
2. Entrar a la sección "file manager".
3. Borrar todos los archivos auto generados dentro de la carpeta raiz del dominio:

- favicon.ico
- index.html
- folders css
- folder img
- folder test

4. Regresar al panel del dominio.
5. Ir a la sección "git".
6. Seleccionar la opción "remote git hosting".
7. Ir al repositorio de github, del lado derecho, hacer click en el botón "clone or download".
8. copiar la web url del proyecto https://github.com/MarinaVVsoftware/AuthCore.git .
9. En la configuración de git en plesk, copiar la web url de github y darle ok.
10. Al terminar hay que configurar la rama, darle al botón "change branch and path" y seleccionar la rama correcta (si no fuese master).
11. Regresar al panel del dominio.
12. Ir a la sección "node.js".
13. Configurar node:

- cambiar "aplication root" a la misma ubicación que "document root" (o simplemente seleccionar la carpeta donde se ubicaron los archivos clonados de git).
- cambiar el nombre del "startup file" al mismo que del proyecto (ej, index.js).

> _Si todo se hace correctamente, del lado derecho habrá un recuadro llamado "Access to Configuration Files" con el package.json y el index.js._

14. Hacer click en "enable node.js" (esto es para que plesk pueda escuchar la app de node, aunque no esté 100% gestionada por plesk).
15. Regresar al panel del dominio.
16. Ir a la sección "file manager".
17. Copiar y pegar los archivos de datos sensibles (.env y .keys) necesarios para el proyecto dentro de la carpeta clonada del proyecto. Deben ubicarse en el mismo lugar que en el proyecto original (ir a [Configuración Inicial del Proyecto](https://github.com/MarinaVVsoftware/AuthCore/blob/master/docs/initial-config.md) para más detalles sobre como configurar variables de entorno).

[Volver al inicio.](#Configuración-en-Plataforma-Plesk)
