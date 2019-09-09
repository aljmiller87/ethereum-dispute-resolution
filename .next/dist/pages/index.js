'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _this = undefined,
    _jsxFileName = '/Users/alexmiller/Projects/solidity/threejudges/pages/index.js?entry';

var CampaignIndex = function CampaignIndex(_ref) {
    var coinbase = _ref.coinbase,
        contracts = _ref.contracts;

    var _useState = (0, _react.useState)(coinbase),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        Coinbase = _useState2[0],
        setCoinbase = _useState2[1];

    var _useState3 = (0, _react.useState)(contracts),
        _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
        Contracts = _useState4[0],
        setContracts = _useState4[1];

    (0, _react.useEffect)(function () {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accounts) {
                    var _ref3, _ref4, coinbase, contracts;

                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _web2.default.eth.getAccounts();

                                case 2:
                                    _ref3 = _context.sent;
                                    _ref4 = (0, _slicedToArray3.default)(_ref3, 1);
                                    coinbase = _ref4[0];
                                    _context.next = 7;
                                    return _factory2.default.methods.getdeployedContracts().call({}, { from: coinbase });

                                case 7:
                                    contracts = _context.sent;

                                    setCoinbase(coinbase);
                                    setContracts(contracts);

                                case 10:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x) {
                    return _ref2.apply(this, arguments);
                };
            }());

            window.ethereum.on('networkChanged', function () {
                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(netId) {
                    var _ref6, _ref7, coinbase, contracts;

                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return _web2.default.eth.getAccounts();

                                case 2:
                                    _ref6 = _context2.sent;
                                    _ref7 = (0, _slicedToArray3.default)(_ref6, 1);
                                    coinbase = _ref7[0];
                                    _context2.next = 7;
                                    return _factory2.default.methods.getdeployedContracts().call({}, { from: coinbase });

                                case 7:
                                    contracts = _context2.sent;

                                    setCoinbase(coinbase);
                                    setContracts(contracts);

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }));

                return function (_x2) {
                    return _ref5.apply(this, arguments);
                };
            }());
        }
    }, []);
    return _react2.default.createElement(_Layout2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 31
        }
    }, _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 32
        }
    }, _react2.default.createElement('h1', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 33
        }
    }, coinbase), _react2.default.createElement(_routes.Link, { route: '/campaigns/new', __source: {
            fileName: _jsxFileName,
            lineNumber: 34
        }
    }, _react2.default.createElement('a', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 35
        }
    }, _react2.default.createElement(_semanticUiReact.Button, {
        content: 'Create Campaign',
        icon: 'add circle',
        primary: true,
        floated: 'right',
        __source: {
            fileName: _jsxFileName,
            lineNumber: 36
        }
    }))), _react2.default.createElement('p', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 46
        }
    }, 'test')));
};

CampaignIndex.getInitialProps = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var _ref9, _ref10, coinbase, contracts;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return _web2.default.eth.getAccounts();

                case 2:
                    _ref9 = _context3.sent;
                    _ref10 = (0, _slicedToArray3.default)(_ref9, 1);
                    coinbase = _ref10[0];
                    _context3.next = 7;
                    return _factory2.default.methods.getdeployedContracts().call({}, { from: coinbase });

                case 7:
                    contracts = _context3.sent;
                    return _context3.abrupt('return', { coinbase: coinbase, contracts: contracts });

                case 9:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, _this);
}));

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJCdXR0b24iLCJDYXJkIiwiZmFjdG9yeSIsIndlYjMiLCJMYXlvdXQiLCJMaW5rIiwiQ2FtcGFpZ25JbmRleCIsImNvaW5iYXNlIiwiY29udHJhY3RzIiwiQ29pbmJhc2UiLCJzZXRDb2luYmFzZSIsIkNvbnRyYWN0cyIsInNldENvbnRyYWN0cyIsIndpbmRvdyIsImV0aGVyZXVtIiwib24iLCJhY2NvdW50cyIsImV0aCIsImdldEFjY291bnRzIiwibWV0aG9kcyIsImdldGRlcGxveWVkQ29udHJhY3RzIiwiY2FsbCIsImZyb20iLCJuZXRJZCIsImdldEluaXRpYWxQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTLEFBQVU7Ozs7QUFDMUIsQUFBUyxBQUFROztBQUNqQixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQVk7Ozs7Ozs7QUFHckIsSUFBTSxnQkFBZ0IsU0FBaEIsQUFBZ0Isb0JBQTZCO1FBQTFCLEFBQTBCLGdCQUExQixBQUEwQjtRQUFoQixBQUFnQixpQkFBaEIsQUFBZ0I7O29CQUNmLHFCQURlLEFBQ2YsQUFBUzs2REFETTtRQUFBLEFBQ3hDLHNCQUR3QztRQUFBLEFBQzlCLHlCQUQ4Qjs7cUJBRWIscUJBRmEsQUFFYixBQUFTOzhEQUZJO1FBQUEsQUFFeEMsdUJBRndDO1FBQUEsQUFFN0IsMEJBRWxCOzswQkFBVSxZQUFNLEFBQ1o7WUFBSSxPQUFKLEFBQVcsVUFBVSxBQUNqQjttQkFBQSxBQUFPLFNBQVAsQUFBZ0IsR0FBaEIsQUFBbUIsK0JBQW5CO3FHQUFzQyxpQkFBQSxBQUFPLFVBQVA7Z0RBQUE7O2tGQUFBO2tDQUFBOzZEQUFBO3FDQUFBO29EQUFBOzJDQUNULGNBQUEsQUFBSyxJQURJLEFBQ1QsQUFBUzs7cUNBREE7cURBQUE7Z0ZBQzNCO0FBRDJCLHFEQUFBO29EQUFBOzJDQUVWLGtCQUFBLEFBQVEsUUFBUixBQUFnQix1QkFBaEIsQUFBdUMsS0FBdkMsQUFBNEMsSUFBSSxFQUFFLE1BRnhDLEFBRVYsQUFBZ0QsQUFBUTs7cUNBQTFFO0FBRjRCLHlEQUdsQzs7Z0RBQUEsQUFBWSxBQUNaO2lEQUprQyxBQUlsQyxBQUFhOztxQ0FKcUI7cUNBQUE7b0RBQUE7O0FBQUE7Z0NBQUE7QUFBdEM7O3FDQUFBOzZDQUFBO0FBQUE7QUFPQTs7bUJBQUEsQUFBTyxTQUFQLEFBQWdCLEdBQWhCLEFBQW1CLDhCQUFuQjtxR0FBcUMsa0JBQUEsQUFBTyxPQUFQO2dEQUFBOztvRkFBQTtrQ0FBQTsrREFBQTtxQ0FBQTtxREFBQTsyQ0FDUixjQUFBLEFBQUssSUFERyxBQUNSLEFBQVM7O3FDQUREO3NEQUFBO2dGQUMxQjtBQUQwQixxREFBQTtxREFBQTsyQ0FFVCxrQkFBQSxBQUFRLFFBQVIsQUFBZ0IsdUJBQWhCLEFBQXVDLEtBQXZDLEFBQTRDLElBQUksRUFBRSxNQUZ6QyxBQUVULEFBQWdELEFBQVE7O3FDQUExRTtBQUYyQiwwREFHakM7O2dEQUFBLEFBQVksQUFDWjtpREFKaUMsQUFJakMsQUFBYTs7cUNBSm9CO3FDQUFBO3FEQUFBOztBQUFBO2lDQUFBO0FBQXJDOztzQ0FBQTs2Q0FBQTtBQUFBO0FBTUg7QUFDSjtBQWhCRCxPQUFBLEFBZ0JHLEFBQ0g7MkJBQ0ksQUFBQzs7c0JBQUQ7d0JBQUEsQUFDSTtBQURKO0FBQUEsS0FBQSxrQkFDSSxjQUFBOztzQkFBQTt3QkFBQSxBQUNJO0FBREo7QUFBQSx1QkFDSSxjQUFBOztzQkFBQTt3QkFBQSxBQUFLO0FBQUw7QUFBQSxPQURKLEFBQ0ksQUFDQSwyQkFBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTtzQkFBWjt3QkFBQSxBQUNJO0FBREo7dUJBQ0ksY0FBQTs7c0JBQUE7d0JBQUEsQUFDSTtBQURKO0FBQUEsdUJBQ0ksQUFBQztpQkFBRCxBQUNZLEFBQ1I7Y0FGSixBQUVTLEFBQ0w7aUJBSEosQUFJSTtpQkFKSixBQUlZOztzQkFKWjt3QkFKWixBQUVJLEFBQ0ksQUFDSSxBQVVSO0FBVlE7QUFDSSwwQkFTWixjQUFBOztzQkFBQTt3QkFBQTtBQUFBO0FBQUEsT0FoQlosQUFDSSxBQUNJLEFBY0ksQUFLZjtBQTFDRDs7QUE0Q0EsY0FBQSxBQUFjLDJGQUFrQixvQkFBQTtpQ0FBQTs7b0VBQUE7a0JBQUE7K0NBQUE7cUJBQUE7cUNBQUE7MkJBQ0gsY0FBQSxBQUFLLElBREYsQUFDSCxBQUFTOztxQkFETjtzQ0FBQTtpRUFDckI7QUFEcUIsc0NBQUE7cUNBQUE7MkJBRUosa0JBQUEsQUFBUSxRQUFSLEFBQWdCLHVCQUFoQixBQUF1QyxLQUF2QyxBQUE0QyxJQUFJLEVBQUUsTUFGOUMsQUFFSixBQUFnRCxBQUFROztxQkFBMUU7QUFGc0IsMENBQUE7c0RBR3JCLEVBQUUsVUFBRixVQUFZLFdBSFMsQUFHckI7O3FCQUhxQjtxQkFBQTtxQ0FBQTs7QUFBQTtpQkFBQTtBQUFoQyxBQU1BOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGV4bWlsbGVyL1Byb2plY3RzL3NvbGlkaXR5L3RocmVlanVkZ2VzIn0=