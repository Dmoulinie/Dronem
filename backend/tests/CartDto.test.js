import { describe, test, expect } from "vitest";
import { CartDto } from "../dtos/CartDto.js";

describe("CartDto", () => {
  test("doit correctement stocker les données passées au constructeur", () => {
    const input = {
      id: 1,
      price: 5000,
      listArticles: [
        { id: 10, name: "Drone Test", price: 2000 },
        { id: 11, name: "Batterie", price: 3000 }
      ]
    };

    const cart = new CartDto(input);

    expect(cart.id).toBe(1);
    expect(cart.price).toBe(5000);
    expect(cart.listArticles).toHaveLength(2);
    expect(cart.listArticles[0].name).toBe("Drone Test");
  });
});
