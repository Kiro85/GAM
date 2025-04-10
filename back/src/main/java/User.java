import java.io.IOException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;

import com.mysql.cj.xdevapi.Statement;
import com.sun.jdi.connect.spi.Connection;

public class User {
    // Attributes
    private int id;
    private String userName;
    private String password;
    private ArrayList<Content> library;
    private ArrayList<User> following;

    private static int counter;

    // Constructors
    public User(String userName, String password) {
        this.setId(this.getCounter());
        this.setUserName(userName);
        this.setPassword(password);

        this.setCounter();
    }

    // Methods
    public void createUser(String userName, String password, ArrayList<User> users) {
        try {

            User user = new User(userName, password);
            users.add(user);

            addUserToDB(user);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private void addUserToDB(User user) {
        // Load driver
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException error) {
            System.out.println("Error al cargar el driver JDBC de MySQL: " + error.getMessage());
        }

        // Connect to DataBase
        Connection conBD = null;
        try {
            conBD = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/gam", "root", "");
        } catch (SQLException error) {
            System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + error.getMessage());
        }

        // Create Statement
        Statement mStm = null;
        try {
            mStm = (Statement) ((java.sql.Connection) conBD).createStatement();
        } catch (SQLException error) {
            System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + error.getMessage());
        }

        // Execute Query
        try {
            String query = "INSERT INTO users (id, username, password) VALUES ('" + user.getId() + "' '"
                    + user.getUserName() + "' '" + user.getPassword() + "')";
            System.out.println(query);
            ((java.sql.Statement) mStm).executeUpdate(query);
        } catch (SQLException error) {
            System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + error.getMessage());
        }

        // Close Connection
        try {
            ((Connection) mStm).close();
            conBD.close();
        } catch (IOException error) {
            System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + error.getMessage());
        }
    }

    // Getters & Setters
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<Content> getLibrary() {
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
}
