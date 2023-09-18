import downloadsCsv from './pf-downloads';

const additionalExpressMiddlewareServerConfig = [downloadsCsv()];

export default additionalExpressMiddlewareServerConfig;
