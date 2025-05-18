import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class GetContentPosition
 */
@WebServlet("/GetContentPosition")
public class GetContentPosition extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetContentPosition() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String userToken = "";
        String externalId = "";
        String contentType = "";

        try {
            // Obtenemos los parametros
            userToken = request.getParameter("userToken");
            externalId = request.getParameter("externalId");
            contentType = request.getParameter("contentType");

        } catch (Exception e) {
            System.out.println("Error al obtener los parametros: " + e.getMessage());
        }

        // Actualizamos la lista de usuarios
        try {
            Main.updateUsers();
        } catch (Exception e) {
            System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
        }

        // Buscamos el usuario
        int userPosition = -1;
        try {
            userPosition = Main.searchUserByToken(userToken);
        } catch (Exception e) {
            System.out.println("Error al buscar el usuario: " + e.getMessage());
        }

        if (userPosition != -1) {
            try {
                // Obtenemos la posición del contenido
                int position = Main.getUsers().get(userPosition).getContentPositionFromDB(Integer.parseInt(externalId),
                        contentType);
                // Devolvemos la posición
                response.getWriter().append(String.valueOf(position));
            } catch (Exception e) {
                System.out.println("Error al obtener la posición: " + e.getMessage());
                response.getWriter().append("0");
            }
        } else {
            response.getWriter().append("Usuario no encontrado");
        }
    }
}
