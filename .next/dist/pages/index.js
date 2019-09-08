'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/alexmiller/Projects/solidity/threejudges/pages/index.js?entry',
    _this = undefined;
// import Layout from '../components/Layout';


var CampaignIndex = function CampaignIndex(props) {
    console.log('props', props);

    // const renderCampaigns = () => {
    //     const items = props.campaigns.map(address => {
    //         return {
    //             header: address,
    //             description: (
    //                 <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>
    //             ),
    //             fluid: true
    //         }
    //     })

    //     return <Card.Group items={items} />
    // }
    return (
        // <Layout>
        _react2.default.createElement('div', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 26
            }
        }, _react2.default.createElement('h1', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 27
            }
        }, 'Open Campaigns'), _react2.default.createElement(_routes.Link, { route: '/campaigns/new', __source: {
                fileName: _jsxFileName,
                lineNumber: 28
            }
        }, _react2.default.createElement('a', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 29
            }
        }, _react2.default.createElement(_semanticUiReact.Button, {
            content: 'Create Campaign',
            icon: 'add circle',
            primary: true,
            floated: 'right',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 30
            }
        }))), _react2.default.createElement('p', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 40
            }
        }, 'test'))
        // </Layout>

    );
};

CampaignIndex.getInitialProps = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var contracts;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _factory2.default.methods.getdeployedContracts().call();

                case 2:
                    contracts = _context.sent;
                    return _context.abrupt('return', { contracts: contracts });

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, _this);
}));

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQnV0dG9uIiwiQ2FyZCIsImZhY3RvcnkiLCJMaW5rIiwiQ2FtcGFpZ25JbmRleCIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImdldEluaXRpYWxQcm9wcyIsIm1ldGhvZHMiLCJnZXRkZXBsb3llZENvbnRyYWN0cyIsImNhbGwiLCJjb250cmFjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVMsQUFBUTs7QUFDakIsQUFBTyxBQUFhOzs7O0FBRXBCLEFBQVMsQUFBWTs7Ozs7O0FBRHJCOzs7QUFJQSxJQUFNLGdCQUFnQixTQUFoQixBQUFnQixjQUFBLEFBQUMsT0FBVSxBQUM3QjtZQUFBLEFBQVEsSUFBUixBQUFZLFNBQVosQUFBcUIsQUFFckI7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNJO0FBQ0E7d0JBQUEsY0FBQTs7MEJBQUE7NEJBQUEsQUFDSTtBQURKO0FBQUEsMkJBQ0ksY0FBQTs7MEJBQUE7NEJBQUE7QUFBQTtBQUFBLFdBREosQUFDSSxBQUNBLG1DQUFBLEFBQUMsOEJBQUssT0FBTixBQUFZOzBCQUFaOzRCQUFBLEFBQ0k7QUFESjsyQkFDSSxjQUFBOzswQkFBQTs0QkFBQSxBQUNJO0FBREo7QUFBQSwyQkFDSSxBQUFDO3FCQUFELEFBQ1ksQUFDUjtrQkFGSixBQUVTLEFBQ0w7cUJBSEosQUFJSTtxQkFKSixBQUlZOzswQkFKWjs0QkFKWixBQUVJLEFBQ0ksQUFDSSxBQVVSO0FBVlE7QUFDSSw4QkFTWixjQUFBOzswQkFBQTs0QkFBQTtBQUFBO0FBQUEsV0FkSixBQWNJLEFBRUo7QUFsQkosQUFxQkg7OztBQXJDRDs7QUF1Q0EsY0FBQSxBQUFjLDJGQUFrQixtQkFBQTtRQUFBO2tFQUFBO2tCQUFBOzZDQUFBO3FCQUFBO29DQUFBOzJCQUNKLGtCQUFBLEFBQVEsUUFBUixBQUFnQix1QkFEWixBQUNKLEFBQXVDOztxQkFBekQ7QUFEc0IseUNBQUE7cURBRXJCLEVBQUUsV0FGbUIsQUFFckI7O3FCQUZxQjtxQkFBQTtvQ0FBQTs7QUFBQTtnQkFBQTtBQUFoQyxBQUtBOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGV4bWlsbGVyL1Byb2plY3RzL3NvbGlkaXR5L3RocmVlanVkZ2VzIn0=