import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from "supertest";

describe("User (end to end)", () => {
  /** The testing Nest application */
  let app: INestApplication;

  /** Testing module initialization */
  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = testModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  /** User registration */
  const userEmail = "test@example.com";
  const userPassword = "abc123";

  let userID: string;
  let authToken: string;

  /** 1. Account registration */
  it("User (Registration)", () => {
    return request(app.getHttpServer())
      .post("/user")
      .send({
        email: userEmail,
        password: userPassword,
      })
      .expect(HttpStatus.CREATED) // 201
      .then((response) => {
        userID = response.body.id;
        expect(userID).toBeDefined();
        expect(response.body.password).toBeUndefined();
      });
  });

  /** 2. Login */
  it("User (Login)", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: userEmail,
        password: userPassword,
      })
      .expect(HttpStatus.OK) // 200
      .then((response) => {
        authToken = response.body.access_token;
        expect(authToken).toBeDefined();
      });
  });

  /** 3. User-based authentified operations */

  // GET
  it("User (Authentified operations)", () => {
    return request(app.getHttpServer())
      .get(`/user/${userID}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(HttpStatus.OK) // 200
      .then((response) => {
        expect(response.body.email).toEqual(userEmail);
      });
  });

  /** 4. Deletion */
  it("User (Deletion)", () => {
    return request(app.getHttpServer())
      .delete(`/user/${userID}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(HttpStatus.OK); // 200
  });
});
