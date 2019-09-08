'use strict';

// next-routes used for routes with custom tokens
var routes = require('next-routes')();
// Order matters
routes.add('/campaigns/new', '/campaigns/new');
routes.add('/campaigns/:address', '/campaigns/show');
routes.add('/campaigns/:address/requests', '/campaigns/requests/index');
routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU0sU0FBUyxBQUFmO0FBQ0E7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLGtCQUE2QixBQUE3QjtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsdUJBQWtDLEFBQWxDO0FBQ0EsT0FBTyxBQUFQLElBQVcsQUFBWCxnQ0FBMkMsQUFBM0M7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLG9DQUErQyxBQUEvQzs7QUFHQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGV4bWlsbGVyL1Byb2plY3RzL3NvbGlkaXR5L3RocmVlanVkZ2VzIn0=