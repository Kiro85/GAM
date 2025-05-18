

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class RemoveFriend
 */
@WebServlet("/RemoveFriend")
public class RemoveFriend extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoveFriend() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Obtenemos los parámetros
        String userToken = request.getParameter("userToken");
        String friendId = request.getParameter("friendId");

        if (userToken == null || userToken.isEmpty() || friendId == null || friendId.isEmpty()) {
            response.getWriter().write("{\"error\": \"Parámetros incompletos\"}");
        }

        // Actualizamos la lista de usuarios
        try {
            Main.updateUsers();
        } catch (Exception e) {
            response.getWriter()
                    .write("{\"error\": \"Error al actualizar la lista de usuarios: " + e.getMessage() + "\"}");
        }

        // Buscamos el usuario por token
        int userPosition = Main.searchUserByToken(userToken);
        if (userPosition == -1) {
            response.getWriter().write("{\"error\": \"Usuario no encontrado\"}");
        }

        try {
            // Eliminamos el amigo
            Main.getUsers().get(userPosition).removeFriend(Integer.parseInt(friendId));
            response.getWriter().write("{\"success\": true}");
        } catch (Exception e) {
            response.getWriter().write("{\"error\": \"Error al eliminar amigo: " + e.getMessage() + "\"}");
        }
	}

}
