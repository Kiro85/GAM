
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class SaveContent
 */
@WebServlet("/SaveContent")
public class SaveContent extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SaveContent() {
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
		String userToken = "";
		int externalId = 0;
		String contentType = "";
		double rating = 0;
		int position = 0;

		// Obtenemos los parametros
		try {
			userToken = request.getParameter("userToken");
			externalId = Integer.parseInt(request.getParameter("externalId"));
			contentType = request.getParameter("contentType");
			rating = Double.parseDouble(request.getParameter("rating"));
			position = Integer.parseInt(request.getParameter("position"));

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

		// Si el usuario existe, añadimos el contenido a la base de datos
		if (userPosition != -1) {
			try {	
				Main.getUsers().get(userPosition).addSavedContentToDB(externalId, contentType, rating, position);
			} catch (Exception e) {
				System.out.println("Error al añadir el contenido a la biblioteca del usuario: " + e.getMessage());
			}

			// Devolvemos la respuesta
			try {
				response.getWriter().append("Contenido añadido a la colección");
			} catch (Exception e) {
				System.out.println("Error al devolver la respuesta de contenido añadido: " + e.getMessage());
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
