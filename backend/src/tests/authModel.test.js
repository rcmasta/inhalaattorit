const { expect } = require("chai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getAdmin, verifyPassword, signToken } = require("../models/authModel");

describe("authModel", () => {

    it("should return an admin for a known username", async () => {
        const admin = await getAdmin("test");

        expect(admin).to.exist;
        expect(admin.username).to.equal("test");
        expect(admin).to.have.property("password");
    });

    it("should return undefined for an unknown username", async () => {
        const admin = await getAdmin("missing-user");

        expect(admin).to.equal(undefined);
    });

    it("should verify a valid password against a hash", async () => {
        const password = "secret-pass";
        const hash = await bcrypt.hash(password, 10);

        const result = await verifyPassword({ username: "tester", password: hash }, password);

        expect(result).to.equal(true);
    });

    it("should reject an invalid password against a hash", async () => {
        const hash = await bcrypt.hash("correct-pass", 10);

        const result = await verifyPassword({ username: "tester", password: hash }, "wrong-pass");

        expect(result).to.equal(false);
    });

    it("should sign a token containing the admin username", (done) => {
        signToken({ username: "token-user" }, (err, token) => {
            try {
                expect(err).to.equal(null);
                expect(token).to.be.a("string");

                const privateKey = fs.readFileSync("jwtPrivateKey.pem", "utf-8");
                const decoded = jwt.verify(token, privateKey);

                expect(decoded.username).to.equal("token-user");
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});
