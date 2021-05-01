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

#### Dentro del contenedor

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
cordova platform add android@9.0.0
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

Clonamos este repositorio, por ejemplo con SSH

```
git clone git@github.com:Fabriziofs/pomo-cordova.git
```

Generamos la imágen y levantamos los contenedores a la vez

```
cd pomo-cordova/
docker-compose up -d
```

Iniciamos una terminal interactiva dentro del contenedor.

```
docker-compose exec cordova bash
```

#### Dentro del contenedor

instalamos las dependencias de node

```
cd /tmp/MyApp
npm install
```

Instalamos las plataformas que vamos a usar

```
cordova platform add browser android@9.0.0
```
