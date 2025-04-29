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
    private ArrayList<SavedContent> library;
    private ArrayList<User> following;

    private static int counter;

    // Constructors
    public User(String userName, String password) {
        this.setId(this.getCounter());
        this.setUsername(userName);
        this.setPassword(password);

        this.setCounter();
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
	    	String query = "INSERT INTO users (id, username, password) VALUES ('"+ user.getId() +"', '"+ user.getUsername() +"', '"+ user.getPassword() +"')";
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
	    	String query = "UPDATE users SET password = '"+password+"' WHERE username = '"+username+"'";
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
    
    public static void updateCounter() {
    	try {
    		User.counter = Main.getUsers().size() - 1;    		
    	} catch (Exception e) {
    		System.out.println("Error al actualizar el id de los usuarios: " + e.getMessage());
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

    public ArrayList<SavedContent> getLibrary() {
        return this.library;
    }

    public ArrayList<User> getFollowing() {
        return this.following;
    }

    public int getCounter() {
        return this.counter++;
    }

    public void setCounter() {
        this.counter++;
    }
    
    public String getAuthToken() {
        return this.authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
