import * as functions from 'firebase-functions';
import fetch from 'node-fetch';

export const getRamen = functions.https.onRequest((req, res) => {
  const zip = req.query.zip
  const init = {
      headers: {
        Authorization: 'Bearer TegPvPq2QJbdgNQkytikv7oPQqDhJdiSp1OOQCxWfqwA8Ob6hFqUV6zp17bgLd3EUv8lKSh3v1j2nLIFTVenj-9xLZZr0QIcW_1tSwEP0FOttp6hQwiM_lPwsI1CW3Yx'
      }
    }
  fetch(`https://api.yelp.com/v3/businesses/search?categories=ramen&location=${zip}`, init)
    .then(resp => resp.json())
    .then((resp) => {
      console.log('Businesses', resp.businesses);
      setTimeout(() => {
        res.send({ businesses: resp.businesses ? resp.businesses.sort((a: any, b: any) => a.distance - b.distance) : [] });
      }, 2000)
    });
 });
 