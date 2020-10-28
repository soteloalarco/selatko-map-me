const supertest = require("supertest");

var server = supertest.agent("http://localhost:1337/");

describe("SAMPLE unit test", () => {
  it("should return home page", (done) => {
    server
      .get("/")
      .expect(200)
      .end(function(err,res) {
        done();
      });
  });
});