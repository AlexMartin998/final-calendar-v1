'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validateFields = require("./validateFields.middleware");

Object.keys(_validateFields).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _validateFields[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validateFields[key];
    }
  });
});

var _auth = require("./auth.middleware");

Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _auth[key];
    }
  });
});

var _validateJwt = require("./validateJwt.middleware");

Object.keys(_validateJwt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _validateJwt[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validateJwt[key];
    }
  });
});