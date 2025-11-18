import { describe, test, expect } from "vitest";
import { UserDto } from "../dtos/UserDto.js";

describe("UserDto", () => {

  test("doit correctement stocker les valeurs fournies au constructeur", () => {

    const input = {
      id: 42,
      firstname: "Florian",
      lastname: "Jean-Baptiste",
      password: "hashedPassword123",
      username: "floJB",
      email: "flo@test.com"
    };

    const user = new UserDto(input);

    expect(user.id).toBe(42);
    expect(user.firstname).toBe("Florian");
    expect(user.lastname).toBe("Jean-Baptiste");
    expect(user.password).toBe("hashedPassword123");
    expect(user.username).toBe("floJB");
    expect(user.email).toBe("flo@test.com");
  });

  test("doit contenir exactement toutes les propriétés prévues", () => {
    const input = {
      id: 1,
      firstname: "Test",
      lastname: "User",
      password: "pass",
      username: "tester",
      email: "test@test.com"
    };

    const user = new UserDto(input);

    expect(Object.keys(user)).toEqual([
      "id",
      "firstname",
      "lastname",
      "password",
      "username",
      "email"
    ]);
  });

});
