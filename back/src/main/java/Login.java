

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
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
		try {
			username = request.getParameter("username");
			password = request.getParameter("password");
		} catch (Exception e) {
			System.out.println("Error al obtener credenciales: " + e.getMessage());
		}

		// llamamos al metodo para autentificar usuario
		boolean found = false;
		try {
			found = Main.authUser(username, password);
		} catch (Exception e) {
			System.out.println("Error al autentificar usuario: " + e.getMessage());
		}

		// si el usuario existe, generamos un token y lo enviamos
		try {
			if (found) {
				String token = UUID.randomUUID().toString();
				Main.assingTokenToUser(username, token);
				response.getWriter().append(token);
			} else {
				response.getWriter().append("!found");
			}
		} catch (Exception e) {
			System.out.println("Error al enviar respuesta: " + e.getMessage());
		}

		// Testing
		Main.showUsers();
	}
}

