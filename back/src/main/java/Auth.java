

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Servlet implementation class Auth
 */
@WebServlet("/Auth")
public class Auth extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Auth() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Obtenemos credenciales
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		// llamamos al metodo para buscar usuario
		boolean found = auth(null);
			
		// si el usuario existe, creamos una sesion
		if (found) {
			HttpSession session = request.getSession();
			session.setAttribute("username", username);
			response.sendRedirect("index.html");
		} else {
			response.sendRedirect("login.html?error=true");
		}
	}

	// Methods
	public boolean auth(ArrayList<User> users) {
		boolean found = false;

		
		
		return found;
	}

}
