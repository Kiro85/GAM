

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Servlet implementation class UpdateProfileImage
 */
@WebServlet("/UpdateProfileImage")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024, // 1 MB
    maxFileSize = 1024 * 1024 * 10,  // 10 MB
    maxRequestSize = 1024 * 1024 * 15 // 15 MB
)
public class UpdateProfileImage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateProfileImage() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

		// Obtenemos los parámetros de la petición
		String userToken = null;
		String imageType = null;
		Part filePart = null;

		try {
			userToken = request.getParameter("userToken");
			imageType = request.getParameter("imageType"); // "avatar" o "banner"
			filePart = request.getPart("image"); // Clase que representa el archivo subido

		} catch (Exception e) {
			response.getWriter().append("error al obtener los parametros: " + e.getMessage());
		}

		// Actualizamos la lista de usuarios
        try {
            Main.updateUsers();
		} catch (Exception e) {
			response.getWriter().append("error al actualizar la lista de usuarios: " + e.getMessage());
		}

		// Buscamos el usuario
		int userPosition = -1;
        try {
			userPosition = Main.searchUserByToken(userToken);
		} catch (Exception e) {
			response.getWriter().append("error al buscar el usuario: " + e.getMessage());
		}

		// Obtenemos el ID del usuario
		int userId = -1;
		try {
			userId = Main.getUsers().get(userPosition).getId();
		} catch (Exception e) {
			response.getWriter().append("error al obtener el ID del usuario: " + e.getMessage());
		}

        // Guardamos la imagen en la base de datos
		boolean success = false;
		try {
			success = Main.saveImageToDB(userId, imageType, filePart.getInputStream());
		} catch (Exception e) {
			response.getWriter().append("error al guardar la imagen: " + e.getMessage());
		}

		// Devolvemos la respuesta
		try {
			if (success) {
				response.getWriter().append("imagen actualizada correctamente");
			} else {
				response.getWriter().append("error al guardar la imagen");
			}
		} catch (Exception e) {
			response.getWriter().append("error al devolver la respuesta: " + e.getMessage());
		}
	}

}
