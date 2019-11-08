// next-routes used for routes with custom tokens
const routes = require('next-routes')();
// Order matters
// routes.add('/campaigns/new', '/campaigns/new')
routes.add('/contracts/:address', '/contracts/detail');
// routes.add('/campaigns/:address/requests', '/campaigns/requests/index');
// routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new');


module.exports = routes;