import express from 'express';
import { getAPIResourceWithAuth } from '@plone/volto/helpers';

const HEADERS = [
  'Accept-Ranges',
  'Cache-Control',
  'Content-Disposition',
  'Content-Range',
  'Content-Type',
];

function downloadsCsv(req, res, next) {
  getAPIResourceWithAuth(req)
    .then((resource) => {
      // Just forward the headers that we need
      HEADERS.forEach((header) => {
        if (resource.get(header)) {
          res.set(header, resource.get(header));
        }
      });
      res.status(resource.statusCode);
      res.send(resource.body);
    })
    .catch(next);
}

export default function () {
  const middleware = express.Router();

  middleware.all(['/@@pf-downloads/*'], downloadsCsv);
  middleware.id = 'downloadsCsv';
  return middleware;
}
