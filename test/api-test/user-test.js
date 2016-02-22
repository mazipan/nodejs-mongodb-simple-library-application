/**
 * Created by irfan.maulana on 2/20/2016.
 */
/**
 * Created by irfan.maulana on 2/20/2016.
 */
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var random = Math.random();
var idProduct = "";

// UNIT test begin
describe("USER API UNIT TESTING",function(){
    it("should return all users",function(done){
        server
            .get("/api/users")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.result.should.equal(true);
                done();
            });

    });
});