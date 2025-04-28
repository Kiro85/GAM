import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

/**
 * Servlet implementation class FetchMangas
 */
@WebServlet("/FetchMangas")
public class FetchMangas extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FetchMangas() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		String apiUrl = null;
		String limit = request.getParameter("limit");

		try {
			if (limit != null && !limit.isEmpty()) {
				apiUrl = "https://api.jikan.moe/v4/top/manga?limit=" + limit;
				
			} else {
				// Obtenemos los parametros de la petición
				String page = request.getParameter("page");
				String genre = request.getParameter("genre");
				String search = request.getParameter("search");

				// Si no hay pagina, la establecemos a 1
				if (page == null || page.isEmpty()) {
					page = "1";
				}

				// Establecemos la url base de la API
				apiUrl = "https://api.jikan.moe/v4/top/manga?page=" + page;

				// Si hay búsqueda, cambiamos la URL base
				if (search != null && !search.isEmpty()) {
					apiUrl = "https://api.jikan.moe/v4/manga?page=" + page + "&q="
							+ java.net.URLEncoder.encode(search, "UTF-8");
				}
				// Si hay género, cambiamos la URL base
				else if (genre != null && !genre.isEmpty()) {
					apiUrl = "https://api.jikan.moe/v4/manga?page=" + page + "&genres=" + genre;
				}
			}

		} catch (Exception e) {
			response.getWriter().append("Error al obtener mangas: " + e.getMessage());
			System.out.println("Error al obtener mangas: " + e.getMessage());
		}

		// Hacemos el fetch a la API
		try {
			// Abrimos la conexión
			URL url = new URL(apiUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.connect();

			// Obtenemos el estado de la respuesta
			int status = conn.getResponseCode();
			if (status != 200) {
				throw new RuntimeException("Ha ocurrido un error: " + status); // Si el estado no es 200, lanzamos una
																				// excepción
			} else {
				// Leemos los datos
				StringBuilder info = new StringBuilder(); // variable que enviaremos al frontend
				Scanner scanner = new Scanner(url.openStream()); // Abrimos el flujo de datos y lo escaneamos

				while (scanner.hasNext()) {
					info.append(scanner.nextLine());
				}

				scanner.close();
				conn.disconnect();

				// Enviamos la respuesta al frontend
				response.getWriter().append(info.toString());
			}

		} catch (Exception e) {
			response.getWriter().append("Error al obtener mangas: " + e.getMessage());
			System.out.println("Error al obtener mangas: " + e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
