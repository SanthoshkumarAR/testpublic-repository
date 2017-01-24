var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app.js');
var should = chai.should();
chai.use(chaiHttp);

var routesPath = '/api/todos/message';

/**
 * Test Suites
 */
describe('<Unit Test>', function () {
    // Start the server before the test case with delay of 1second to instantiate the routers
    before(function (done) {
        this.request = chai.request(server);
        setTimeout(function () {
            done();
        }, 1000);
    });

    describe('Twilio SMS Test Cases', function () {
        it('should be able to send SMS without problems', function (done) {
            this.request.post(routesPath)
                .send({
                    "toNumber": "xxxxxxxxxxx",
                    "fromNumber": "xxxxxxxxxxx",
                    "msg": "hello Twilio"
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('status', 'Success');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('sid');
                    done();
                });
        });

        it('should not be able to send SMS without message', function (done) {
            this.request.post(routesPath)
                .send({
                    "toNumber": "xxxxxxxxxxx",
                    "fromNumber": "xxxxxxxxxxx",
                    "msg": ""
                })
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.body.should.have.property('status', 'Error');
                    res.body.should.have.property('data');
                    done();
                });
        });

        it('should not be able to send SMS without fromNumber', function (done) {
            this.request.post(routesPath)
                .send({
                    "toNumber": "xxxxxxxxxxx",
                    "fromNumber": "",
                    "msg": "hello Twilio"
                })
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.body.should.have.property('status', 'Error');
                    res.body.should.have.property('data');
                    done();
                });
        });

        it('should not be able to send SMS without toNumber', function (done) {
            this.request.post(routesPath)
                .send({
                    "toNumber": "",
                    "fromNumber": "xxxxxxxxxxx",
                    "msg": "hello Twilio"
                })
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.body.should.have.property('status', 'Error');
                    res.body.should.have.property('data');
                    done();
                });
        });
    });

});
