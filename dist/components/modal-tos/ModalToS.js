function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useEffect, useState } from 'react';
import { convertKeyNames, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { FormattedMessage, getLocale, injectIntl } from '@edx/frontend-platform/i18n';
import { Button, Form, Hyperlink, ModalDialog, useToggle, useCheckboxSetValues, ActionRow, useWindowSize } from '@openedx/paragon';
import { getUserTOSPreference, updateUserTOSPreference } from './data/api';
import { CAMEL_CASE_KEYS } from './data/constants';
import parseEnvSettings from '../../utils/parseData';
var createTOSLink = function createTOSLink(chunks, url) {
  return /*#__PURE__*/React.createElement(Hyperlink, {
    destination: url,
    target: "_blank"
  }, chunks);
};
var ModalToS = function ModalToS() {
  var _useState = useState(undefined),
    _useState2 = _slicedToArray(_useState, 2),
    tosPreference = _useState2[0],
    setTosPreference = _useState2[1];
  var _useToggle = useToggle(false),
    _useToggle2 = _slicedToArray(_useToggle, 3),
    isOpen = _useToggle2[0],
    open = _useToggle2[1],
    close = _useToggle2[2];
  var _useWindowSize = useWindowSize(),
    width = _useWindowSize.width;
  var checkboxLabelStyle = width < 768 ? 'd-inline-block' : null;
  var _getConfig = getConfig(),
    MODAL_UPDATE_TERMS_OF_SERVICE = _getConfig.MODAL_UPDATE_TERMS_OF_SERVICE,
    PRIVACY_POLICY_URL = _getConfig.PRIVACY_POLICY_URL,
    SITE_NAME = _getConfig.SITE_NAME,
    TERMS_OF_SERVICE_URL = _getConfig.TERMS_OF_SERVICE_URL,
    TOS_AND_HONOR_CODE = _getConfig.TOS_AND_HONOR_CODE;
  var modalSettings = parseEnvSettings(MODAL_UPDATE_TERMS_OF_SERVICE) || MODAL_UPDATE_TERMS_OF_SERVICE || {};
  var _convertKeyNames = convertKeyNames(modalSettings, CAMEL_CASE_KEYS),
    _convertKeyNames$body = _convertKeyNames.body,
    body = _convertKeyNames$body === void 0 ? {} : _convertKeyNames$body,
    _convertKeyNames$titl = _convertKeyNames.title,
    title = _convertKeyNames$titl === void 0 ? {} : _convertKeyNames$titl,
    dateIso8601 = _convertKeyNames.dateIso8601,
    _convertKeyNames$data = _convertKeyNames.dataAuthorization,
    dataAuthorization = _convertKeyNames$data === void 0 ? false : _convertKeyNames$data,
    _convertKeyNames$hono = _convertKeyNames.honorCode,
    honorCode = _convertKeyNames$hono === void 0 ? false : _convertKeyNames$hono,
    _convertKeyNames$term = _convertKeyNames.termsOfService,
    termsOfService = _convertKeyNames$term === void 0 ? false : _convertKeyNames$term;
  var _getAuthenticatedUser = getAuthenticatedUser(),
    dateJoined = _getAuthenticatedUser.dateJoined,
    username = _getAuthenticatedUser.username;
  var lang = getLocale() || 'en';
  var tosKey = "update_terms_of_service_".concat(dateIso8601 === null || dateIso8601 === void 0 ? void 0 : dateIso8601.replaceAll('-', '_'));
  var _useCheckboxSetValues = useCheckboxSetValues([]),
    _useCheckboxSetValues2 = _slicedToArray(_useCheckboxSetValues, 2),
    checkboxValues = _useCheckboxSetValues2[0],
    _useCheckboxSetValues3 = _useCheckboxSetValues2[1],
    add = _useCheckboxSetValues3.add,
    remove = _useCheckboxSetValues3.remove;
  useEffect(function () {
    if (username && dateIso8601) {
      getUserTOSPreference(username, tosKey).then(function (userTos) {
        setTosPreference(userTos);
        if (userTos === null) {
          open();
        }
      });
    }
  }, [dateIso8601, tosKey, username, open]);
  var setAcceptance = function setAcceptance() {
    updateUserTOSPreference(username, tosKey);
    close();
  };
  var numCheckBox = [dataAuthorization, termsOfService, honorCode].reduce(function (prev, curr) {
    return curr ? prev + 1 : prev;
  }, 0);
  var handleChange = function handleChange(e) {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };
  console.debug(new Date(dateIso8601), 'dateJoined', dateJoined, new Date(dateIso8601) < new Date(dateJoined));
  if (tosPreference || !dateIso8601 || !username || !dateJoined || new Date(dateIso8601) <= new Date(dateJoined)) {
    return null;
  }
  return /*#__PURE__*/React.createElement(ModalDialog, {
    title: "Modal Terms of Service",
    isBlocking: true,
    isOpen: isOpen,
    onClose: close,
    hasCloseButton: false
  }, title[lang] && /*#__PURE__*/React.createElement(ModalDialog.Header, null, /*#__PURE__*/React.createElement(ModalDialog.Title, null, title[lang])), /*#__PURE__*/React.createElement(ModalDialog.Body, null, body[lang], /*#__PURE__*/React.createElement(Form, {
    className: "my-4"
  }, /*#__PURE__*/React.createElement(Form.CheckboxSet, {
    name: "TOSCheckbox",
    onChange: handleChange,
    value: checkboxValues
  }, dataAuthorization && /*#__PURE__*/React.createElement(Form.Checkbox, {
    value: "dataAuthorization",
    labelClassName: checkboxLabelStyle
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "modalToS.dataAuthorization.checkbox.label",
    description: "The label for the data authorization checkbox inside the TOS modal.",
    defaultMessage: "I have read and understood the\xA0<a>Privacy Policy</a>",
    values: {
      a: function a(chunks) {
        return createTOSLink(chunks, PRIVACY_POLICY_URL);
      }
    }
  })), termsOfService && /*#__PURE__*/React.createElement(Form.Checkbox, {
    value: "termsOfService",
    labelClassName: checkboxLabelStyle
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "modalToS.termsOfService.checkbox.label",
    description: "The label for the terms of service checkbox inside the TOS modal.",
    defaultMessage: "I agree to the {platformName}\xA0<a>Terms of Service</a>",
    values: {
      a: function a(chunks) {
        return createTOSLink(chunks, TERMS_OF_SERVICE_URL);
      },
      platformName: SITE_NAME
    }
  })), honorCode && /*#__PURE__*/React.createElement(Form.Checkbox, {
    value: "honorCode",
    labelClassName: checkboxLabelStyle
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "modalToS.honorCode.checkbox.label",
    description: "The label for the honor code checkbox inside the TOS modal.",
    defaultMessage: "I agree to the {platformName}\xA0<a>Honor Code</a>",
    values: {
      a: function a(chunks) {
        return createTOSLink(chunks, TOS_AND_HONOR_CODE);
      },
      platformName: SITE_NAME
    }
  })))), /*#__PURE__*/React.createElement(ActionRow, {
    isStacked: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: numCheckBox !== checkboxValues.length,
    onClick: setAcceptance,
    "data-testid": "modalToSButton"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "modalToS.acceptance.button",
    description: "The label for the button inside the TOS modal.",
    defaultMessage: "Accept new terms of service"
  })))));
};
export default injectIntl(ModalToS);
//# sourceMappingURL=ModalToS.js.map