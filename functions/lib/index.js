"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
exports.getRamen = functions.https.onRequest((req, res) => {
    const zip = req.query.zip;
    const init = {
        headers: {
            Authorization: 'Bearer TegPvPq2QJbdgNQkytikv7oPQqDhJdiSp1OOQCxWfqwA8Ob6hFqUV6zp17bgLd3EUv8lKSh3v1j2nLIFTVenj-9xLZZr0QIcW_1tSwEP0FOttp6hQwiM_lPwsI1CW3Yx'
        }
    };
    node_fetch_1.default(`https://api.yelp.com/v3/businesses/search?categories=ramen&location=${zip}`, init)
        .then(resp => resp.json())
        .then((resp) => {
        console.log('Businesses', resp.businesses);
        setTimeout(() => {
            res.send({ businesses: resp.businesses ? resp.businesses.sort((a, b) => a.distance - b.distance) : [] });
        }, 2000);
    });
});
//# sourceMappingURL=index.js.map