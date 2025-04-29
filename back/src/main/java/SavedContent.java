
public class SavedContent {
    // Attributes
    private int id;
    private Content content;
    private int rating;
    private int position;

    private static int counter;

    // Constructors
    public SavedContent(Content content, int rating, int position) {
        this.setId(this.getCounter());
        this.setContent(content);
        this.setRating(rating);
        this.setPosition(position);

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

    public Content getContent() {
        return this.content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public int getRating() {
        return this.rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getPosition() {
        return this.position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getExternalId() {
        return this.content.getExternalId();
    }

    public String getContentType() {
        return this.content.getContentType();
    }

    public int getCounter() {
        return this.counter;
    }

    public void setCounter() {
        this.counter++;
    }
}
