import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Main {
	// Attributes
	public static ArrayList<User> users;
	public static ArrayList<Content> contents;

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
						users.add(user);
					}

					// reiniciamos los valores
					id = "";
					username = "";
					password = "";

				} else {
					// dependiendo de la posición, añadimos la información en lugares diferentes
					if (position == 0) {
						id += usersDB.charAt(i);
					} else if (position == 1) {
						username += usersDB.charAt(i);
					} else if (position == 2) {
						password += usersDB.charAt(i);
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
			String query = "SELECT * FROM users";
			ResultSet rs = mStm.executeQuery(query);

			while (rs.next()) {
				result = result + rs.getInt("id") + "," + rs.getString("username") + "," + rs.getString("password")
						+ "<br>";
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
	}

	public static int searchUserByToken(String authToken) {
		boolean found = false;
		int i = 0;

		while (!found && i < getUsers().size()) {
			if (getUsers().get(i).getAuthToken().equals(authToken)) {
				found = true;
			} else {
				i++;
			}
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

	public static int searchContent(int externalId, String contentType, ArrayList<Content> contents) {

		int i = -1;
		boolean found = false;

		while (!found && i < getContents().size()) {
			if (contents.get(i).getContentType().equals(contentType) && contents.get(i).getExternalId() == externalId) {
				found = true;
			} else {
				i++;
			}
		}

		return i;
	}

	// Getters & Setters
	public static ArrayList<User> getUsers() {
		return users;
	}

	public static ArrayList<Content> getContents() {
		return contents;
	}
}