# pomo-cordova

Aplicación multiplataforma desarrollada con Apache cordova.

### Configurando el entorno de docker

---

Para generar la imágen y levantar los contenedores a la vez.

```
docker-compose up -d
```

### Inicializando el proyecto dentro de docker.

Primero iniciamos una terminal interactiva dentro del contenedor.

```
docker-compose exec cordova bash
```

Instalar módulos de node en caso de ser necesario.

```
cd /tmp/MyApp
npm install
```

Añadimos las plataformas que vamos a usar.

```
cordova platform add browser
cordova platform add android
```

Ejecutamos la aplicación en el navegador.

```
cordova run browser
```

Construimos un .apk de nuestra aplicación.

```
cordova build android
```
