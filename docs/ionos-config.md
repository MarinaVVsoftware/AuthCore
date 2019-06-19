# Configuración de proveedor 1&1

La siguiente guía tiene como propósito servir para la configuración del proyecto "AuthCore" mediante la infraestructura del proveedor [1&1](https://www.ionos.mx/).

> _Cabe mencionar que el proyecto original fue provisto con este proveedor, mediante un [Servidor VPS Gestionado](/https://www.ionos.mx/servidores/vps) de tipo XXL. Se Gestiona con la plataforma Plesk y el servidor trabaja bajo el S.O. Linux. Esta guía se limita exclusivamente a configuraciones basadas en dichas especificaciones._

Se infiere que para esta guía el lector ya tiene una cuenta de 1&1, donde adquirió por lo menos un dominio y un servidor VPS Gestionado.

Los pasos a seguir en esta guía son los siguientes:

1. [Configuración de dominios o subdominios en 1&1](#1.-Configuración-de-dominios-o-subdominios-en-1&1)

### 1. Configuración de dominios o subdominios en 1&1

---

1. Ir a la plataforma de 1&1.
2. Iniciar sesión.
3. Entrar al panel personal.
4. Entrar a la sección "Dominios y SSL".
5. Crear un dominio o subdominio nuevo (sea el caso).
6. Modificar los records DNS "A" y "AAAA" con las direcciones IPv4 e IPv6 del servidor VPS (hacer la modificación solo para aquellos records del dominio o subdominio creado). son 4 registros en total por dominio:

- registro "A" de tipo normal.
- registro "AAAA" de tipo normal.
- registro "A" de tipo www.
- registro "AAAA" de tipo www.

Terminando de realizar este proceso el dominio o subdominio estará listo y apuntando al servidor VPS.

> _NOTA: El servidor original fue provisto mediante un subdominio._
