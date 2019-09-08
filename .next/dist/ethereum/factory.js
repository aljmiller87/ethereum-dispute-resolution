'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiledContract = require('../ethereum/build/ThreeJudge.json'); // importing instance from file, not constructor from library

var compiledFactory = compiledContract.ContractFactory;
var compiledFactoryABI = compiledFactory.abi;

var instance = new _web2.default.eth.Contract(compiledFactoryABI, '0xe5D56E8A10fafd7707A30aDca580C15A2280AEc5');

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsImNvbXBpbGVkQ29udHJhY3QiLCJyZXF1aXJlIiwiY29tcGlsZWRGYWN0b3J5IiwiQ29udHJhY3RGYWN0b3J5IiwiY29tcGlsZWRGYWN0b3J5QUJJIiwiYWJpIiwiaW5zdGFuY2UiLCJldGgiLCJDb250cmFjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsQUFBTyxBQUFVOzs7Ozs7QUFDakIsSUFBTSxtQkFBbUIsUUFBekIsQUFBeUIsQUFBUSxzQ0FGakM7O0FBR0EsSUFBTSxrQkFBa0IsaUJBQXhCLEFBQXlDO0FBQ3pDLElBQU0scUJBQXFCLGdCQUEzQixBQUEyQzs7QUFFM0MsSUFBTSxXQUFXLElBQUksY0FBQSxBQUFLLElBQVQsQUFBYSxTQUFiLEFBQ2Isb0JBREosQUFBaUIsQUFFYixBQUdKOztrQkFBQSxBQUFlIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsZXhtaWxsZXIvUHJvamVjdHMvc29saWRpdHkvdGhyZWVqdWRnZXMifQ==