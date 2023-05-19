PRESTABOOK LEE SIN PARAR DESDE CUALQUIER LUGAR!!
Descripción
App desde la que puedes pedir prestado los libros que desees. En Prestabook podrás buscar los libros que deseas leer, ver la descripción del libro, valorar con me gustas y dejar tu comentario del libro para que otros usuarios se animen o no a leerlo, tener tu propia lista de libros leídos.

Perfil del Usuario
Una vez registrado y logeado, el usuario puede ver todos los libros de la plataforma y buscar los que desea leer, ver los detalles de libro en concreto y pedir prestado el libro. Una vez retornado este libro se pasará a un listado de libros leídos para que el usuario pueda tener en cuenta todos los libros ya leídos hasta el momento. Además, también podrá dar like y comentar cualquier libro.

Perfil Admin

El Administrador tendrá su pagina principal donde verá listado de todos los libros de la plataforma. Desde este perfil podrá añadir libros nuevos, editar o borrar los libros que ya no sean necesario. Además, podrá revisar los libros prestados a los usuarios y el stock que hay de cada libro.

ROUTES
GET "/"=> renderiza la pagina principal
GET "/auth/signup"=> renderiza el formulario de registro
POST "/auth/signup"=> recoge los datos del formulario de registro
GET "/auth/login" => renderiza un formulario de acceso a la web
POST "/auth/login" => recoge datos del formulario de login
GET "/auth/logout" cierra sesion activa y redirecciona a login
GET "/admin/index-admin" => renderiza la vista de la pagina de administrador
GET "/admin/create" => renderiza la vista del formulario de crear libros
POST "/admin/create" => recoge los datos del formulario de creacion de libros
GET "/admin/:id/edit" => renderiza la vista del formulario
POST "/admin/:id/edit" => recibe la informacion del formulario de editar
POST "/admin/:id/edit-img"=> recibir los datos de la imagen del formulario de editar
POST "/admin/:id/delete" => borrar libro por su id
GET "/admin/list-status" => renderiza la lista de libros prestados y retornados
GET "/book/:id"=> renderiza los detalles del libro
GET "/search-list" => renderiza la página de búsqueda
POST "/book/:id/prestado" => coger los datos de libro prestado, crear documento en préstamo con id de usuario y libro
POST "/book/:id/like" => recoge los datos del me gusta para añadirlo al array de like de Book
POST "/book/:id/nolike" => recoge los datos del me gusta para quitarlo a la array de like de Book
GET "/private/profile" => renderiza página privada del usuario ,lista de libros en préstamo y leídos
POST "/private/:id/retornado"
comentarios
POST "/comentario/:id/create" => recoge los datos del formulario de crear comentario


MODELS
Book.model: {title, sypnosis, numPag, autor, genre, likes, image, stock}
Comentario.model: {user, book, comentario}
Préstamo.models: {user, book, status}
User.model: {username, email, password, role, timestamps}

VISTAS
Admin: créate.hbs
	Edit.hbs
	Index-admin.hbs
	List-status.hbs
Auth: login.hbs
	Signup.hbs
Book: details.hbs
Profile: index-user.hbs
Index.hbs
Layout.hbs

Trello : https://trello.com/w/prestabooks
Repositorio git : https://github.com/redkouya/prestabook
Deploy : https://prestabook.adaptable.app/
Slices : https://docs.google.com/presentation/d/1kyn9inpcUTZSxeU9QhJzbrdMO5zNElAo5ZbnCY740Nw/edit#slide=id.p
