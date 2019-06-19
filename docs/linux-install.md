# Configuración en Servidor Linux

Antes de realizar la instalación del proyecto ya sea en un entorno local o productivo, es necesario realizar un conjunto de preparaciones previas:

1. [Acceder al servidor Linux](#1-Crear-un-proyecto-de-firebase)
2. [Verificar instalaciones](#2-Verificar-instalaciones)
3. [Instalar proyecto](#3-Instalar-proyecto)
4. [Gestionar deploy con pm2](#4-Gestionar-deploy-con-pm2)

### 1. Acceder al servidor Linux

---

> _Lista de comandos útiles:_

```bash
// para ver la lista de directorios en la ubicación
> ls - plutona

// para matar procesos de node estancados
> kill -9 [pid]

// para eliminar la instalación de node
> rm -rf node_modules/ && rm package-lock.json

> pm2 stop [app-name]
> pm2 restart [app-name]
> pm2 monit
```

1. Acceder via SSH con PuTTY. Los datos de acceso se encuentran en el panel de 1&1, el usuario suele ser root por defecto y la contraseña suele ser la misma que la contraseña de Plesk.

### 2. Verificar instalaciones

1. Seguir los siguientes comandos para verificar las instalaciones de node, npm, nvm y pm2. Si alguno no se encuentra hay que instalarlo.

```bash
> node -v
> npm -v
> nvm ls
> pm2 -v
```

Si todas las instalaciones son correctas, entonces se puede proseguir. Siempre se debe mantener la versión mas actual de node.js activa con nvm, si no se encuentra seleccionada hay que cambiarla.

---

### 3. Instalar proyecto

---

1. ir al folder del proyecto.

```bash
> cd ..
> cd /var/www/vhosts/
> cd [folder raíz]
> cd [folder del proyecto de node bajo el nombre del dominio]
```

2. Instalar las dependencias del proyecto.

```bash
> npm install
```

3. Verificar que se haya creado el archivo package-lock.json.

### 4. Gestionar deploy con pm2

---

1. Abrir la lista de servers con pm2.

```bash
> pm2 ls
```

2. Hacer deploy del proyecto a través de pm2.

```bash
> pm2 start npm --name "[nombre del proyecto]" -- run [script]
```

> _El nombre del proyecto lleva comillas en el comando. Todo sin brackets. Esto solo se puede hacer si se está sobre la ubicación del proyecto dentro de linux. El commando "run" va separado de los guiones (es parte de la sintaxis del comando)._

> _En caso de ejecutar una instancia de producción, usar el script: "prod:deploy"._

> _En caso de ejecutar una instancia de development, usar el script: "dev:deploy"._

listo, el proyecto esta vivo en un entorno productivo.
