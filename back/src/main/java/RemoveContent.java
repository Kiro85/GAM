

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class RemoveContent
 */
@WebServlet("/RemoveContent")
public class RemoveContent extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoveContent() {
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
		// Obtenemos los parametros
		String userToken = "";
		int externalId = 0;
		String contentType = "";

		// Obtenemos los parametros
		try {
			userToken = request.getParameter("userToken");
			externalId = Integer.parseInt(request.getParameter("externalId"));
			contentType = request.getParameter("contentType");

		} catch (Exception e) {
			System.out.println("Error al obtener los parametros para guardar el contenido: " + e.getMessage());
		}

		// Actualizamos la lista de usuarios
		try {
			Main.updateUsers();
		} catch (Exception e) {
			System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
		}

		// Buscamos el usuario
		int userPosition = -1;
		try {
			userPosition = Main.searchUserByToken(userToken);
		} catch (Exception e) {
			System.out.println("Error al buscar el usuario: " + e.getMessage());
		}

		// Si el usuario existe, eliminamos el contenido
		if (userPosition != -1) {
			try {	
				Main.getUsers().get(userPosition).removeSavedContentFromDB(externalId, contentType);
			} catch (Exception e) {
				System.out.println("Error al eliminar el contenido de la biblioteca del usuario: " + e.getMessage());
			}

			// Devolvemos la respuesta
			try {
				response.getWriter().append("Contenido eliminado de la colección");
			} catch (Exception e) {
				System.out.println("Error al devolver la respuesta de contenido eliminado: " + e.getMessage());
			}

		} else {
			try {
				response.getWriter().append("No se ha encontrado al usuario");
			} catch (Exception e) {
				System.out.println("Error al devolver la respuesta de usuario no encontrado	: " + e.getMessage());
			}
		}
	}

}
