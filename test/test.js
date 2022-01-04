const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "mywatchboxweb";

describe("Testing on Watch App", () => {

    it("test set up is working", () => {
        assert.equal(2+2, 4)
    })

    it("Can read items from Read only Collection", async () => {
        // create test db firestore for testing
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        // testdoc == place to store in (collection)"readonly" in a (doc)"testdoc" 
        const testDoc = db.collection("readonly").doc("testDoc");
        // await succesfull return on testDoc
        await firebase.assertSucceeds(testDoc.get());
    })

    it("can't write to files in read only collection", async () => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc2")
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })

    it("can write to users if user ID == auth user", async () => {
        // myAuth = added context for user in test 
        const myAuth = {uid: "Lucian", email: "lucian@gmail.com"};
        // adding myAuth to testApp so when ran it pretends Im signed as myAuth
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: myAuth}).firestore();
        const testDoc = db.collection("users").doc("Lucian");
        await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    })

    it("cant write to users if the user ID != auth user", async () => {
        const myAuth = {uid: "Lucian", email: "lucian@gmail.com"};
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: myAuth}).firestore();
        const testDoc = db.collection("users").doc("not_lucian");
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })
})