'use strict';

// next-routes used for routes with custom tokens
var routes = require('next-routes')();
// Order matters
// routes.add('/campaigns/new', '/campaigns/new')
routes.add('/contracts/:address', '/contracts/detail');
// routes.add('/campaigns/:address/requests', '/campaigns/requests/index');
// routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new');


module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU0sU0FBUyxBQUFmO0FBQ0E7QUFDQTtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsdUJBQWtDLEFBQWxDO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTyxBQUFQLFVBQWlCLEFBQWpCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleG1pbGxlci9Qcm9qZWN0cy9zb2xpZGl0eS90aHJlZWp1ZGdlcyJ9