public class DatabaseConfig {
    // Configuración de la base de datos
    public static final String DB_HOST = "localhost";
    public static final String DB_PORT = "3306";
    public static final String DB_NAME = "gam";
    public static final String DB_USER = "root";
    public static final String DB_PASSWORD = "";

    // URL de conexión
    public static final String DB_URL = "jdbc:mysql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
}