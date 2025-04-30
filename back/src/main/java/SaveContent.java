
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
		try {
			// Obtenemos los parametros
			String userToken = request.getParameter("userToken");
			int externalId = Integer.parseInt(request.getParameter("externalId"));
			String contentType = request.getParameter("contentType");
			int rating = Integer.parseInt(request.getParameter("rating"));
			int position = Integer.parseInt(request.getParameter("position"));

			// Actualizamos la lista de usuarios
			Main.updateUsers();

			// Buscamos el usuario
			int userPosition = Main.searchUserByToken(userToken);

			if (userPosition != -1) {
				// Buscamos el contenido, si no existe, lo creamos
				int contentPosition;
				contentPosition = Main.searchContent(externalId, contentType, Main.getContents());
				System.out.println("2");

				if (contentPosition == -1) {
					contentPosition = Content.createContent(externalId, contentType);
				}
				System.out.println("2");

				// Añadimos el contenido a la biblioteca del usuario y a la base de datos
				Main.getUsers().get(userPosition).addContentToLibrary(Main.getContents().get(contentPosition), rating,
						position);
				System.out.println("2");

				// Devolvemos la respuesta
				response.getWriter().append("Contenido añadido a la colección");

			} else {
				response.getWriter().append("No se ha encontrado al usuario");
			}

		} catch (Exception e) {
			System.out.println("Error al guardar el contenido: " + e.getMessage());
		}
	}

}
