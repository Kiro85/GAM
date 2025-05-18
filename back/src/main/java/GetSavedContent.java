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
        String userToken = request.getParameter("userToken");
        int userId = Integer.parseInt(request.getParameter("userId"));
        String contentType = request.getParameter("contentType");

        // Actualizamos la lista de usuarios
        try {
            Main.updateUsers();
        } catch (Exception e) {
            System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
        }

        // Buscamos el usuario
        int userPosition = -1;
        try {
            if (userId == -1) {
                userPosition = Main.searchUserByToken(userToken);
            } else {
                userPosition = Main.searchUserById(userId);
            }

        } catch (Exception e) {
            System.out.println("Error al buscar el usuario: " + e.getMessage());
        }
        
        if (userPosition != -1) {
            // obtenemos el contenido guardado de la base de datos
            String content = "";
            try {
                content = Main.getUsers().get(userPosition).getSavedContentFromDB(Main.getUsers().get(userPosition).getId(), contentType);
            } catch (Exception e) {
                System.out.println("Error al obtener el contenido guardado: " + e.getMessage());
            }

            try {
                // devolvemos el contenido
                if (!content.equals("null")) {
                    response.getWriter().append(content);
                } else {
                    response.getWriter().append("No hay contenido guardado");
                }
            } catch (Exception e) {
                System.out.println("Error al devolver el contenido: " + e.getMessage());
            }

        } else {
            try {
                response.getWriter().append("No se ha encontrado al usuario");
            } catch (Exception e) {
                System.out.println("Error al devolver la respuesta de usuario no encontrado: " + e.getMessage());
            }
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
