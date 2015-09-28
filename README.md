# Usando Browserify y babel con Gulp

Siguiendo en la linea del articulo anterior [sobre automatizar tareas con gulp](http://blog.escuelaweb.net/automatizar-tareas-en-frontend-usando-gulp/). Queremos mejorar nuestra experiencia al momento de escribir Javascript, una de las formas que podemos lograr esto es usando las propiedades más actualizadas del lenguaje que vienen con ecmascript 2015 y [babeljs](https://babeljs.io/) y browserify que es una herramienta que nos permite usar al mas puro estilo de node el require para definir depedencias de archivos o herramientas JS.

Les recomiendo leer sobre todas las funciones y características que tiene ES2015 en la [documentación de babel](https://babeljs.io/docs/learn-es2015/)

Aca dejo el URL del repositorio en Github y de la pagina en Github donde pueden ver el resultado en su browser.

### Configuración de Gulp

Primero instalamos los plugins de gulp que necesitaremos para nuestro proyecto: 

```bash
npm install --save-dev gulp gulp-sass browserify vinyl-source-stream babelify gulp-webserver gulp-sass
```

La configuración de nuestro Gulp básico sería similar a: 

```js
var gulp = require('gulp'),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    babelify = require("babelify"),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass');

var source_paths = {
  sass: './source/sass/**/*.scss',
  js: './source/js/app.js',
  all_js: './source/js/**/*.js',
  html: './source/html/**/*.html',
}

gulp.task('sass', function() {
  gulp.src(source_paths.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
})

gulp.task('copy', function() {
  gulp.src(source_paths.html)
    .pipe(gulp.dest('./build'));
})

gulp.task('bowersify', function() {
  browserify([source_paths.js], {
          transform: ['babelify']
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/js/'));
})

gulp.task('watch', ['sass','bowersify','copy'], function() {
  gulp.watch(source_paths.sass, ['sass'])
  gulp.watch(source_paths.all_js, ['bowersify'])
  gulp.watch(source_paths.html, ['copy'])
});

gulp.task('webserver', ['watch'],function() {
  gulp.src('build')
    .pipe(webserver({open: true, livereload: true}));
});

gulp.task('default', ['webserver']);
```

Con esta configuración tendremos un gulp server que intentaría hacer un livereload con cada cambio que suceda en los archivos sass, javascript o html. 

Permitiéndonos usar babeljs para crear escribir nuestro Javascript o browserify para incluir módulos desde npm (módulos como jQuery o cualquier otro).

### Ejemplo de uso de ES2015 y Browserify

Teniendo esta estructura de archivos dentro de la carpeta source

```bash
source
├── html
│   └── index.html
├── js
│   ├── app.js
│   └── timer.js
└── sass
    └── app.scss
```

El archivo app.js y timer.js tendran la siguiente estructura.

```js
// app.js
import jQuery from 'jquery'
import Timer from './timer.js'
  
jQuery(document).ready(function() {
  console.log('Cargando jQuery desde NPM')
  let timer = new Timer('.timer')
  timer.init()
  jQuery('.boton-con-click').click(() => {
    timer.toggle()
  })
})
```

```js
// timer.js

import jQuery from 'jquery'
  
class Test {
  constructor(element, ms = 1000) {
    this.elem = jQuery(element)
    this.count = 0
    this.interval = false
    this.ms $= ms
  }
  init() {
    console.log('Starting Timer')
    this.interval = setInterval(() => {this.updateTimer()}, this.ms)
  }
  updateTimer() {
    this.elem.html(this.count++) 
  }
  removeTimer() {
    console.log('Stoping Timer')
    clearInterval(this.interval)
    this.interval = false
  }
  toggle() {
    if(this.interval === false) {
      this.init()
    } else {
      this.removeTimer()
    }
  }  
}

export default Test
```

y el archivo HTML y SASS tendria la siguiente estructura.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prueba de Gulp</title>
  <link rel="stylesheet" href="css/app.css">
</head>
<body>
  
  <header>
    <h1>Este es un documento que usa gulp</h1>
  </header>
  
  <section>
    <div class="modulo">
      <div class="timer">0</div>
      <button class="boton-con-click">Toggle timer (stop/start)</button>
    </div>
  </section>
  
  <footer>
    <h6>Desarrollador por Sergio Marin para escuelaweb.net</h6>
  </footer>
  
  <script src="js/app.js"></script>
</body>
</html>
```

```sass
body {
  font-family: Helvetica;
}

h1, h2,h3,h4,h5,h6 {
  font-weight: normal;
}

a {
  color: aqua;
}

header,
footer {
  padding: 1em;
}

.modulo {
  border: 1px solid #ccc;
  margin: 1em;
  padding: 1em;
  h1 {
    color: darkgoldenrod;
  }
  button {
    display: inline-block;
    padding: 1em 2em;
    border: 1px solid #2980b9;
    background-color: #419fdd;
    box-shadow: 0 0 0 0 #fff;
    color: white;
    text-shadown: 0 -1px 0 #2980b9;
  }
}
```


