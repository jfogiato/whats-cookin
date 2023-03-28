/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  padding-top: 15vmin;\n  text-align: center;\n  font-family: \"Rock Salt\", cursive;\n}\n\n/* ALL NAV BAR CLASSES */\n.nav-bar {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  position: fixed;\n  align-items: flex-end;\n  top: 0;\n  right: 0;\n  background-color: white;\n  box-shadow: 0px 3px 8px #888888;\n  z-index: 3;\n}\n\n.nav-logo {\n  width: 20vmin;\n  align-self: center;\n  padding-left: 2%;\n}\n\n.nav-links {\n  display: flex;\n  list-style: none;\n  align-items: flex-end;\n  justify-content: space-between;\n  width: 70%;\n  padding-right: 4vmin;\n}\n\n.input-bar {\n  font-family: inherit;\n  font-size: 1rem;\n  border: none;\n  border-bottom: 2px solid black;\n  padding: 0 1vmin 0 1.5vmin;\n}\n\n.search-bar {\n  padding-left: 5vmin;\n}\n\n.filter-img {\n  font-family: inherit;\n  border: none;\n  border-bottom: 2px solid black;\n  height: 40px;\n}\n\n.hover:hover {\n  border-bottom: 4px solid black;\n}\n\n.hover:focus {\n  border-bottom: 4px solid black;\n}\n\nform {\n  display: flex;\n  align-items: center;\n}\n\n.my-recipes {\n  border-bottom: 2px solid black;\n  padding: 0 2vmin;\n  margin: 0;\n}\n\n.title-logo {\n  width: 90vmin;\n}\n\n.user-icon {\n  padding-right: 1%;\n  width: 4vmin;\n}\n\n.user-name {\n  display: flex;\n  align-items: center;\n  color: white;\n}\n\n.user-text {\n  text-align: center;\n  padding: 0 1.5vmin;\n  background-color: black;\n  border-radius: 10px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.menu-icon {\n  display: none;\n}\n\n/* ALL RECIPE CARD CLASSES */\n.all-recipes {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.recipe-card {\n  height: 46vmin;\n  width: 45vmin;\n  border-radius: 5px;\n  box-shadow: 5px 5px 10px #888888;\n  background-color: #E1E1E1;\n  margin: 3vmin;\n  position: relative;\n}\n\n.recipe-card:hover {\n  transform: translate(-5px, -5px);\n  box-shadow: 10px 10px 10px #888888;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.recipe-img {\n  padding-top: 3%;\n  height: 35vmin;\n  width: 42vmin;\n  border-radius: 4%;\n  filter: drop-shadow(0px 5px 8px #888888);\n}\n\n.heart-icon {\n  width: 10vmin;\n  position: absolute;\n  right: 2vmin;\n  top: 2vmin;\n}\n\n.recipe-title {\n  position: relative;\n  top: -4vmin;\n  margin: 0;\n  padding: 3vmin;\n  font-size: 1.6rem;\n  width: 40vmin;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* ALL MODAL/POP-UP RECIPE CLASSES */\n.modal-bg {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n  position: fixed;\n  overflow: hidden;\n}\n\n.recipe-popup {\n  height: 70vmin;\n  width: 80vmin;\n  border: 2px white solid;\n  border-radius: 5px;\n  background-color: #E1E1E1;\n  margin-top: 3vmin;\n  overflow: auto;\n  padding: 3vmin;\n  padding-right: 5vmin;\n}\n\n.close-icon {\n  float: right;\n  width: 3vmin;\n}\n\n.modal-img {\n  height: 40vmin;\n  width: 45vmin;\n  border-radius: 5px;\n  filter: drop-shadow(3px 3px 3px black);\n}\n\n.button-container {\n  margin-top: 5vmin;\n  display: flex;\n  justify-content: space-around;\n}\n\n.modal-button {\n  font-family: inherit;\n  background-color: white;\n  color: black;\n  border-radius: 5px;\n}\n\n.modal-button:hover {\n  background-color: black;\n  color: white;\n}\n\n.image-ingredients {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nli {\n  text-align: left;\n  margin-bottom: 0.4vmin;\n}\n\n.oregano-font {\n  font-family: \"Oregano\", cursive;\n}\n\n.footer-logo {\n  width: 60vmin;\n  padding: 15vmin;\n}\n\n.hidden {\n  display: none;\n}\n\n.no-scroll {\n  overflow: hidden;\n}\n\n.off-page {\n  position: absolute;\n  left: -10000px;\n  top: auto;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n}\n\n@media print {\n  .nav-bar, .all-recipes, .modal-img, .modal-button, .close-icon, h4 {\n    display: none;\n  }\n  .recipe-popup {\n    font-size: 1rem;\n    height: auto;\n    width: 100%;\n    border: none;\n    background-color: white;\n    margin: 0;\n    overflow: visible;\n    padding: 0;\n  }\n  .recipe-popup > h2 {\n    margin: 0;\n  }\n  .print-container {\n    font-size: 1.1rem;\n    display: flex;\n  }\n  .print-container > ul {\n    width: 35%;\n  }\n  .print-container > ol {\n    width: 65%;\n    margin-top: 0;\n  }\n}\n@page {\n  margin: 2cm;\n}\n@media only screen and (max-device-width: 600px) {\n  body {\n    margin-top: 5%;\n  }\n  .recipe-card {\n    height: 92vmin;\n    width: 90vmin;\n  }\n  .recipe-img {\n    height: 70vmin;\n    width: 84vmin;\n  }\n  .recipe-title {\n    font-size: 4rem;\n    width: 85vmin;\n  }\n  .recipe-popup {\n    height: 135vmin;\n  }\n  .close-icon {\n    width: 6vmin;\n  }\n  .image-ingredients {\n    flex-direction: column;\n  }\n  .button-container {\n    flex-direction: column;\n    margin-bottom: 10%;\n  }\n  .modal-button {\n    height: 10vmin;\n    font-size: 2rem;\n    border-width: 5px;\n    margin: 2%;\n  }\n  h2, .all-recipes {\n    font-size: 3rem;\n  }\n  h3, h4, .my-recipes-title {\n    font-size: 4rem;\n  }\n  .modal-img {\n    height: 80vmin;\n    width: 90vmin;\n  }\n  .recipe-popup li {\n    font-size: 3rem;\n  }\n  .heart-icon {\n    width: 20vmin;\n    position: absolute;\n    right: 4vmin;\n    top: 4vmin;\n  }\n  nav {\n    display: flex;\n    justify-content: space-between;\n    height: 8%;\n  }\n  .nav-links {\n    flex-direction: column;\n    justify-content: flex-start;\n    align-items: center;\n    position: fixed;\n    background-color: rgba(0, 0, 0, 0.8);\n    height: 100vh;\n    width: 700px;\n    top: 7.3%;\n    left: 25%;\n    padding-right: 0;\n  }\n  .my-recipes, .filter-select, .search-bar {\n    color: black;\n    font-size: 35px;\n    background-color: #E1E1E1;\n    width: 500px;\n    height: 100px;\n    border: none;\n    text-align: center;\n    margin: 5%;\n  }\n  .search-bar {\n    width: 540px;\n    padding-left: inherit;\n  }\n  .nav-logo {\n    width: 30vmin;\n  }\n  .menu-icon {\n    display: block;\n    width: 12vmin;\n    margin: 3%;\n  }\n  .close-menu {\n    width: 12vmin;\n    margin: 3%;\n  }\n  .user-name {\n    font-size: 2rem;\n  }\n  .user-icon {\n    display: none;\n  }\n  .filter-select {\n    margin-right: 0%;\n  }\n  .filter-img {\n    border: none;\n    margin-right: 5%;\n    background-color: #E1E1E1;\n    height: 100px;\n  }\n  .hidden {\n    display: none;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,mBAAA;EACA,kBAAA;EACA,iCAAA;AACF;;AAEA,wBAAA;AACA;EACE,aAAA;EACA,WAAA;EACA,8BAAA;EACA,eAAA;EACA,qBAAA;EACA,MAAA;EACA,QAAA;EACA,uBAAA;EACA,+BAAA;EACA,UAAA;AACF;;AAEA;EACE,aAAA;EACA,kBAAA;EACA,gBAAA;AACF;;AAEA;EACE,aAAA;EACA,gBAAA;EACA,qBAAA;EACA,8BAAA;EACA,UAAA;EACA,oBAAA;AACF;;AAEA;EACE,oBAAA;EACA,eAAA;EACA,YAAA;EACA,8BAAA;EACA,0BAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA;EACE,oBAAA;EACA,YAAA;EACA,8BAAA;EACA,YAAA;AACF;;AAEA;EACE,8BAAA;AACF;;AAEA;EACE,8BAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;AACF;;AAEA;EACE,8BAAA;EACA,gBAAA;EACA,SAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,iBAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,YAAA;AACF;;AAEA;EACE,kBAAA;EACA,kBAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA,4BAAA;AACA;EACE,aAAA;EACA,eAAA;EACA,uBAAA;AACF;;AAEA;EACE,cAAA;EACA,aAAA;EACA,kBAAA;EACA,gCAAA;EACA,yBAAA;EACA,aAAA;EACA,kBAAA;AACF;;AAEA;EACE,gCAAA;EACA,kCAAA;AACF;;AAEA;EACE,eAAA;AACF;;AAEA;EACE,eAAA;EACA,cAAA;EACA,aAAA;EACA,iBAAA;EACA,wCAAA;AACF;;AAEA;EACE,aAAA;EACA,kBAAA;EACA,YAAA;EACA,UAAA;AACF;;AAEA;EACE,kBAAA;EACA,WAAA;EACA,SAAA;EACA,cAAA;EACA,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AACF;;AAEA,oCAAA;AACA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,MAAA;EACA,OAAA;EACA,oCAAA;EACA,YAAA;EACA,WAAA;EACA,UAAA;EACA,eAAA;EACA,gBAAA;AACF;;AAEA;EACE,cAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;EACA,yBAAA;EACA,iBAAA;EACA,cAAA;EACA,cAAA;EACA,oBAAA;AACF;;AAEA;EACE,YAAA;EACA,YAAA;AACF;;AAEA;EACE,cAAA;EACA,aAAA;EACA,kBAAA;EACA,sCAAA;AACF;;AAEA;EACE,iBAAA;EACA,aAAA;EACA,6BAAA;AACF;;AAEA;EACE,oBAAA;EACA,uBAAA;EACA,YAAA;EACA,kBAAA;AACF;;AAEA;EACE,uBAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;AACF;;AAEA;EACE,gBAAA;EACA,sBAAA;AACF;;AAEA;EACE,+BAAA;AACF;;AAEA;EACE,aAAA;EACA,eAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,gBAAA;AACF;;AAEA;EACI,kBAAA;EACA,cAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;AACJ;;AAEA;EACE;IACE,aAAA;EACF;EAEA;IACE,eAAA;IACA,YAAA;IACA,WAAA;IACA,YAAA;IACA,uBAAA;IACA,SAAA;IACA,iBAAA;IACA,UAAA;EAAF;EAGA;IACE,SAAA;EADF;EAIA;IACE,iBAAA;IACA,aAAA;EAFF;EAKA;IACE,UAAA;EAHF;EAMA;IACE,UAAA;IACA,aAAA;EAJF;AACF;AAOA;EACE,WAAA;AALF;AAQA;EACE;IACE,cAAA;EANF;EAQA;IACE,cAAA;IACA,aAAA;EANF;EAQA;IACE,cAAA;IACA,aAAA;EANF;EAQA;IACE,eAAA;IACA,aAAA;EANF;EAQA;IACE,eAAA;EANF;EAQA;IACE,YAAA;EANF;EAQA;IACE,sBAAA;EANF;EAQA;IACE,sBAAA;IACA,kBAAA;EANF;EAQA;IACE,cAAA;IACA,eAAA;IACA,iBAAA;IACA,UAAA;EANF;EAQA;IACE,eAAA;EANF;EAQA;IACE,eAAA;EANF;EAQA;IACE,cAAA;IACA,aAAA;EANF;EAQA;IACE,eAAA;EANF;EAQA;IACE,aAAA;IACA,kBAAA;IACA,YAAA;IACA,UAAA;EANF;EAQA;IACE,aAAA;IACA,8BAAA;IACA,UAAA;EANF;EAQA;IACE,sBAAA;IACA,2BAAA;IACA,mBAAA;IACA,eAAA;IACA,oCAAA;IACA,aAAA;IACA,YAAA;IACA,SAAA;IACA,SAAA;IACA,gBAAA;EANF;EAQA;IACE,YAAA;IACA,eAAA;IACA,yBAAA;IACA,YAAA;IACA,aAAA;IACA,YAAA;IACA,kBAAA;IACA,UAAA;EANF;EAQA;IACE,YAAA;IACA,qBAAA;EANF;EAQA;IACE,aAAA;EANF;EAQA;IACE,cAAA;IACA,aAAA;IACA,UAAA;EANF;EAQA;IACE,aAAA;IACA,UAAA;EANF;EAQA;IACE,eAAA;EANF;EAQA;IACE,aAAA;EANF;EAQA;IACE,gBAAA;EANF;EAQA;IACE,YAAA;IACA,gBAAA;IACA,yBAAA;IACA,aAAA;EANF;EAQA;IACE,aAAA;EANF;AACF","sourcesContent":["body {\n  padding-top: 15vmin;\n  text-align: center;\n  font-family: 'Rock Salt', cursive;\n}\n\n/* ALL NAV BAR CLASSES */\n.nav-bar {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  position: fixed;\n  align-items: flex-end;\n  top: 0;\n  right: 0;\n  background-color: white;\n  box-shadow: 0px 3px 8px #888888;\n  z-index: 3;\n}\n\n.nav-logo {\n  width: 20vmin;\n  align-self: center;\n  padding-left: 2%;\n}\n\n.nav-links {\n  display: flex;\n  list-style: none;\n  align-items: flex-end;\n  justify-content: space-between;\n  width: 70%;\n  padding-right: 4vmin;\n}\n\n.input-bar {\n  font-family: inherit;\n  font-size: 1rem;\n  border: none;\n  border-bottom: 2px solid black;\n  padding: 0 1vmin 0 1.5vmin;\n}\n\n.search-bar {\n  padding-left: 5vmin;\n}\n\n.filter-img {\n  font-family: inherit;\n  border: none;\n  border-bottom: 2px solid black;\n  height: 40px;\n}\n\n.hover:hover {\n  border-bottom: 4px solid black;\n}\n\n.hover:focus {\n  border-bottom: 4px solid black;\n}\n\nform {\n  display: flex;\n  align-items: center;\n}\n\n.my-recipes {\n  border-bottom: 2px solid black;\n  padding: 0 2vmin;\n  margin: 0;\n}\n\n.title-logo {\n  width: 90vmin;\n}\n\n.user-icon {\n  padding-right: 1%;\n  width: 4vmin;\n}\n\n.user-name {\n  display: flex;\n  align-items: center;\n  color: white;\n}\n\n.user-text {\n  text-align: center;\n  padding: 0 1.5vmin;\n  background-color: black;\n  border-radius: 10px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.menu-icon {\n  display: none;\n}\n\n/* ALL RECIPE CARD CLASSES */\n.all-recipes {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.recipe-card {\n  height: 46vmin;\n  width: 45vmin;\n  border-radius: 5px;\n  box-shadow: 5px 5px 10px #888888;\n  background-color: #E1E1E1;\n  margin: 3vmin;\n  position: relative;\n}\n\n.recipe-card:hover {\n  transform: translate(-5px, -5px);\n  box-shadow: 10px 10px 10px #888888;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.recipe-img {\n  padding-top: 3%;\n  height: 35vmin;\n  width: 42vmin;\n  border-radius: 4%;\n  filter: drop-shadow(0px 5px 8px #888888);\n}\n\n.heart-icon {\n  width: 10vmin;\n  position: absolute;\n  right: 2vmin;\n  top: 2vmin;\n}\n\n.recipe-title {\n  position: relative;\n  top: -4vmin;\n  margin: 0;\n  padding: 3vmin;\n  font-size: 1.6rem;\n  width: 40vmin;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* ALL MODAL/POP-UP RECIPE CLASSES */\n.modal-bg {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  background-color: rgba(0 0 0 / 80%);\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n  position: fixed;\n  overflow: hidden;\n}\n\n.recipe-popup {\n  height: 70vmin;\n  width: 80vmin;\n  border: 2px white solid;\n  border-radius: 5px;\n  background-color: #E1E1E1;\n  margin-top: 3vmin;\n  overflow: auto;\n  padding: 3vmin;\n  padding-right: 5vmin;\n}\n\n.close-icon {\n  float: right;\n  width: 3vmin;\n}\n\n.modal-img {\n  height: 40vmin;\n  width: 45vmin;\n  border-radius: 5px;\n  filter: drop-shadow(3px 3px 3px black);\n}\n\n.button-container {\n  margin-top: 5vmin;\n  display: flex;\n  justify-content: space-around;\n}\n\n.modal-button {\n  font-family: inherit;\n  background-color: white;\n  color: black;\n  border-radius: 5px;\n}\n\n.modal-button:hover {\n  background-color: black;\n  color: white;\n}\n\n.image-ingredients {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nli {\n  text-align: left;\n  margin-bottom: 0.4vmin;\n}\n\n.oregano-font {\n  font-family: 'Oregano', cursive;\n}\n\n.footer-logo {\n  width: 60vmin;\n  padding: 15vmin;\n}\n\n.hidden {\n  display: none;\n}\n\n.no-scroll {\n  overflow: hidden;\n}\n\n.off-page {\n    position: absolute;\n    left: -10000px;\n    top: auto;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n}\n\n@media print {\n  .nav-bar, .all-recipes, .modal-img, .modal-button, .close-icon, h4 {\n    display: none;\n  }\n\n  .recipe-popup {\n    font-size: 1rem;\n    height: auto;\n    width: 100%;\n    border: none;\n    background-color: white;\n    margin: 0;\n    overflow: visible;\n    padding: 0;\n  }\n\n  .recipe-popup > h2 {\n    margin: 0;\n  }\n\n  .print-container {\n    font-size: 1.1rem;\n    display: flex;\n  }\n\n  .print-container > ul {\n    width: 35%;\n  }\n\n  .print-container > ol {\n    width: 65%;\n    margin-top: 0;\n  }\n}\n\n@page {\n  margin: 2cm;\n}\n\n@media only screen and (max-device-width: 600px){\n  body{\n    margin-top: 5%;\n  }\n  .recipe-card {\n    height: 92vmin;\n    width: 90vmin;\n  }\n  .recipe-img {\n    height: 70vmin;\n    width: 84vmin;\n  }\n  .recipe-title {\n    font-size: 4rem;\n    width: 85vmin;\n  }\n  .recipe-popup {\n    height: 135vmin;\n  }\n  .close-icon {\n    width: 6vmin;\n  }\n  .image-ingredients {\n    flex-direction: column;\n  }\n  .button-container {\n    flex-direction: column;\n    margin-bottom: 10%;\n  }\n  .modal-button{\n    height: 10vmin;\n    font-size: 2rem;\n    border-width: 5px;\n    margin: 2%;\n  }\n  h2, .all-recipes{\n    font-size: 3rem;\n  }\n  h3, h4, .my-recipes-title {\n    font-size: 4rem;\n  }\n  .modal-img {\n    height: 80vmin;\n    width: 90vmin;\n  }\n  .recipe-popup li {\n    font-size: 3rem;\n  }\n  .heart-icon {\n    width: 20vmin;\n    position: absolute;\n    right: 4vmin;\n    top: 4vmin;\n  }\n  nav {\n    display: flex;\n    justify-content: space-between;\n    height: 8%;\n  }\n  .nav-links {\n    flex-direction: column;\n    justify-content: flex-start;\n    align-items: center;\n    position: fixed;\n    background-color: rgba(0 0 0 / 80%);\n    height: 100vh;\n    width: 700px;\n    top: 7.3%;\n    left: 25%;\n    padding-right: 0;\n  }\n  .my-recipes, .filter-select, .search-bar {\n    color: black;\n    font-size: 35px;\n    background-color:#E1E1E1;\n    width: 500px;\n    height: 100px;\n    border: none;\n    text-align: center;\n    margin: 5%;\n  }\n  .search-bar{\n    width: 540px;\n    padding-left: inherit;\n  }\n  .nav-logo {\n    width: 30vmin;\n  }\n  .menu-icon {\n    display: block;\n    width: 12vmin;\n    margin: 3%;\n  }\n  .close-menu {\n    width: 12vmin;\n    margin: 3%;\n  }\n  .user-name {\n    font-size: 2rem;\n  } \n  .user-icon {\n    display: none;\n  }\n  .filter-select {\n    margin-right: 0%;\n  }\n  .filter-img {\n    border: none;\n    margin-right: 5%;\n    background-color: #E1E1E1;\n    height: 100px;\n  }\n  .hidden {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function apiRequest(path, request, user, recipe) {
    return fetch(`https://whats-cookin-api.vercel.app/api/v1/${path}`, {
        method: request ? request : "GET",
        body: user ? JSON.stringify({ userID: user.id, recipeID: recipe.id }) : null,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("There was an error. Status Code: ", response.status);
        } else {
            return response.json()
        }
    })
    .catch(error => console.log(`Could not fetch because: ${error}`));
};

const getAllPromises = () => {
    return Promise.all([apiRequest("users"), apiRequest("ingredients"), apiRequest("recipes")]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ getAllPromises, apiRequest });



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/filter.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/heart.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/user.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/wc-logo.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/home-button.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/close-icon.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/hamburger-menu.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/close-menu.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Recipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);


class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData.map(recipe => new _Recipe__WEBPACK_IMPORTED_MODULE_0__["default"](recipe));
  }

  filterByTag(tag) {
    let filteredRecipes = this.recipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
     return filteredRecipes;
  };

  filterByName(name) {
    let filteredNames = this.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(name.toLowerCase());
    });
    return filteredNames;
  };
   
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecipeRepository);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
    this.saved = false;
  }

  matchIngredients(ingredientData) {
    const relevantIngredients = ingredientData.filter(ingredient => {
      const recipeIds = this.ingredients.map(ingredient => ingredient.id);
      return recipeIds.includes(ingredient.id);
    });
    
    const ingredientsWithAllData = this.ingredients.reduce((acc, recipeIngredient) => {
      const combiner = relevantIngredients.forEach(ingredientItem => {
        if(ingredientItem.id === recipeIngredient.id) {
          acc.push(
          {
            id: ingredientItem.id,
            name: ingredientItem.name,
            estimatedCostInCents: ingredientItem.estimatedCostInCents,
            quantity: recipeIngredient.quantity
          });
        }
      });
      return acc;
    }, []);

    return ingredientsWithAllData;
  }
  
  listIngredients(ingredientData) {
    return this.matchIngredients(ingredientData).map(ingredient => {
      let amount = ingredient.quantity.amount
      if(amount.toString().length > 5) {
        amount = ingredient.quantity.amount.toFixed(2)
      }
      return `${amount} ${ingredient.quantity.unit} ${ingredient.name}`
    });  
  }

  listCost(ingredientData) {
    const totalCost = this.matchIngredients(ingredientData).reduce((acc, ingredient) => {
      acc += (ingredient.estimatedCostInCents * ingredient.quantity.amount);
      return acc;
    }, 0);
    return Math.round(totalCost * .01);
  }

  getInstructions() {
    const instructions = this.instructions.map(step => `${step.instruction}`);
    return instructions;
  }

  toggleSave() {
    this.saved = !this.saved;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recipe);

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.recipesToCook = userData.recipesToCook;
  }

  convertToFullRecipe(recipeRepo) {
    const fullRecipes = this.recipesToCook.map(userRecipe => {
      return recipeRepo.recipes.find(recipe => recipe.id === userRecipe);
    });
    return fullRecipes.reverse();
  }

  filterSavedByTag(tag, allRecipes) {
    return this.convertToFullRecipe(allRecipes).filter(recipe => recipe.tags.includes(tag));
  }

  filterSavedByName(name, allRecipes) {
    return this.convertToFullRecipe(allRecipes).filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_filter_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_heart_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_user_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_wc_logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_home_button_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_close_icon_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _images_hamburger_menu_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _images_close_menu_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _classes_RecipeRepository__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _classes_User__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);













// global variables
const recipeSection = document.getElementById('allRecipes');
const modalSection = document.getElementById('recipeModalBackground');
const navLinks = document.getElementById('navLinks');
const filterSubmit = document.getElementById('filterSubmit');
const searchBar = document.getElementById('searchBar');
const navMyRecipes = document.getElementById('navMyRecipes');
const navUserInfo = document.getElementById('navUserInfo');
const titleLogo = document.getElementById('titleLogo');
const myRecipesTitle = document.getElementById('myRecipesTitle');
const logo = document.getElementById('logo');
const mobileView = window.matchMedia('only screen and (max-device-width: 600px)')
const menuIcon = document.getElementById('menuIcon');
const closeMenu = document.getElementById('closeMenu');
const body = document.querySelector('body');
let users;
let ingredients;
let recipes;
let recipeRepo;
let modalRecipe;
let currentUser;
let savedView = false;
let currentView;

//event listeners
recipeSection.addEventListener('click', createRecipeModal);
recipeSection.addEventListener('keypress', createRecipeModal);
modalSection.addEventListener('click', collapseRecipe);
filterSubmit.addEventListener('click', filterRecipes);
filterSubmit.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') filterRecipes()});
navMyRecipes.addEventListener('click', showSavedRecipes);
navMyRecipes.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') showSavedRecipes()});
logo.addEventListener('click', goHome);
logo.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') goHome()});
searchBar.addEventListener('keyup', searchRecipes);
menuIcon.addEventListener('click', toggleMobileMenu);
closeMenu.addEventListener('click', toggleMobileMenu);

//functions
_apiCalls__WEBPACK_IMPORTED_MODULE_1__["default"].getAllPromises().then(data => {
    users = data[0].users;
    ingredients = data[1].ingredients;
    recipes = data[2].recipes;
    recipeRepo = new _classes_RecipeRepository__WEBPACK_IMPORTED_MODULE_10__["default"](recipes);
    getRandomUser();
    recipeRepo.recipes.forEach(recipe => {
        if(currentUser.recipesToCook.includes(recipe.id)) {
            recipe.toggleSave();
        }
    });
    currentView = recipeRepo.recipes;
    createRecipeCards(currentView);
    if(mobileView.matches) navLinks.classList.add('hidden')
});


function createRecipeCards(recipes) {
    recipeSection.innerHTML = "";
    recipes.forEach(recipe => {
        let heartClass = "heart-icon";
        if(!recipe.saved) heartClass = "heart-icon hidden";
        recipeSection.innerHTML += `
        <article class="recipe-card pointer" data-parent="${recipe.id}" tabindex="0">
                <img class="recipe-img" src="${recipe.image}" data-parent="${recipe.id}" alt="Picture of ${recipe.name}">
                <img class="${heartClass}" data-parent="${recipe.id}" src="./images/heart.png" alt="This recipe is in my recipes!">
                <h2 class="recipe-title" data-parent="${recipe.id}">${recipe.name}</h2>
        </article>`;
    });
}

function createRecipeModal(event) {
    if(event.target.className !== "all-recipes" || event.key === 'Enter') {
        toggleHidden(modalSection);
        body.classList.add('no-scroll');
        let recipeID = +(event.target.dataset.parent);
        modalRecipe = recipeRepo.recipes.find(recipe => recipe.id === recipeID);
        modalSection.innerHTML = `
        <div class="recipe-popup">
                <img role="button" aria-label="Close Recipe Button" class="close-icon pointer" id="closeIcon" src="./images/close-icon.png" tabindex="0">
                <h2>${modalRecipe.name}</h2>
                <div class="print-container">
                    <div class="image-ingredients">
                    <img class="modal-img" src="${modalRecipe.image}" alt="${modalRecipe.name} image">
                    <ul class="oregano-font">
                        <h3>Ingredients:</h3>
                        ${createList(modalRecipe.listIngredients(ingredients))}
                    </ul>
                    </div>
                    <ol class="oregano-font">
                        <h3>Directions:</h3>
                        ${createList(modalRecipe.getInstructions())}
                    </ol>
                </div>
                <h4 class="oregano-font"><i>TOTAL COST $${modalRecipe.listCost(ingredients)}</i></h4>
                <div class="button-container">
                    <button class="modal-button pointer" id="saveBtn" tabindex="0">${updateButtonText()}</button>
                    <button class="modal-button pointer" id="printBtn">Print Me!</button>
                </div>
        </div>`;
        document.querySelector('#closeIcon').focus()
        document.getElementById('saveBtn').addEventListener('click', toggleSaveRecipe);
        document.getElementById('printBtn').addEventListener('click', () => window.print());
        document.getElementById('closeIcon').addEventListener('keypress', (event) => {
            if(event.key === "Enter") collapseRecipe(event)});
    }
}

function createList(recipe) {
    return recipe.reduce((acc, items) => {
            acc += `<li>${items}</li>`;
            return acc;
    }, "");
}

function toggleHidden(element) {
    element.classList.toggle('hidden');
}

function collapseRecipe(event) {
    currentView = savedView ? currentUser.convertToFullRecipe(recipeRepo) : recipeRepo.recipes;
    if(event.target.id === "recipeModalBackground" || event.target.id === "closeIcon") {
        body.classList.remove('no-scroll');
        createRecipeCards(currentView);
        toggleHidden(modalSection);
    }
}

function filterRecipes() {
    const tag = document.getElementById('filters').value;
    if(tag.length > 1) {
        let filteredRecipes = savedView ? currentUser.filterSavedByTag(tag, recipeRepo) : recipeRepo.filterByTag(tag);
        currentView = filteredRecipes;
        createRecipeCards(currentView);
    }
}

function searchRecipes() {
    let keyword = searchBar.value;
    let searchedRecipes = savedView ? currentUser.filterSavedByName(keyword, recipeRepo) : recipeRepo.filterByName(keyword);
    if(searchedRecipes.length) {
        currentView = searchedRecipes;
        createRecipeCards(currentView);
    } else {
        recipeSection.innerHTML = "";
        recipeSection.innerText = "Oh no - we don't have any recipes that match that search! Looks like you're going hungry tonight 🥲";
    }
}

function toggleSaveRecipe() {
    if(!modalRecipe.saved) {
        _apiCalls__WEBPACK_IMPORTED_MODULE_1__["default"].apiRequest("usersRecipes","POST", currentUser, modalRecipe);
    } else {
        _apiCalls__WEBPACK_IMPORTED_MODULE_1__["default"].apiRequest("usersRecipes","DELETE", currentUser, modalRecipe);
    }
    modalRecipe.toggleSave();
    _apiCalls__WEBPACK_IMPORTED_MODULE_1__["default"].apiRequest("users").then(data => currentUser.recipesToCook = data.users.find(user => user.id === currentUser.id).recipesToCook);
    saveBtn.innerText = updateButtonText();
}

function updateButtonText() {
    let buttonText;
    modalRecipe.saved ? buttonText = "Remove from Saved Recipes" : buttonText = "Add to Saved Recipes";
    return buttonText;
}

function getRandomUser() {
    currentUser = new _classes_User__WEBPACK_IMPORTED_MODULE_11__["default"](users[Math.floor(Math.random() * users.length)]);
    myRecipesTitle.innerText = `What's Cookin' in ${currentUser.name}'s Kitchen?`;
    navUserInfo.innerHTML = `
    <img class="user-icon" src="./images/user.png" alt="user icon">
    <span class="user-text">${currentUser.name}</span>
    `;
}

function showSavedRecipes() {
    if(!savedView) {
        savedView = true;
        const savedRecipes = currentUser.convertToFullRecipe(recipeRepo);
        currentView = savedRecipes;
        searchBar.placeholder = 'Search My Recipes...';
        document.getElementById('filterPlaceholder').innerText = 'Filter My Recipes';
        toggleHidden(myRecipesTitle);
        toggleHidden(titleLogo);
        createRecipeCards(currentView);
        if(currentUser.recipesToCook.length < 1) {
            recipeSection.innerHTML = "";
            recipeSection.innerText = "Oh no - you haven't saved any recipes! Looks like you're going hungry tonight 🥲";
        }
    }
}

function goHome() {
    if(currentView !== recipeRepo.recipes) {
        toggleHidden(myRecipesTitle);
        toggleHidden(titleLogo);
        savedView = false;
        currentView = recipeRepo.recipes;
        searchBar.placeholder = 'Search Recipes...';
        document.getElementById('filterPlaceholder').innerText = 'Filter Recipes';
        createRecipeCards(currentView);
    }
}

function toggleMobileMenu(e){
    toggleHidden(navLinks);
    toggleHidden(closeMenu);
    toggleHidden(menuIcon);
    if(e.target.id === "closeMenu"){
        body.classList.remove('no-scroll');
    }
    if(e.target.id === "menuIcon"){
        body.classList.add('no-scroll');
    }
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map