import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class User {
	// Attributes
	private int id;
	private String username;
	private String password;
	private String authToken;

	private static int counter;

	// Constructors
	public User(String username, String password) {
		updateCounter(); // Actualizamos el contador antes de asignar el ID
		this.setId(this.getCounter() + 1); // Incrementamos el contador en 1
		this.setUsername(username);
		this.setPassword(password);
	}

	public User(int id, String userName, String password) {
		this.setId(id);
		this.setUsername(userName);
		this.setPassword(password);
	}

	// Methods
	public static boolean createUser(String username, String password, ArrayList<User> users) {
		boolean error = false;

		try {
			User user = new User(username, password);
			users.add(user);

			error = addUserToDB(user); // Una vez creado, lo añadimos a la base de datos

		} catch (Exception e) {
			System.out.println("Error al crear usuario o añadirlo a la BD: " + e.getMessage());
			error = true;
		}

		return error;
	}

	private static boolean addUserToDB(User user) {
		boolean error = false;

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
			error = true;
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
			error = true;
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
			error = true;
		}

		// Ejecutamos la query
		try {
			String query = "INSERT INTO users (id, username, password) VALUES ('" + user.getId() + "', '"
					+ user.getUsername() + "', '" + user.getPassword() + "')";
			mStm.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
			error = true;
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}

		return error;
	}

	public boolean changePassword(String password) {
		boolean error = false;

		try {
			this.setPassword(password);
			error = changePasswordIntoDB(this.getUsername(), password);
		} catch (Exception e) {
			System.out.println("Error al cambiar la contraseña: " + e.getMessage());
			error = true;
		}

		return error;
	}

	private boolean changePasswordIntoDB(String username, String password) {
		boolean error = false;

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
			error = true;
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
			error = true;
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
			error = true;
		}

		// Ejecutamos la query
		try {
			String query = "UPDATE users SET password = '" + password + "' WHERE username = '" + username + "'";
			mStm.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
			error = true;
		}

		// Cerramos la conexión
		try {
			mStm.close();
			conBD.close();
		} catch (SQLException e) {
			System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
		}

		return error;
	}

	public void addSavedContentToDB(int externalId, String contentType, double rating, int position) {
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
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
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
			String query = "INSERT INTO library (user_id, external_id, content_type, rating, position) VALUES ('"
					+ this.getId() + "', '" + externalId + "', '" + contentType + "', '" + rating + "', '"
					+ position + "')";
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

	public void removeSavedContentFromDB(int externalId, String contentType) {
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
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
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
			String query = "DELETE FROM library WHERE user_id = '" + this.getId() + "' AND external_id = '" + externalId
					+ "' AND content_type = '" + contentType + "'";
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

	public void updateSavedContentInDB(int externalId, String contentType, double rating, int position) {
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
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
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
			String query = "UPDATE library SET rating = '" + rating + "', position = '" + position +
					"' WHERE user_id = '" + this.getId() + "' AND external_id = '" + externalId +
					"' AND content_type = '" + contentType + "'";
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

	public String getSavedContentFromDB(int userId, String contentType) {
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
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
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
			String query = "SELECT external_id, rating FROM library WHERE content_type = '" + contentType
					+ "' AND user_id = "
					+ userId + " ORDER BY rating DESC";

			ResultSet rs = mStm.executeQuery(query);

			while (rs.next()) {
				result = result + "Content: " + rs.getInt("external_id") + " Rating: " + rs.getDouble("rating") + "\n";
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

	public static void updateCounter() {
		try {
			// Cargamos el driver
			Class.forName("com.mysql.cj.jdbc.Driver");

			// Conectamos con la base de datos
			Connection conBD = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/gam",
					"root", "");

			// Creamos la statement
			Statement mStm = conBD.createStatement();

			// Ejecutamos la query para obtener el ID más alto
			String query = "SELECT MAX(id) as max_id FROM users";
			ResultSet rs = mStm.executeQuery(query);

			if (rs.next()) {
				User.counter = rs.getInt("max_id");
			}

			// Cerramos la conexión
			mStm.close();
			conBD.close();

		} catch (Exception e) {
			System.out.println("Error al actualizar el id de los usuarios: " + e.getMessage());
		}
	}

	public int getContentPositionFromDB(int externalId, String contentType) {
		int position = 0;

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
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
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
			String query = "SELECT position FROM library WHERE user_id = '" + this.getId() +
					"' AND external_id = '" + externalId + "' AND content_type = '" + contentType + "'";

			ResultSet rs = mStm.executeQuery(query);
			if (rs.next()) {
				position = rs.getInt("position");
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

		return position;
	}

	public String getFriendsFromDB() {
		StringBuilder result = new StringBuilder();
		result.append("[");

		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
			return "[]";
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
			return "[]";
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
			return "[]";
		}

		// Ejecutamos la query
		try {
			String query = "SELECT u.id, u.username FROM follows f " +
					"JOIN users u ON f.followed_id = u.id " +
					"WHERE f.user_id = '" + this.getId() + "'";

			ResultSet rs = mStm.executeQuery(query);

			boolean first = true;
			while (rs.next()) {
				if (!first) {
					result.append(",");
				}
				result.append("{\"id\":").append(rs.getInt("id"))
						.append(",\"username\":\"").append(rs.getString("username"))
						.append("\"}");
				first = false;
			}
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
			return "[]";
		} finally {
			// Cerramos la conexión
			try {
				if (mStm != null)
					mStm.close();
				if (conBD != null)
					conBD.close();
			} catch (SQLException e) {
				System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
			}
		}

		result.append("]");
		return result.toString();
	}

	public void addFriend(int followedId) {
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
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
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
			String query = "INSERT INTO follows (user_id, followed_id) VALUES ('" + this.getId() + "', '" + followedId
					+ "')";
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

	public void removeFriend(int friendId) {
		// Cargamos el driver
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Error al cargar el driver JDBC de MySQL: " + e.getMessage());
			throw new RuntimeException("Error al cargar el driver JDBC");
		}

		// Conectamos con la base de datos
		Connection conBD = null;
		try {
			conBD = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/gam",
					"root", "");
		} catch (SQLException e) {
			System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + e.getMessage());
			throw new RuntimeException("Error al conectar con la base de datos");
		}

		// Creamos la statement
		Statement mStm = null;
		try {
			mStm = conBD.createStatement();
		} catch (SQLException e) {
			System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + e.getMessage());
			throw new RuntimeException("Error al crear la declaración SQL");
		}

		// Ejecutamos la query
		try {
			String query = "DELETE FROM follows WHERE user_id = '" + this.getId() + "' AND followed_id = '" + friendId
					+ "'";
			mStm.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + e.getMessage());
			throw new RuntimeException("Error al eliminar el amigo");
		} finally {
			// Cerramos la conexión
			try {
				mStm.close();
				conBD.close();
			} catch (SQLException e) {
				System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + e.getMessage());
			}
		}
	}

	// Getters & Setters
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getCounter() {
		return this.counter;
	}

	public String getAuthToken() {
		return this.authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}
}
