/**
 * Created by irfan.maulana on 2/20/2016.
 */
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var random = Math.random();

// UNIT test begin
describe("BOOK API UNIT TESTING",function(){
    it("should return all books",function(done){
        server
            .get("/api/books")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.result.should.equal(true);
                done();
            });
    });
});