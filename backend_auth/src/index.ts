import {onRequest} from "firebase-functions/v2/https";

import {verifyCloudProof} from "@worldcoin/idkit-core/backend";

export const verify = onRequest(
    {
        cors: [/demeterai\.xyz$/, "demeterai.xyz"],
    }, async (request, response) => {
        const proof = request.body;
        const appId = "app_f32b2c3858088f2b38457067d1761622";
        const action = "demeter";
        response.send(200);

        const verifyRes = await verifyCloudProof(proof, appId, action);

        if (verifyRes.success) {
            response.send(verifyRes);
        } else {
            response.status(400).send(verifyRes);
        }
    });
