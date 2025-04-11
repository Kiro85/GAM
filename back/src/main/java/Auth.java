import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Servlet implementation class Auth
 */
@WebServlet("/Auth")
public class Auth extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Auth() {
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

		// llamamos al metodo para buscar usuario
		boolean found = false;
		try {
			found = auth(Main.getUsers(), username, password);
		} catch (Exception e) {
			System.out.println("Error al autenticar usuario: " + e.getMessage());
		}

		// si el usuario existe, creamos una sesion
		try {
			if (found) {
				response.getWriter().append("found");
			} else {
				response.getWriter().append("!found");
			}
		} catch (Exception e) {
			System.out.println("Error al enviar respuesta: " + e.getMessage());
		}

		// Testing
		//
		Main.showUsers();
		//
		//
	}

	// Methods
	public boolean auth(ArrayList<User> users, String username, String password) {
		boolean found = false;

		// buscamos el usuario en la lista
		try {
			int i = 0;
			do {
				if (users.get(i).getUserName().equals(username) && users.get(i).getPassword().equals(password)) {
					found = true;
				} else {
					i++;
				}
			} while (!found && i < users.size());
		} catch (Exception e) {
			System.out.println("Error al buscar el usuario: " + e.getMessage());
		}

		return found;
	}

}
