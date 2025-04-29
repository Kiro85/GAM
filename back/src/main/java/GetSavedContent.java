import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class GetSavedContent
 */
@WebServlet("/GetSavedContent")
public class GetSavedContent extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetSavedContent() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Obtenemos los parametros
        try {
            String userToken = request.getParameter("userToken");
            String contentType = request.getParameter("contentType");

            // Actualizamos la lista de usuarios
            Main.updateUsers();
            System.out.println("----");
            Main.showUsers();
            System.out.println(Main.getUsers().get(0).getAuthToken());

            // Buscamos el usuario
            int userPosition = Main.searchUserByToken(userToken);

            // obtenemos el contenido guardado en su biblioteca
            String content = Main.getUsers().get(userPosition).getSavedContent(contentType);

            // devolvemos el contenido
            if (!content.equals("null")) {
                response.getWriter().append(content);
            } else {
                response.getWriter().append("No hay contenido guardado");
            }
        } catch (Exception e) {
            System.out.println("Error al obtener el contenido guardado: " + e.getMessage());
            response.getWriter().append("Error: " + e.getMessage());
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
