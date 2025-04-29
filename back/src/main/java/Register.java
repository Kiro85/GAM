
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Register() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// actualizamos la lista de usuarios
		try {
			Main.updateUsers();
		} catch (Exception e) {
			System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
		}

		// Obtenemos credenciales
		String username = null;
		String password = null;
		String repeatPassword = null;
		try {
			username = request.getParameter("username");
			password = request.getParameter("password");
			repeatPassword = request.getParameter("repeatPassword");
		} catch (Exception e) {
			System.out.println("Error al obtener credenciales: " + e.getMessage());
		}

		// Comprobamos que la contraseña nueva coincida con la repetición de la misma
		boolean correctPassword = false;
		if (password.equals(repeatPassword)) {
			correctPassword = true;
		}

		// Comprobamos que el usuario no exista
		boolean exists = false;
		try {
			exists = Main.searchIfUserExists(username);
		} catch (Exception e) {
			System.out.println("Error al comprobar existencia de usuario: " + e.getMessage());
		}

		// Si no existe, creamos el usuario
		boolean error = false;
		if (!exists) {
			error = User.createUser(username, password, Main.getUsers());
		}

		// Devolvemos la respuesta
		try {
			if (!correctPassword) {
				response.getWriter().append("Las constraseñas introducidas no coinciden.");
			} else if (exists) {
				response.getWriter().append("El usuario ya existe");
			} else if (error) {
				response.getWriter().append("Ha ocurrido un problema en el servidor");
			} else {
				response.getWriter().append("Usuario creado con éxito!");
			}
		} catch (Exception e) {
			System.out.println("Error al enviar respuesta: " + e.getMessage());
		}
	}

}
