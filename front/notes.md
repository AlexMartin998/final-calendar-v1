# SASS

### Inicio
  - W con    React Router DOM v5    xq aun es la mas utilizada.
    - Aprende como es con la v5  xq  con la v6 ya aprendimos en las secciones pasadas (actualizadas <- HeroApp).
        npm i react-router-dom@5.3.0

  -- TAREA: Pasar a React Router DOM  v6



## React Router DOM v6:
### Consideraciones:
  - Router ahora es  BrowserRouter
  - Switch ya NO existe, ahora es  <Routes></Routes>
  - Route tiene   path  y  element={<Component/>}
  
  - NavLink:
    - activeClassName ya NO existe
    - exact Reemplazado por   end

  - Upgrading 
    https://reactrouter.com/docs/en/v6/upgrading/v5



  - Structura de un Rotuer con React Router DOM v6
      <Router> <Routes> <Route path='' element={ <Component /> } /> </Routes> </Router>
  
  - Redireccionar al login si NO existe la URL:
      <Route path="*" element={<Navigate to="/login" replace />} />

  



  - Clase de Ruta Activa:
    - className={}  <- recive props como arg. y este tiene   isActive
      - isActive  indica si el  to={}  del NavLink coincide con la Route
          className={ ({ isActive }) =>
            'nav-item nav-link ' + (isActive ? 'active' : '')
          }

  - Router Hijas: Anidar rutas / Multiples Routers
    - Si ya tengo un BrowserRouter en el parent, las hijas NO deben tenerla



## App
  - Crear Modal / Ventana Modal: 
    npm install --save react-modal

  - Vamos a W con Redux para tener acceso al modal en cualquier lugar de la app


  - Contenido del EventModal
      npm i react-datetime-picker
    - Seleccionar fechas

  - Obtener la información del formulario del evento
    - Si el evento NO tiene ID, es nuevo
    - Si tiene el ID, viene de la DB



  - Validaciones del formulario
    npm install sweetalert2

    https://sweetalert2.github.io/#examples



  - Instalación y configuración de Redux  -  State de la App <- Store
    -  npm install react-redux redux redux-thunk
    -  Se crea la estructura del Redux
       -  /types  /store  /reducers  /actions
    -  Tenemos las acciones para abrir y cerrar el modal


  - CalendarReducer y primeras acciones con los eventos
    - Con el  dispatch()  del Redux  se hace super facil :C

  - Editar el evento activo
    - Si el   activeEvent <- Store   - Cuando se abre el Modal
      - null: Estoy creando un evento
      - {}: Editando el evento