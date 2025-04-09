import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Bbdd {
	public static void guardar(String nom){
		try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    } catch (ClassNotFoundException error) {
	        System.out.println("Error al cargar el driver JDBC de MySQL: " + error.getMessage());
	    }
		
		Connection conBD = null;
	    try {
	        conBD = DriverManager.getConnection(
	                "jdbc:mysql://localhost:3306/nomweb",
	                "root", "");
	    } catch (SQLException error) {
	        System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + error.getMessage());
	    }

	    Statement mStm = null;
	    try {
	        mStm = conBD.createStatement();
	    } catch (SQLException error) {
	        System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + error.getMessage());
	    }
	    
	    try {
	    	String query = "INSERT INTO dades (nom) VALUES ('"+nom+"')";
	    	System.out.println(query);
	        mStm.executeUpdate(query);
	    } catch (SQLException error) {
	        System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + error.getMessage());
	    }

	    try {
	        mStm.close();
	        conBD.close();
	    } catch (SQLException error) {
	        System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + error.getMessage());
	    }
	    
		}
	
	public static String descarregar() {
		String resultat = "";
		try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    } catch (ClassNotFoundException error) {
	        System.out.println("Error al cargar el driver JDBC de MySQL: " + error.getMessage());
	    }
		
		Connection conBD = null;
	    try {
	        conBD = DriverManager.getConnection(
	                "jdbc:mysql://localhost:3306/nomweb",
	                "root", "");
	    } catch (SQLException error) {
	        System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + error.getMessage());
	    }

	    Statement mStm = null;
	    try {
	        mStm = conBD.createStatement();
	    } catch (SQLException error) {
	        System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + error.getMessage());
	    }
	    
	    try {
	    	String query = "SELECT * FROM dades";
	    	System.out.println(query);
	    	ResultSet rs = mStm.executeQuery(query);
	    	
	        while (rs.next()){
	        	resultat=resultat+rs.getString("nom")+"<br>";
	        }
	    } catch (SQLException error) {
	        System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + error.getMessage());
	    }

	    try {
	        mStm.close();
	        conBD.close();
	    } catch (SQLException error) {
	        System.out.println("Error al cerrar conexión a servidor MySQL/MariaDB: " + error.getMessage());
	    }
	    return resultat;
		}
}