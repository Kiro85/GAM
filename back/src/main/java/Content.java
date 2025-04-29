import java.util.ArrayList;

public class Content {
    // Attributes
    private int id;
    private int externalId;
    private String contentType;
    private ArrayList<Comment> comments;

    private static int counter;
    
    // Constructors
    public Content(int externalId, String contentType) {
        this.setId(this.getCounter());
        this.setExternalId(externalId);
        this.setContentType(contentType);
        
        this.setCounter();
    }

    // Methods

    // Getters & Setters
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getExternalId() {
        return this.externalId;
    }

    public void setExternalId(int externalId) {
        this.externalId = externalId;
    }

    public String getContentType() {
        return this.contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public ArrayList<Comment> getComments() {
        return this.comments;
    }

    public int getCounter() {
        return this.counter;
    }

    public void setCounter() {
        this.counter++;
    }
}
