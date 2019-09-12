'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

    console.log(coinbase, Coinbase);

    (0, _react.useEffect)(function () {
        console.log('useEffect');
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

    var renderContracts = function renderContracts() {
        var items = contracts.map(function (address) {
            return {
                header: address,
                content: _react2.default.createElement(_routes.Link, { route: '/contracts/' + address, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 38
                    }
                }, _react2.default.createElement('a', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 38
                    }
                }, 'View Campaign'))
            };
        });

        items = [].concat((0, _toConsumableArray3.default)(items), (0, _toConsumableArray3.default)(items));

        return _react2.default.createElement(_semanticUiReact.List, {
            animated: true,
            divided: true,
            items: items,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 46
            }
        });
    };

    return _react2.default.createElement(_Layout2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 55
        }
    }, _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 56
        }
    }, _react2.default.createElement('h1', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 57
        }
    }, coinbase), _react2.default.createElement(_routes.Link, { route: '/campaigns/new', __source: {
            fileName: _jsxFileName,
            lineNumber: 58
        }
    }, _react2.default.createElement('a', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 59
        }
    }, _react2.default.createElement(_semanticUiReact.Button, {
        content: 'Create Campaign',
        icon: 'add circle',
        primary: true,
        __source: {
            fileName: _jsxFileName,
            lineNumber: 60
        }
    }))), renderContracts(), _react2.default.createElement('p', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 69
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

                    console.log(coinbase);
                    return _context3.abrupt('return', { coinbase: coinbase, contracts: contracts });

                case 10:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, _this);
}));

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJCdXR0b24iLCJDYXJkIiwiTGlzdCIsImZhY3RvcnkiLCJ3ZWIzIiwiTGF5b3V0IiwiTGluayIsIkNhbXBhaWduSW5kZXgiLCJjb2luYmFzZSIsImNvbnRyYWN0cyIsIkNvaW5iYXNlIiwic2V0Q29pbmJhc2UiLCJDb250cmFjdHMiLCJzZXRDb250cmFjdHMiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiZXRoZXJldW0iLCJvbiIsImFjY291bnRzIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJtZXRob2RzIiwiZ2V0ZGVwbG95ZWRDb250cmFjdHMiLCJjYWxsIiwiZnJvbSIsIm5ldElkIiwicmVuZGVyQ29udHJhY3RzIiwiaXRlbXMiLCJtYXAiLCJoZWFkZXIiLCJhZGRyZXNzIiwiY29udGVudCIsImdldEluaXRpYWxQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUyxBQUFVOzs7O0FBQzFCLEFBQVMsQUFBUSxBQUFNOztBQUN2QixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQVk7Ozs7Ozs7QUFHckIsSUFBTSxnQkFBZ0IsU0FBaEIsQUFBZ0Isb0JBQTZCO1FBQTFCLEFBQTBCLGdCQUExQixBQUEwQjtRQUFoQixBQUFnQixpQkFBaEIsQUFBZ0I7O29CQUNmLHFCQURlLEFBQ2YsQUFBUzs2REFETTtRQUFBLEFBQ3hDLHNCQUR3QztRQUFBLEFBQzlCLHlCQUQ4Qjs7cUJBRWIscUJBRmEsQUFFYixBQUFTOzhEQUZJO1FBQUEsQUFFeEMsdUJBRndDO1FBQUEsQUFFN0IsMEJBQ2xCOztZQUFBLEFBQVEsSUFBUixBQUFZLFVBQVosQUFBc0IsQUFFdEI7OzBCQUFVLFlBQU0sQUFDWjtnQkFBQSxBQUFRLElBQVIsQUFBWSxBQUNaO1lBQUksT0FBSixBQUFXLFVBQVUsQUFDakI7bUJBQUEsQUFBTyxTQUFQLEFBQWdCLEdBQWhCLEFBQW1CLCtCQUFuQjtxR0FBc0MsaUJBQUEsQUFBTyxVQUFQO2dEQUFBOztrRkFBQTtrQ0FBQTs2REFBQTtxQ0FBQTtvREFBQTsyQ0FDVCxjQUFBLEFBQUssSUFESSxBQUNULEFBQVM7O3FDQURBO3FEQUFBO2dGQUMzQjtBQUQyQixxREFBQTtvREFBQTsyQ0FFVixrQkFBQSxBQUFRLFFBQVIsQUFBZ0IsdUJBQWhCLEFBQXVDLEtBQXZDLEFBQTRDLElBQUksRUFBRSxNQUZ4QyxBQUVWLEFBQWdELEFBQVE7O3FDQUExRTtBQUY0Qix5REFHbEM7O2dEQUFBLEFBQVksQUFDWjtpREFKa0MsQUFJbEMsQUFBYTs7cUNBSnFCO3FDQUFBO29EQUFBOztBQUFBO2dDQUFBO0FBQXRDOztxQ0FBQTs2Q0FBQTtBQUFBO0FBT0E7O21CQUFBLEFBQU8sU0FBUCxBQUFnQixHQUFoQixBQUFtQiw4QkFBbkI7cUdBQXFDLGtCQUFBLEFBQU8sT0FBUDtnREFBQTs7b0ZBQUE7a0NBQUE7K0RBQUE7cUNBQUE7cURBQUE7MkNBQ1IsY0FBQSxBQUFLLElBREcsQUFDUixBQUFTOztxQ0FERDtzREFBQTtnRkFDMUI7QUFEMEIscURBQUE7cURBQUE7MkNBRVQsa0JBQUEsQUFBUSxRQUFSLEFBQWdCLHVCQUFoQixBQUF1QyxLQUF2QyxBQUE0QyxJQUFJLEVBQUUsTUFGekMsQUFFVCxBQUFnRCxBQUFROztxQ0FBMUU7QUFGMkIsMERBR2pDOztnREFBQSxBQUFZLEFBQ1o7aURBSmlDLEFBSWpDLEFBQWE7O3FDQUpvQjtxQ0FBQTtxREFBQTs7QUFBQTtpQ0FBQTtBQUFyQzs7c0NBQUE7NkNBQUE7QUFBQTtBQU1IO0FBQ0o7QUFqQkQsT0FBQSxBQWlCRyxBQUVIOztRQUFNLGtCQUFrQixTQUFsQixBQUFrQixrQkFBTSxBQUMxQjtZQUFJLGtCQUFRLEFBQVUsSUFBSSxtQkFBVyxBQUNqQzs7d0JBQU8sQUFDSyxBQUNSO3lDQUNJLEFBQUMsOEJBQUssdUJBQU4sQUFBMkI7a0NBQTNCO29DQUFBLEFBQXNDO0FBQXRDO2lCQUFBLGtCQUFzQyxjQUFBOztrQ0FBQTtvQ0FBQTtBQUFBO0FBQUEsbUJBSDlDLEFBQU8sQUFHQyxBQUFzQyxBQUdqRDtBQU5VLEFBQ0g7QUFGUixBQUFZLEFBU1osU0FUWTs7MkRBU1osQUFBWSx5Q0FBWixBQUFzQixBQUV0Qjs7K0JBQ0ksQUFBQztzQkFBRCxBQUNjLEFBQ1Y7cUJBRkosQUFFYSxBQUNUO21CQUhKLEFBR1c7OzBCQUhYOzRCQURKLEFBQ0ksQUFNUDtBQU5PO0FBQ0ksU0FESjtBQWJSLEFBcUJBOzsyQkFDSSxBQUFDOztzQkFBRDt3QkFBQSxBQUNJO0FBREo7QUFBQSxLQUFBLGtCQUNJLGNBQUE7O3NCQUFBO3dCQUFBLEFBQ0k7QUFESjtBQUFBLHVCQUNJLGNBQUE7O3NCQUFBO3dCQUFBLEFBQUs7QUFBTDtBQUFBLE9BREosQUFDSSxBQUNBLDJCQUFBLEFBQUMsOEJBQUssT0FBTixBQUFZO3NCQUFaO3dCQUFBLEFBQ0k7QUFESjt1QkFDSSxjQUFBOztzQkFBQTt3QkFBQSxBQUNJO0FBREo7QUFBQSx1QkFDSSxBQUFDO2lCQUFELEFBQ1ksQUFDUjtjQUZKLEFBRVMsQUFDTDtpQkFISjs7c0JBQUE7d0JBSlosQUFFSSxBQUNJLEFBQ0ksQUFRUDtBQVJPO0FBQ0ksVUFMaEIsQUFhSSxtQ0FBQSxjQUFBOztzQkFBQTt3QkFBQTtBQUFBO0FBQUEsT0FmWixBQUNJLEFBQ0ksQUFhSSxBQUtmO0FBakVEOztBQW1FQSxjQUFBLEFBQWMsMkZBQWtCLG9CQUFBO2lDQUFBOztvRUFBQTtrQkFBQTsrQ0FBQTtxQkFBQTtxQ0FBQTsyQkFDSCxjQUFBLEFBQUssSUFERixBQUNILEFBQVM7O3FCQUROO3NDQUFBO2lFQUNyQjtBQURxQixzQ0FBQTtxQ0FBQTsyQkFFSixrQkFBQSxBQUFRLFFBQVIsQUFBZ0IsdUJBQWhCLEFBQXVDLEtBQXZDLEFBQTRDLElBQUksRUFBRSxNQUY5QyxBQUVKLEFBQWdELEFBQVE7O3FCQUExRTtBQUZzQiwwQ0FHNUI7OzRCQUFBLEFBQVEsSUFIb0IsQUFHNUIsQUFBWTtzREFDTCxFQUFFLFVBQUYsVUFBWSxXQUpTLEFBSXJCOztxQkFKcUI7cUJBQUE7cUNBQUE7O0FBQUE7aUJBQUE7QUFBaEMsQUFPQTs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleG1pbGxlci9Qcm9qZWN0cy9zb2xpZGl0eS90aHJlZWp1ZGdlcyJ9