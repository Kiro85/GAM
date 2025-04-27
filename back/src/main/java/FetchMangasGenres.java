

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
 * Servlet implementation class FetchMangasGenres
 */
@WebServlet("/FetchMangasGenres")
public class FetchMangasGenres extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchMangasGenres() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		// Hacemos el fetch a la API
		try {
			// Abrimos la conexión
			URL url = new URL("https://api.jikan.moe/v4/genres/manga?filter=genres");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.connect();

			// Obtenemos el estado de la respuesta
			int status = conn.getResponseCode();
			if (status != 200) {
				throw new RuntimeException("Ha ocurrido un error: " + status); // Si el estado no es 200, lanzamos una excepción
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
			System.out.println("Error al obtener generos mangas: " + e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
