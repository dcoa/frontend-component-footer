function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @implements {GoogleTagManagerLoader}
 * @memberof module:GoogleTagManager
 */
var GoogleTagManagerLoader = /*#__PURE__*/function () {
  function GoogleTagManagerLoader(_ref) {
    var config = _ref.config;
    _classCallCheck(this, GoogleTagManagerLoader);
    this.gtmId = config.GOOGLE_TAG_MANAGER_ID;
    this.gtmArgs = '';
    if (config.GOOGLE_TAG_MANAGER_ENVIRONMENT) {
      if (!config.GOOGLE_TAG_MANAGER_ENVIRONMENT.startsWith('&')) {
        this.gtmArgs += '&';
      }
      this.gtmArgs += config.GOOGLE_TAG_MANAGER_ENVIRONMENT;
    }
  }
  _createClass(GoogleTagManagerLoader, [{
    key: "loadScript",
    value: function loadScript() {
      if (!this.gtmId) {
        return;
      }
      global.googleTagManager = global.googleTagManager || [];
      var _global = global,
        googleTagManager = _global.googleTagManager;

      // If the snippet was invoked do nothing.
      if (googleTagManager.invoked) {
        return;
      }

      // Invoked flag, to make sure the snippet is never invoked twice.
      googleTagManager.invoked = true;
      googleTagManager.load = function (key, args, options) {
        var scriptSrc = document.createElement('script');
        scriptSrc.type = 'text/javascript';
        scriptSrc.async = true;
        scriptSrc.innerHTML = "\n      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n       'https://www.googletagmanager.com/gtm.js?id='+i+dl+'".concat(args, "';f.parentNode.insertBefore(j,f);       \n       })(window,document,'script','dataLayer','").concat(key, "');\n      ");
        document.head.insertBefore(scriptSrc, document.head.getElementsByTagName('script')[0]);
        googleTagManager._loadOptions = options; // eslint-disable-line no-underscore-dangle

        var noScriptSrc = document.createElement('noscript');
        noScriptSrc.innerHTML = "\n      <iframe src=\"https://www.googletagmanager.com/ns.html?id=".concat(key, " height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe>\n      ");
        document.body.insertBefore(noScriptSrc, document.body.childNodes[0]);
      };

      // Load GoogleTagManager with your key.
      googleTagManager.load(this.gtmId, this.gtmArgs);
    }
  }]);
  return GoogleTagManagerLoader;
}();
export default GoogleTagManagerLoader;
//# sourceMappingURL=gtmLoader.js.map