'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* original line:
const web3 = new Web3(window.web3.currentProvider);
window does not work in node environment
*/

var web3 = void 0; // This config assumes users already has metamask installed

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask defined
    window.ethereum.enable();
    web3 = new _web2.default(window.web3.currentProvider);
    console.log('metamask enabled');
} else {
    // We are on the server *OR* the user is not running metamask
    var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/v3/ad66eb1337e043b2b50abe1323fff5f0');
    web3 = new _web2.default(provider);
    console.log('infura enabled');
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJldGhlcmV1bSIsImVuYWJsZSIsImN1cnJlbnRQcm92aWRlciIsImNvbnNvbGUiLCJsb2ciLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsQUFBTzs7Ozs7O0FBQ1A7Ozs7O0FBS0EsSUFBSSxZQUFKLEdBUkE7O0FBV0EsSUFBSSxPQUFBLEFBQU8sV0FBUCxBQUFrQixlQUFlLE9BQU8sT0FBUCxBQUFjLFNBQW5ELEFBQTRELGFBQWEsQUFDckU7QUFDQTtXQUFBLEFBQU8sU0FBUCxBQUFnQixBQUNoQjtXQUFPLEFBQUksa0JBQUssT0FBQSxBQUFPLEtBQXZCLEFBQU8sQUFBcUIsQUFDNUI7WUFBQSxBQUFRLElBQVIsQUFBWSxBQUVmO0FBTkQsT0FNTyxBQUNIO0FBQ0E7UUFBTSxXQUFXLElBQUksY0FBQSxBQUFLLFVBQVQsQUFBbUIsYUFBcEMsQUFBaUIsQUFDYixBQUVKO1dBQU8sQUFBSSxrQkFBWCxBQUFPLEFBQVMsQUFDaEI7WUFBQSxBQUFRLElBQVIsQUFBWSxBQUVmO0FBRUQ7O2tCQUFBLEFBQWUiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleG1pbGxlci9Qcm9qZWN0cy9zb2xpZGl0eS90aHJlZWp1ZGdlcyJ9