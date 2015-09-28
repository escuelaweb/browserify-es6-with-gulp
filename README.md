# Usando Browserify y babel con Gulp

Siguiendo en la linea del articulo anterior [sobre automatizar tareas con gulp](http://blog.escuelaweb.net/automatizar-tareas-en-frontend-usando-gulp/). Queremos mejorar nuestra experiencia al momento de escribir Javascript, una de las formas que podemos lograr esto es usando las propiedades más actualizadas del lenguaje que vienen con ecmascript 2015 y [babeljs](https://babeljs.io/) y browserify que es una herramienta que nos permite usar al mas puro estilo de node el require para definir depedencias de archivos o herramientas JS.

Les recomiendo leer sobre todas las funciones y características que tiene ES2015 en la [documentación de babel](https://babeljs.io/docs/learn-es2015/)

Aca dejo el URL del repositorio en Github y de la pagina en Github donde pueden ver el resultado en su browser.

### Configuración de Gulp

Primero instalamos los plugins de gulp que necesitaremos para nuestro proyecto: 

```bash
npm install --save-dev gulp gulp-sass browserify vinyl-source-stream babelify gulp-webserver gulp-sass
```

La configuración de nuestro Gulp básico seria la de nuestro archivo gulpfile.js 

Con esta configuración tendremos un gulp server que intentaría hacer un livereload con cada cambio que suceda en los archivos sass, javascript o html. 

Permitiéndonos usar babeljs para crear escribir nuestro Javascript o browserify para incluir módulos desde npm (módulos como jQuery o cualquier otro).
