
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class GetProfileImage
 */
@WebServlet("/GetProfileImage")
public class GetProfileImage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetProfileImage() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Obtenemos los parámetros de la petición
		String userToken = null;
		String imageType = null;
		String username = null;

		try {
			userToken = request.getParameter("userToken");
			imageType = request.getParameter("imageType"); // "avatar" o "banner"
			username = request.getParameter("username");
		} catch (Exception e) {
			response.getWriter().append("Error al obtener los parámetros: " + e.getMessage());
		}

		// Actualizamos la lista de usuarios
		try {
			Main.updateUsers();
		} catch (Exception e) {
			response.getWriter().append("Error al actualizar la lista de usuarios: " + e.getMessage());
		}

		// Buscamos el usuario
		int userPosition = -1;
		try {
			if (userToken != null && !userToken.isEmpty()) {
				userPosition = Main.searchUserByToken(userToken);
			} else if (username != null && !username.isEmpty()) {
				userPosition = Main.searchUser(username);
			}
		} catch (Exception e) {
			response.getWriter().append("Error al buscar el usuario: " + e.getMessage());
		}

		// Obtenemos el ID del usuario
		int userId = -1;
		try {
			userId = Main.getUsers().get(userPosition).getId();
		} catch (Exception e) {
			response.getWriter().append("error al obtener el ID del usuario: " + e.getMessage());
		}

		// Obtenemos la imagen de la base de datos
		byte[] imageData = null;
		try {
			imageData = Main.getImageFromDB(userId, imageType);
		} catch (Exception e) {
			response.getWriter().append("error al obtener la imagen de la base de datos: " + e.getMessage());
		}

		// Devolvemos la imagen
		try {
			if (imageData != null) {
				// Configuramos la respuesta
				response.setContentType("image/jpeg");
				response.setContentLength(imageData.length);

				// Enviamos la imagen
				response.getOutputStream().write(imageData);

			} else {
				// Si no hay imagen, enviamos una imagen por defecto
				response.sendRedirect(imageType.equals("avatar_image")
						? "https://www.svgrepo.com/show/452030/avatar-default.svg"
						: "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg");
			}

		} catch (Exception e) {
			response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
			response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			response.setHeader("Access-Control-Allow-Headers", "Content-Type");
			response.getWriter().append("error al devolver la imagen: " + e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

}
