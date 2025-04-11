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
    
    public User(int id, String userName, String password) {
        this.setId(id);
        this.setUserName(userName);
        this.setPassword(password);
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
