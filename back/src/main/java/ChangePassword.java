
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

/**
 * Servlet implementation class ChangePassword
 */
@WebServlet("/ChangePassword")
public class ChangePassword extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ChangePassword() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		// actualizamos la lista de usuarios
		try {
			Main.updateUsers();
		} catch (Exception e) {
			System.out.println("Error al actualizar la lista de usuarios: " + e.getMessage());
		}

		// Obtenemos las credenciales
		String username = null;
		String oldPassword = null;
		String newPassword = null;
		String confirmPassword = null;
		try {
			username = request.getParameter("username");
			oldPassword = request.getParameter("oldPassword");
			newPassword = request.getParameter("newPassword");
			confirmPassword = request.getParameter("confirmPassword");
		} catch (Exception e) {
			System.out.println("Error al obtener credenciales: " + e.getMessage());
		}

		// llamamos al metodo para autentificar usuario
		boolean found = false;
		try {
			found = Main.authUser(username, oldPassword);
		} catch (Exception e) {
			System.out.println("Error al autentificar usuario: " + e.getMessage());
		}

		// Comprobamos que la contraseña nueva coincida con la repetición de la misma
		boolean correctPassword = false;
		if (newPassword.equals(confirmPassword)) {
			correctPassword = true;
		}

		// Si todo esta correcto, cambiamos la contraseña
		boolean error = false;
		try {
			if (found && correctPassword) {
				int position = Main.searchUser(username);
				error = Main.getUsers().get(position).changePassword(newPassword);
			}
		} catch (Exception e) {
			System.out.println("Error al cambiar la contraseña: " + e.getMessage());
		}

		// Enviamos la respuesta
		try {
			if (!found) {
				response.getWriter().append("Usuario o contraseña incorrecta.");
			} else if (!correctPassword) {
				response.getWriter().append("Las nuevas constraseñas introducidas no coinciden.");
			} else if (error) {
				response.getWriter().append("Ha ocurrido un error en el servidor, porfavor intentalo mas tarde.");
			} else {
				response.getWriter().append("Contraseña cambiada con éxito!");
			}
		} catch (Exception e) {
			System.out.println("Error al enviar respuesta: " + e.getMessage());
		}
	}

}
