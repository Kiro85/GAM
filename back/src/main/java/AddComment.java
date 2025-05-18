

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class AddComment
 */
@WebServlet("/AddComment")
public class AddComment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddComment() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Obtenemos los atributos
		String comment = null;
		int contentId = 0;
		String userToken = null;

		try {
			comment = request.getParameter("comment");
			contentId = Integer.parseInt(request.getParameter("contentId"));
			userToken = request.getParameter("userToken");
		} catch (Exception e) {
			e.printStackTrace();
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
                // Añadimos el comentario
                if (comment != null && comment.trim().length() > 0) {
                    Main.addComment(Main.getUsers().get(userPosition).getId(), comment, contentId);
                    response.getWriter().append("Comentario añadido!");
                } else {
                    response.getWriter().append("Comentario no válido");
                }
				
            } catch (Exception e) {
                System.out.println("Error al añadir el comentario: " + e.getMessage());
                response.getWriter().append("Error al añadir el comentario");
            }
        } else {
            response.getWriter().append("Usuario no encontrado");
        }
	}

}
