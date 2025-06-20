import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import PropTypes from 'prop-types';
import LanguageSelector from '../../components/LanguageSelector';
var LanguageSelectorSlot = function LanguageSelectorSlot(_ref) {
  var _ref$supportedLanguag = _ref.supportedLanguages,
    supportedLanguages = _ref$supportedLanguag === void 0 ? [] : _ref$supportedLanguag;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "org.openedx.frontend.layout.footer_lang_selector.v1",
    idAliases: ['footer_lang_selector'],
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(LanguageSelector, {
    supportedLanguages: supportedLanguages
  }));
};
LanguageSelectorSlot.propTypes = {
  supportedLanguages: PropTypes.arrayOf(PropTypes.string)
};
export default LanguageSelectorSlot;
//# sourceMappingURL=index.js.map