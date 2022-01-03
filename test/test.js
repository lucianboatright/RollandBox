const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "mywatchboxweb";

describe("Testing on Watch App", () => {

    it("test set up is working", () => {
        assert.equal(2+2, 4)
    })

    it("Can read items from Read only Collection", async () => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })

    it("can write to files in read only collection"), async () => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = bd.collection("readonly").doc("testDoc2")
        await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    }
})