
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
 * Servlet implementation class FetchAnimes
 */
@WebServlet("/FetchAnimes")
public class FetchAnimes extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FetchAnimes() {
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

		// Obtenemos los parametros de la petición
		String page = request.getParameter("page");
		String genre = request.getParameter("genre");
		String search = request.getParameter("search");

		// Si no hay pagina, la establecemos a 1
		if (page == null || page.isEmpty())
			page = "1";

		// Establecemos la url de la API
		String apiUrl = "https://api.jikan.moe/v4/top/anime?page=" + page;

		// Si hay genero, añadimos el genero a la url
		if (genre != null && !genre.isEmpty()) {
			apiUrl = "https://api.jikan.moe/v4/anime?page=" + page + "&genres=" + genre;
		}

		// Si hay busqueda, añadimos la busqueda a la url
		if (search != null && !search.isEmpty()) {
			apiUrl = "https://api.jikan.moe/v4/anime?page=" + page + "&q="
					+ java.net.URLEncoder.encode(search, "UTF-8");
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
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().append(info.toString());
			}

		} catch (Exception e) {
			response.getWriter().append("Error al obtener animes: " + e.getMessage());
			System.out.println("Error al obtener animes: " + e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
