# Pet Shop Tutorial

# Instalación

Para instalar las dependencias del proyecto, ejecutar el siguiente comando:

```
npm install
```

# Ejecución en desarrollo

Se puede iniciar la aplicación, con el siguiente comando:

```
npm run dev
```

# Package 

Se utiliza webpack para construir el proyecto, con un shortcut dentro del package.json. Para construirlo, simplemente ingresar el siguiente comando:

```
npm run build
```

![Pet Shop Build](images/pet-shop-build.png?raw=true "Pet Hop Build")

Eso genera el archivo [build.js](dist/build.js). Ese es el archivo a distribuir, el cual se puede validar, ejecutando:

```
npm start dist/build.js
```

Que nos debería mostrar algo como:

![Pet Shop Sample](images/pet-shop-sample.png?raw=true "Pet Hop Sample") 



