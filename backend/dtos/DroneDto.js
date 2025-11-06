export class DroneDTO {
    constructor({ id, name, description, price, image_path, speed, category, model, battery }) {
        this.id = id;
        this.name = name;
        this.description = description
        this.price = price;
        this.image_path = image_path;
        this.speed = speed;
        this.category = category;
        this.model = model;
        this.battery = battery;
    }
}
