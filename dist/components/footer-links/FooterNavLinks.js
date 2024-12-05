function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import parseEnvSettings from '../../utils/parseData';
var FooterLinkItem = function FooterLinkItem(_ref) {
  var link = _ref.link,
    locale = _ref.locale;
  var renderUrl = function renderUrl(url) {
    if (_typeof(url) === 'object') {
      return url[locale];
    }
    return url;
  };
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: renderUrl(link.url)
  }, link.title[locale]));
};
var FooterLinks = function FooterLinks(_ref2) {
  var intl = _ref2.intl;
  var getLocaleCode = intl.locale.split('-')[0] === 'pt' ? 'pt' : 'en';
  var FOOTER_NAV_LINKS = getConfig().FOOTER_NAV_LINKS || process.env.FOOTER_NAV_LINKS;
  var footerLinks = parseEnvSettings(FOOTER_NAV_LINKS);
  if (!footerLinks) {
    return null;
  }
  return /*#__PURE__*/React.createElement("nav", {
    className: "footer-links d-md-flex justify-content-between px-4"
  }, footerLinks.map(function (link) {
    return /*#__PURE__*/React.createElement("div", {
      className: "footer-links-navigation py-3"
    }, /*#__PURE__*/React.createElement("span", null, link.title[getLocaleCode]), /*#__PURE__*/React.createElement("ul", null, link.menus.map(function (menu) {
      return /*#__PURE__*/React.createElement(FooterLinkItem, {
        locale: getLocaleCode,
        link: menu
      });
    })));
  }));
};
FooterLinkItem.propTypes = {
  locale: PropTypes.string.isRequired,
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  }).isRequired
};
FooterLinks.propTypes = {
  intl: intlShape.isRequired
};
export default FooterLinks;
//# sourceMappingURL=FooterNavLinks.js.map