import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.io.InputStream;
import java.sql.PreparedStatement;
import java.util.Date;

public class Main {
	// Attributes
	public static ArrayList<User> users = new ArrayList<User>();

	// Methods
	public static void showUsers() {
		for (int i = 0; i < getUsers().size(); i++) {
			System.out.println("UserID: " + users.get(i).getId());
			System.out.println("Username: " + users.get(i).getUsername());
			System.out.println("Password: " + users.get(i).getPassword());
			System.out.println("Token: " + users.get(i).getAuthToken());
			System.out.println("--------------------------------");
		}
	}

	public static int searchUser(String username) {

		boolean found = false;
		int i = 0;

		try {
			while (!found && i < getUsers().size()) {
				if (getUsers().get(i).getUsername().equals(username)) {
					found = true;
				} else {
					i++;
				}
			}
		} catch (Exception e) {
			System.out.println("Error al buscar el usuario: " + e.getMessage());
		}

		return i;
	}

	public static int searchUserById(int userId) {

		boolean found = false;
		int i = 0;

		try {
			while (!found && i < getUsers().size()) {
				if (getUsers().get(i).getId() == userId) {
					found = true;
				} else {
					i++;
				}
			}
		} catch (Exception e) {
			System.out.println("Error al buscar el usuario: " + e.getMessage());
		}

		if (!found) {
			i = -1;
		}
		return i;
	}

	public static void updateUsers() {
		// Vaciamos la lista actual
		users = new ArrayList<User>();

		// Obtenemos los usuarios de la base de datos
		String usersDB = "";
		try {
			usersDB = getUsersFromDB();
		} catch (Exception error) {
			System.out.println("Error al obtener los usuarios de la base de datos: " + error.getMessage());
		}

		// Los añadimos a la lista de usuarios
		int position = 0; // variable usada para determinar si el valor es el id, nombre o password
		String data; // variable donde guardaremos el valor actual

		String id = "";
		String username = "";
		String password = "";
		String authToken = "";
		try {
			for (int i = 0; i < usersDB.length(); i++) {
				if (usersDB.charAt(i) == ',') {
					position++; // cuando encuentra una coma, pasamos significa que pasamos al siguiente valor

				} else if (usersDB.charAt(i) == '<') {
					position = 0; // si encontramos el signo '<', significa que pasamos de linea, así que
									// reiniciamos la posición
					i += 3; // adelantamos 3 posiciones para pasar el br

					// si la id no esta vacia, creamos el usuario y lo añadimos a la lista
					if (!id.isEmpty()) {
						User user = new User(Integer.parseInt(id), username, password);
						if (!authToken.isEmpty()) {
							user.setAuthToken(authToken);
						}
						users.add(user);
					}

					// reiniciamos los valores
					id = "";
					username = "";
					password = "";
					authToken = "";

				} else {
					// dependiendo de la posición, añadimos la información en lugares diferentes
					if (position == 0) {
						id += usersDB.charAt(i);
					} else if (position == 1) {
						username += usersDB.charAt(i);
					} else if (position == 2) {
						password += usersDB.charAt(i);
					} else if (position == 3) {
						authToken += usersDB.charAt(i);
					}
				}
			}
		} catch (Exception error) {
			System.out.println("Error al cargar los usuarios en la lista: " + error.getMessage());
		}
		// Actualizamos el id con el mas reciente
		User.updateCounter();
	}

	public static String getUsersFromDB() {
		String result = "";

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException error) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + error.getMessage());
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					DatabaseConfig.DB_URL,
					DatabaseConfig.DB_USER,
					DatabaseConfig.DB_PASSWORD);
		} catch (SQLException error) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + error.getMessage());
		}

		// Creamos el statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException error) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + error.getMessage());
		}

		// Ejecutamos la query
		try {
			String query = "SELECT id, username, password, auth_token FROM users";
			ResultSet rs = mStm.executeQuery(query);

			while (rs.next()) {
				result = result + rs.getInt("id") + "," + rs.getString("username") + "," + rs.getString("password")
						+ "," + (rs.getString("auth_token") != null ? rs.getString("auth_token") : "") + "<br>";
			}
		} catch (SQLException error) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + error.getMessage());
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException error) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + error.getMessage());
		}

		// Devolvemos el resultado
		return result;
	}

	public static void assingTokenToUser(String username, String authToken) {
		int user = searchUser(username);

		getUsers().get(user).setAuthToken(authToken);
		updateTokenToDB(username, authToken);
	}

	public static void updateTokenToDB(String username, String authToken) {
		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					DatabaseConfig.DB_URL,
					DatabaseConfig.DB_USER,
					DatabaseConfig.DB_PASSWORD);
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
		}

		// Ejecutamos la query
		try {
			String query = "UPDATE users SET auth_token = '" + authToken + "' WHERE username = '" + username + "'";
			mStm.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}
	}

	public static int searchUserByToken(String authToken) {

		boolean found = false;
		int i = 0;

		try {
			while (!found && i < getUsers().size()) {
				String userToken = getUsers().get(i).getAuthToken();
				if (userToken != null && userToken.equals(authToken)) {
					found = true;
				} else {
					i++;
				}
			}
		} catch (Exception e) {
			System.out.println("Error al buscar usuario por token: " + e.getMessage());
			i = -1;
		}

		if (authToken == null || authToken.isEmpty() || getUsers() == null || getUsers().isEmpty()) {
			i = -1;
		}

		return i;
	}

	public static boolean authUser(String username, String password) {
		boolean found = false;

		// buscamos el usuario en la lista
		try {
			int i = 0;
			do {
				if (getUsers().get(i).getUsername().equals(username)
						&& Main.getUsers().get(i).getPassword().equals(password)) {
					found = true;
				} else {
					i++;
				}
			} while (!found && i < getUsers().size());
		} catch (Exception e) {
			System.out.println("Error al autentificar el usuario: " + e.getMessage());
		}

		return found;
	}

	public static void addComment(int userId, String comment, int externalId) {
		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					DatabaseConfig.DB_URL,
					DatabaseConfig.DB_USER,
					DatabaseConfig.DB_PASSWORD);
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
		}

		// Ejecutamos la query
		try {
			String query = "INSERT INTO comments (user_id, external_id, comment) VALUES ('" + userId + "', '"
					+ externalId + "', '" + comment + "')";
			mStm.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}
	}

	public static String getComments(int externalId) {
		String comments = "";

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					DatabaseConfig.DB_URL,
					DatabaseConfig.DB_USER,
					DatabaseConfig.DB_PASSWORD);
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
		}

		// Ejecutamos la query
		try {
			String query = "SELECT c.user_id, c.comment, c.commented_at, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.external_id = '"
					+ externalId
					+ "' ORDER BY c.commented_at DESC";
			ResultSet rs = mStm.executeQuery(query);

			while (rs.next()) {
				int userId = rs.getInt("user_id");
				comments = comments +
						"<div class='modal__comment'>" +
						"<svg class='modal__comment-avatar' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-user'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>"
						+
						"<div class='modal__comment-content'>" +
						"<p class='modal__comment-username'>" + rs.getString("username") + "</p>" +
						"<p class='modal__comment-text'>" + rs.getString("comment") + "</p>" +
						"<p class='modal__comment-date'>" + rs.getString("commented_at") + "</p>" +
						"</div>" +
						"</div>";
			}
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}

		return comments;
	}

	public static boolean searchIfUserExists(String username) {
		boolean found = false;

		// buscamos el usuario en la lista
		try {
			int i = 0;
			do {
				if (getUsers().get(i).getUsername().equals(username)) {
					found = true;
				} else {
					i++;
				}
			} while (!found && i < getUsers().size());
		} catch (Exception e) {
			System.out.println("Error al autentificar el usuario: " + e.getMessage());
		}

		return found;
	}

	public static boolean saveImageToDB(int userId, String imageType, InputStream imageStream) {
		boolean success = false;

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					DatabaseConfig.DB_URL,
					DatabaseConfig.DB_USER,
					DatabaseConfig.DB_PASSWORD);
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Ejecutamos la query
		PreparedStatement pStm = null;
		try {
			// Preparar la query con PreparedStatement
			String query = "UPDATE users SET " + imageType + " = ? WHERE id = ?";
			pStm = conBD.prepareStatement(query);

			// Establecer los parámetros
			pStm.setBinaryStream(1, imageStream);
			pStm.setInt(2, userId);

			// Ejecutar la query
			pStm.executeUpdate();

			success = true; // Si se ejecuta correctamente, devolvemos true

		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Cerramos la conexión
		try {
			pStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}

		return success;
	}

	public static byte[] getImageFromDB(int userId, String imageType) {
		byte[] imageData = null;

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					DatabaseConfig.DB_URL,
					DatabaseConfig.DB_USER,
					DatabaseConfig.DB_PASSWORD);
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
		}

		// Ejecutamos la query
		try {
			String query = "SELECT " + imageType + " FROM users WHERE id = '" + userId + "'";
			ResultSet rs = mStm.executeQuery(query);

			while (rs.next()) {
				imageData = rs.getBytes(imageType);
			}

		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}

		return imageData;
	}

	// Getters & Setters
	public static ArrayList<User> getUsers() {
		return users;
	}
}