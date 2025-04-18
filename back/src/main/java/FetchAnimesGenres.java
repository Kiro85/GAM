

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
 * Servlet implementation class FetchAnimesGenres
 */
@WebServlet("/FetchAnimesGenres")
public class FetchAnimesGenres extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchAnimesGenres() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");

		// Hacemos el fetch a la API
		try {
			// Abrimos la conexión
			URL url = new URL("https://api.jikan.moe/v4/genres/anime?filter=genres");
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
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().append(info.toString());
			}

		} catch (Exception e) {
			response.getWriter().append("Error al obtener animes: " + e.getMessage());
			System.out.println("Error al obtener generos animes: " + e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
