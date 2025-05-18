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
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		String apiUrl = null;
		String limit = request.getParameter("limit");

		try {
			if (limit != null && !limit.isEmpty()) {
				apiUrl = "https://api.jikan.moe/v4/top/anime?limit=" + limit;

			} else {
				// Obtenemos los parametros de la petición
				String page = request.getParameter("page");
				String genre = request.getParameter("genre");
				String search = request.getParameter("search");
				String id = request.getParameter("id");

				// Si hay id, añadimos el id a la url
				if (id != null && !id.isEmpty()) {
					apiUrl = "https://api.jikan.moe/v4/anime/" + id;

				} else {
					// Si no hay pagina, la establecemos a 1
					if (page == null || page.isEmpty())
						page = "1";

					// Establecemos la url de la API
					apiUrl = "https://api.jikan.moe/v4/top/anime?page=" + page;

					// Si hay genero, añadimos el genero a la url
					if (genre != null && !genre.isEmpty()) {
						apiUrl = "https://api.jikan.moe/v4/anime?page=" + page + "&genres=" + genre;
					}

					// Si hay busqueda, añadimos la busqueda a la url
					if (search != null && !search.isEmpty()) {
						apiUrl = "https://api.jikan.moe/v4/anime?page=" + page + "&q="
								+ java.net.URLEncoder.encode(search, "UTF-8");
					}
				}
			}

		} catch (Exception e) {
			response.getWriter().append("Error al obtener animes: " + e.getMessage());
			System.out.println("Error al obtener animes: " + e.getMessage());
		}

		// Hacemos el fetch a la API con reintentos
		int maxRetries = 3;
		int retryCount = 0;
		boolean success = false;

		while (!success && retryCount < maxRetries) {
			try {
				// Esperamos antes de cada intento (excepto el primero)
				if (retryCount > 0) {
					Thread.sleep(1000); // Esperamos 1 segundos entre intentos
				}

				// Abrimos la conexión
				URL url = new URL(apiUrl);
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.connect();

				// Obtenemos el estado de la respuesta
				int status = conn.getResponseCode();

				if (status == 200) {
					// Leemos los datos
					StringBuilder info = new StringBuilder();
					Scanner scanner = new Scanner(url.openStream());

					while (scanner.hasNext()) {
						info.append(scanner.nextLine());
					}

					scanner.close();
					conn.disconnect();

					// Enviamos la respuesta al frontend
					response.getWriter().append(info.toString());
					success = true;
				} else if (status == 429) {
					// Si recibimos 429, incrementamos el contador de reintentos
					retryCount++;
					System.out.println("Rate limit alcanzado. Reintento " + retryCount + " de " + maxRetries);
				} else {
					throw new RuntimeException("Ha ocurrido un error: " + status);
				}

			} catch (Exception e) {
				retryCount++;
				if (retryCount >= maxRetries) {
					response.getWriter().append("Error al obtener animes después de " + maxRetries + " intentos: " + e.getMessage());
					System.out.println("Error al obtener animes después de " + maxRetries + " intentos: " + e.getMessage());
				}
			}
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
