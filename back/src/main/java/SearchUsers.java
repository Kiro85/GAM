import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Servlet implementation class GetContentPosition
 */
@WebServlet("/SearchUsers")
public class SearchUsers extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchUsers() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Obtenemos la búsqueda del usuario
        String search = request.getParameter("search");
        String userToken = request.getParameter("userToken");

        // Actualizamos la lista de usuarios
        try {
            Main.updateUsers();
        } catch (Exception e) {
            System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
        }

        // Buscamos los usuarios que coincidan
        ArrayList<String> matchingUsernames = new ArrayList<>();
        try {
            for (int i = 0; i < Main.getUsers().size(); i++) {
                if (Main.getUsers().get(i).getUsername().toLowerCase().contains(search.toLowerCase())
                        && !Main.getUsers().get(i).getAuthToken().equals(userToken)) {
                    matchingUsernames.add(Main.getUsers().get(i).getUsername());
                }
            }
        } catch (Exception e) {
            System.out.println("Error al buscar el usuario: " + e.getMessage());
        }

        // Convertimos la lista a JSON y la devolvemos
        try {
            StringBuilder jsonResponse = new StringBuilder("[");
            for (int i = 0; i < matchingUsernames.size(); i++) {
                jsonResponse.append("\"").append(matchingUsernames.get(i)).append("\"");
                if (i < matchingUsernames.size() - 1) {
                    jsonResponse.append(",");
                }
            }
            jsonResponse.append("]");

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            System.out.println("Error al devolver la respuesta: " + e.getMessage());
        }
    }

    /**
     * s
     * 
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
