import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class AddFriend
 */
@WebServlet("/AddFriend")
public class AddFriend extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddFriend() {
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
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Actualizamos la lista de usuarios
		try {
			Main.updateUsers();
		} catch (Exception e) {
			System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
		}

		// Obtenemos los parámetros
		String userToken = request.getParameter("userToken");
		String friendUsername = request.getParameter("friendUsername");

		// Buscamos el usuario por token
		int userIndex = Main.searchUserByToken(userToken);

		// Buscamos el amigo por username
		int friendIndex = Main.searchUser(friendUsername);

		// Obtenemos los usuarios
		User user = Main.getUsers().get(userIndex);
		User friend = Main.getUsers().get(friendIndex);

		try {
			// Agregamos el amigo
			user.addFriend(friend.getId());
			response.getWriter().append("Amigo agregado con éxito");
		} catch (Exception e) {
			System.out.println("Error al agregar amigo: " + e.getMessage());
			response.getWriter().append("Error al agregar amigo: " + e.getMessage());
		}
	}

}
