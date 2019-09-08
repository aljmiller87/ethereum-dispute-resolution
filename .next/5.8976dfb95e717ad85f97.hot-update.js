webpackHotUpdate(5,{

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(86);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(87);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(752);

var _factory = __webpack_require__(1023);

var _factory2 = _interopRequireDefault(_factory);

var _routes = __webpack_require__(1206);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/alexmiller/Projects/solidity/threejudges/pages/index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/alexmiller/Projects/solidity/threejudges/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS44OTc2ZGZiOTVlNzE3YWQ4NWY5Ny5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/OWNhMTBiZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBCdXR0b24sIENhcmQgfSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuLi9ldGhlcmV1bS9mYWN0b3J5Jztcbi8vIGltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlcyc7XG5cblxuY29uc3QgQ2FtcGFpZ25JbmRleCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdwcm9wcycsIHByb3BzKTtcblxuICAgIC8vIGNvbnN0IHJlbmRlckNhbXBhaWducyA9ICgpID0+IHtcbiAgICAvLyAgICAgY29uc3QgaXRlbXMgPSBwcm9wcy5jYW1wYWlnbnMubWFwKGFkZHJlc3MgPT4ge1xuICAgIC8vICAgICAgICAgcmV0dXJuIHtcbiAgICAvLyAgICAgICAgICAgICBoZWFkZXI6IGFkZHJlc3MsXG4gICAgLy8gICAgICAgICAgICAgZGVzY3JpcHRpb246IChcbiAgICAvLyAgICAgICAgICAgICAgICAgPExpbmsgcm91dGU9e2AvY2FtcGFpZ25zLyR7YWRkcmVzc31gfT48YT5WaWV3IENhbXBhaWduPC9hPjwvTGluaz5cbiAgICAvLyAgICAgICAgICAgICApLFxuICAgIC8vICAgICAgICAgICAgIGZsdWlkOiB0cnVlXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pXG5cbiAgICAvLyAgICAgcmV0dXJuIDxDYXJkLkdyb3VwIGl0ZW1zPXtpdGVtc30gLz5cbiAgICAvLyB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgLy8gPExheW91dD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMT5PcGVuIENhbXBhaWduczwvaDE+XG4gICAgICAgICAgICA8TGluayByb3V0ZT1cIi9jYW1wYWlnbnMvbmV3XCI+XG4gICAgICAgICAgICAgICAgPGE+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9XCJDcmVhdGUgQ2FtcGFpZ25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImFkZCBjaXJjbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXRlZD1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG5cbiAgICAgICAgICAgIHsvKiB7cmVuZGVyQ2FtcGFpZ25zKCl9ICovfVxuICAgICAgICAgICAgPHA+dGVzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIC8vIDwvTGF5b3V0PlxuXG4gICAgKVxufVxuXG5DYW1wYWlnbkluZGV4LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb250cmFjdHMgPSBhd2FpdCBmYWN0b3J5Lm1ldGhvZHMuZ2V0ZGVwbG95ZWRDb250cmFjdHMoKS5jYWxsKCk7XG4gICAgcmV0dXJuIHsgY29udHJhY3RzIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FtcGFpZ25JbmRleDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFGQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQUE7O0FBSkE7QUFVQTtBQVZBO0FBQ0E7O0FBU0E7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBOztBQXRDQTtBQUNBO0FBc0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFFQTtBQUNBO0FBSEE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFLQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==