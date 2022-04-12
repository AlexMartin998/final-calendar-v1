# Conectar Front (Ract) con Back (Node)

## Inicio:
  - Juntamos los proyectos fron y back en el mismo folder
  - Iniciamos cada app
  - 

  - Creamos enviroment variables para produccion y para devel (FRONT)
    - .env.production
    - .env.development

  - Auth Reducer
    - Creamos el reducer <-  authReducer
      - checking = true <-  Aun no responde el back si el user esta auth
    - Creamos los types
    - Creamos los actions

  - Disparar la accion de inicio del login de usuario
    - Validar los campos del form tanto en el front como en el back
      - En el back ya esta
      - Falta en el front


  - Mantener el estado de la autenticación
    - Renew token para revisar si el token es valido
      - Esto genera un nuevo token si el token inicial es valido
        - Le da mas tiempo en la sesion al user logueado
    - En el helper  fetch.js debemos enviar el token <- lo obtenemos del localStorage
      - En este caso lo obtenemos del localStorage, si lo hubieramos guardado en las cookies, pues lo obtenemos de ahi
      - Lo enviamos en los header:
        'x-token': localStorage.getItem('token') || '',


  - Proteccion de nuestras rutas
    - En funcion del  uid  del store


  - Logout y nombre de usuario
    - En las f(x) NO se debe llamar el localStorage
    - 
