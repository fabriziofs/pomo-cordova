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

Instalar módulos de node en caso de ser necesario

```
cd /tmp/MyApp
npm install
```
