const request=require("request");
var functions=require("../functions");

describe("calc", () => {
    it("should multiply 2 and 2", () => {
        expect(2*2).toBe(4);
    })
})

describe("get messages", () => {
  it('should return 200 ok', (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
        expect(res.statusCode).toEqual(200);
        done(); 
    });
  });

  it('should return non empty list', (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
        expect(res.body.length).toBeGreaterThan(0);
        done(); 
    });
  });
});


describe("get messages tdd", () => {
  it('should return 200 ok', (done) => {
    request.get("http://localhost:3000/messages/dani", (err, res) => {
        expect(res.statusCode).toEqual(200);
        done(); 
    });
  });

  it('name should be dani', (done) => {
    request.get("http://localhost:3000/messages/dani", (err, res) => {
        JSON.parse(res.body).forEach((message) => {
          expect(message.name.toLowerCase().substring(0,4)).toEqual("dani");
        })
        done(); 
    });
  });
});


describe("set de pruebas tdd", () => {
  it('it should do the pow function', () => {
    expect(functions.pow(2,3)).toBe(8);
  });
})

