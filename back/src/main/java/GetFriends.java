import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class GetFriends
 */
@WebServlet("/GetFriends")
public class GetFriends extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetFriends() {
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
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		// Obtenemos los parametros
		String userToken = "";
		try {
			userToken = request.getParameter("userToken");
			if (userToken == null || userToken.isEmpty()) {
				response.getWriter().write("{\"error\": \"Token de usuario no proporcionado\"}");
			}

		} catch (Exception e) {
			response.getWriter().write("{\"error\": \"Error al obtener el token: " + e.getMessage() + "\"}");
		}

		// Actualizamos la lista de usuarios
		try {
			Main.updateUsers();
		} catch (Exception e) {
			response.getWriter().write("{\"error\": \"Error al actualizar la lista de usuarios: " + e.getMessage() + "\"}");
		}

		// Buscamos el usuario
		int userPosition = -1;
		try {
			userPosition = Main.searchUserByToken(userToken);
		} catch (Exception e) {
			response.getWriter().write("{\"error\": \"Error al buscar el usuario: " + e.getMessage() + "\"}");
		}

		if (userPosition != -1) {
			// obtenemos los amigos del usuario
			try {
				String friends = Main.getUsers().get(userPosition).getFriendsFromDB();

				if (friends != null && !friends.isEmpty()) {
					response.getWriter().write(friends);
				} else {
					response.getWriter().write("[]");
				}
				
			} catch (Exception e) {
				response.getWriter().write("{\"error\": \"Error al obtener los amigos: " + e.getMessage() + "\"}");
			}
		} else {
			response.getWriter().write("{\"error\": \"Usuario no encontrado\"}");
		}
	}
}
