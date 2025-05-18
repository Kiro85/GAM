import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/UpdateContent")
public class UpdateContent extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public UpdateContent() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Obtenemos los parametros
        String userToken = "";
        int externalId = 0;
        String contentType = "";
        double rating = 0;
        int position = 0;

        try {
            userToken = request.getParameter("userToken");
            externalId = Integer.parseInt(request.getParameter("externalId"));
            contentType = request.getParameter("contentType");
            rating = Double.parseDouble(request.getParameter("rating"));
            position = Integer.parseInt(request.getParameter("position"));
        } catch (Exception e) {
            System.out.println("Error al obtener los parametros para actualizar el contenido: " + e.getMessage());
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

        // Si el usuario existe, actualizamos el contenido
        if (userPosition != -1) {
            try {
                Main.getUsers().get(userPosition).updateSavedContentInDB(externalId, contentType, rating, position);
            } catch (Exception e) {
                System.out.println("Error al actualizar el contenido en la biblioteca del usuario: " + e.getMessage());
            }

            // Devolvemos la respuesta
            try {
                response.getWriter().append("Contenido actualizado en la colección");
            } catch (Exception e) {
                System.out.println("Error al devolver la respuesta de contenido actualizado: " + e.getMessage());
            }
        } else {
            try {
                response.getWriter().append("No se ha encontrado al usuario");
            } catch (Exception e) {
                System.out.println("Error al devolver la respuesta de usuario no encontrado: " + e.getMessage());
            }
        }
    }
}