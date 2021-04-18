# pomo-cordova

Aplicación multiplataforma desarrollada con Apache cordova.

### Configurando el entorno de docker

---

Para generar la imágen y levantar los contenedores a la vez.

```
docker-compose up -d
```

### Inicializando el proyecto dentro de docker por primera vez

Primero iniciamos una terminal interactiva dentro del contenedor.

```
docker-compose exec cordova bash
```

Cambimos permisos del directorio de nuestro proyecto.

```
cd /tmp
sudo chown docker MyApp/
```

Creamos el proyecto con cordova

```
cd /tmp
cordova create MyApp
```

Añadimos las plataformas que vamos a usar.

```
cd /tmp/MyApp
cordova platform add browser
cordova platform add android
```

Ejecutamos la aplicación en el navegador.

```
cd /tmp/MyApp
cordova run browser
```

Si queremos construir un .apk de nuestra aplicación.

```
cd /tmp/MyApp
cordova build android
```

## Si vamos a trabajar con el proyecto de este repositorio

Instalar las dependencias de node

```
cd /tmp/MyApp
npm install
```
