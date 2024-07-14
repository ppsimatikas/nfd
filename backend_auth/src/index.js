"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const https_1 = require("firebase-functions/v2/https");
const idkit_1 = require("@worldcoin/idkit");
exports.verify = (0, https_1.onRequest)(async (request, response) => {
    const proof = request.body;
    const app_id = "app_f32b2c3858088f2b38457067d1761622";
    const action = "demeter";
    const verifyRes = (await (0, idkit_1.verifyCloudProof)(proof, app_id, action));
    if (verifyRes.success) {
        response.send(verifyRes);
    }
    else {
        response.status(400).send(verifyRes);
    }
});
