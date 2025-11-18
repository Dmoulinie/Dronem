import { describe, test, expect } from "vitest";
import { DroneDTO } from "../dtos/DroneDto.js";

describe("DroneDTO", () => {

  test("doit correctement stocker les valeurs fournies au constructeur", () => {

    const input = {
      id: 7,
      name: "Drone Ultra X",
      description: "Drone très rapide et robuste",
      price: 35000,
      image_path: "drones/ultraX.png",
      speed: 80,
      category: "Froid",
      model: "UX-2025",
      battery: "4500mAh"
    };

    const drone = new DroneDTO(input);

    expect(drone.id).toBe(7);
    expect(drone.name).toBe("Drone Ultra X");
    expect(drone.description).toBe("Drone très rapide et robuste");
    expect(drone.price).toBe(35000);
    expect(drone.image_path).toBe("drones/ultraX.png");
    expect(drone.speed).toBe(80);
    expect(drone.category).toBe("Froid");
    expect(drone.model).toBe("UX-2025");
    expect(drone.battery).toBe("4500mAh");
  });

  test("doit contenir exactement toutes les propriétés prévues", () => {
    const input = {
      id: 1,
      name: "TestDrone",
      description: "Test",
      price: 1000,
      image_path: "img.png",
      speed: 20,
      category: "Chaud",
      model: "T1",
      battery: "3000mAh"
    };

    const drone = new DroneDTO(input);

    expect(Object.keys(drone)).toEqual([
      "id",
      "name",
      "description",
      "price",
      "image_path",
      "speed",
      "category",
      "model",
      "battery"
    ]);
  });

});
