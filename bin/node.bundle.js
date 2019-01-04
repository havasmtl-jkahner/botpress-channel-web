module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/jesse.kahner/Sites/botpress-channel-web";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

var _bluebird = __webpack_require__(1);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _uuid = __webpack_require__(18);

var _uuid2 = _interopRequireDefault(_uuid);

var _ms = __webpack_require__(19);

var _ms2 = _interopRequireDefault(_ms);

var _botpress = __webpack_require__(20);

var _util = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userInitiatedMessageTypes = ['message', 'text', 'image', 'login_prompt', 'quick_reply', 'form', 'file', 'video'];

module.exports = function (knex, config) {
  var getUserInfo = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(userId) {
      var user, name, avatar;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex('users').where({ platform: 'webchat', userId: (0, _util.sanitizeUserId)(userId) }).then().get(0);

            case 2:
              user = _context.sent;
              name = user && user.first_name + ' ' + user.last_name;
              avatar = user && user.picture_url || null;
              return _context.abrupt('return', {
                fullName: name,
                avatar_url: avatar
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getUserInfo(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var appendUserMessage = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(userId, conversationId, _ref3) {
      var type = _ref3.type,
          text = _ref3.text,
          raw = _ref3.raw,
          data = _ref3.data;

      var _ref4, fullName, avatar_url, convo, message, shouldUpdateLastHeard;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = (0, _util.sanitizeUserId)(userId);

              _context2.next = 3;
              return getUserInfo(userId);

            case 3:
              _ref4 = _context2.sent;
              fullName = _ref4.fullName;
              avatar_url = _ref4.avatar_url;
              _context2.next = 8;
              return knex('web_conversations').where({ userId: userId, id: conversationId }).select('id').limit(1).then().get(0);

            case 8:
              convo = _context2.sent;

              if (convo) {
                _context2.next = 11;
                break;
              }

              throw new Error('Conversation "' + conversationId + '" not found');

            case 11:
              message = {
                id: _uuid2.default.v4(),
                conversationId: conversationId,
                userId: userId,
                full_name: fullName,
                avatar_url: avatar_url,
                message_type: type,
                message_text: text,
                message_raw: (0, _botpress.DatabaseHelpers)(knex).json.set(raw),
                message_data: (0, _botpress.DatabaseHelpers)(knex).json.set(data),
                sent_on: (0, _botpress.DatabaseHelpers)(knex).date.now()
              };
              shouldUpdateLastHeard = _lodash2.default.includes(userInitiatedMessageTypes, type.toLowerCase());
              return _context2.abrupt('return', _bluebird2.default.join(knex('web_messages').insert(message).then(), shouldUpdateLastHeard && knex('web_conversations').where({ id: conversationId, userId: userId }).update({ last_heard_on: (0, _botpress.DatabaseHelpers)(knex).date.now() }).then(), function () {
                return _extends({}, message, {
                  sent_on: new Date(),
                  message_raw: raw,
                  message_data: data
                });
              }));

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function appendUserMessage(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var appendBotMessage = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(botName, botAvatar, conversationId, _ref6) {
      var type = _ref6.type,
          text = _ref6.text,
          raw = _ref6.raw,
          data = _ref6.data;
      var message;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              message = {
                id: _uuid2.default.v4(),
                conversationId: conversationId,
                userId: null,
                full_name: botName,
                avatar_url: botAvatar,
                message_type: type,
                message_text: text,
                message_raw: (0, _botpress.DatabaseHelpers)(knex).json.set(raw),
                message_data: (0, _botpress.DatabaseHelpers)(knex).json.set(data),
                sent_on: (0, _botpress.DatabaseHelpers)(knex).date.now()
              };
              _context3.next = 3;
              return knex('web_messages').insert(message).then();

            case 3:
              return _context3.abrupt('return', Object.assign(message, {
                sent_on: new Date(),
                message_raw: (0, _botpress.DatabaseHelpers)(knex).json.get(message.message_raw),
                message_data: (0, _botpress.DatabaseHelpers)(knex).json.get(message.message_data)
              }));

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function appendBotMessage(_x5, _x6, _x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  var createConversation = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(userId) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          originatesFromUserMessage = _ref8.originatesFromUserMessage;

      var uid, title, conversation;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = (0, _util.sanitizeUserId)(userId);

              uid = Math.random().toString().substr(2, 6);
              title = 'Conversation ' + uid;
              _context4.next = 5;
              return knex('web_conversations').insert({
                userId: userId,
                created_on: (0, _botpress.DatabaseHelpers)(knex).date.now(),
                last_heard_on: originatesFromUserMessage ? (0, _botpress.DatabaseHelpers)(knex).date.now() : null,
                title: title
              }).then();

            case 5:
              _context4.next = 7;
              return knex('web_conversations').where({ title: title, userId: userId }).select('id').then().get(0);

            case 7:
              conversation = _context4.sent;
              return _context4.abrupt('return', conversation && conversation.id);

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function createConversation(_x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  var patchConversation = function () {
    var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(userId, conversationId, title, description, logoUrl) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = (0, _util.sanitizeUserId)(userId);

              _context5.next = 3;
              return knex('web_conversations').where({ userId: userId, id: conversationId }).update({
                title: title,
                description: description,
                logo_url: logoUrl
              }).then();

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function patchConversation(_x11, _x12, _x13, _x14, _x15) {
      return _ref9.apply(this, arguments);
    };
  }();

  var getOrCreateRecentConversation = function () {
    var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(userId) {
      var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          ignoreLifetimeExpiry = _ref11.ignoreLifetimeExpiry,
          originatesFromUserMessage = _ref11.originatesFromUserMessage;

      var recentCondition, conversation;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = (0, _util.sanitizeUserId)(userId);

              recentCondition = !ignoreLifetimeExpiry && (0, _botpress.DatabaseHelpers)(knex).date.isAfter('last_heard_on', (0, _moment2.default)().subtract(RECENT_CONVERSATION_LIFETIME, 'ms'));
              _context6.next = 4;
              return knex('web_conversations').select('id').whereNotNull('last_heard_on').andWhere({ userId: userId }).andWhere(recentCondition || {}).orderBy('last_heard_on', 'desc').limit(1).then().get(0);

            case 4:
              conversation = _context6.sent;
              return _context6.abrupt('return', conversation ? conversation.id : createConversation(userId, { originatesFromUserMessage: originatesFromUserMessage }));

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function getOrCreateRecentConversation(_x16) {
      return _ref10.apply(this, arguments);
    };
  }();

  var listConversations = function () {
    var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(userId) {
      var conversations, conversationIds, lastMessages, lastMessagesDate;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = (0, _util.sanitizeUserId)(userId);

              _context7.next = 3;
              return knex('web_conversations').select('id').where({ userId: userId }).orderBy('last_heard_on', 'desc').limit(100).then();

            case 3:
              conversations = _context7.sent;
              conversationIds = conversations.map(function (c) {
                return c.id;
              });
              lastMessages = knex.from('web_messages').distinct(knex.raw('ON ("conversationId") *')).orderBy('conversationId').orderBy('sent_on', 'desc');


              if (isLite(knex)) {
                lastMessagesDate = knex('web_messages').whereIn('conversationId', conversationIds).groupBy('conversationId').select(knex.raw('max(sent_on) as date'));


                lastMessages = knex.from('web_messages').select('*').whereIn('sent_on', lastMessagesDate);
              }

              return _context7.abrupt('return', knex.from(function () {
                this.from('web_conversations').where({ userId: userId }).as('wc');
              }).leftJoin(lastMessages.as('wm'), 'wm.conversationId', 'wc.id').orderBy('wm.sent_on', 'desc').select('wc.id', 'wc.title', 'wc.description', 'wc.logo_url', 'wc.created_on', 'wc.last_heard_on', 'wm.message_type', 'wm.message_text', knex.raw('wm.full_name as message_author'), knex.raw('wm.avatar_url as message_author_avatar'), knex.raw('wm.sent_on as message_sent_on')));

            case 8:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function listConversations(_x18) {
      return _ref12.apply(this, arguments);
    };
  }();

  var getConversation = function () {
    var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(userId, conversationId) {
      var fromId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var condition, conversation, messages;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = (0, _util.sanitizeUserId)(userId);

              condition = { userId: userId };


              if (conversationId && conversationId !== 'null') {
                condition.id = conversationId;
              }

              _context8.next = 5;
              return knex('web_conversations').where(condition).then().get(0);

            case 5:
              conversation = _context8.sent;

              if (conversation) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt('return', null);

            case 8:
              _context8.next = 10;
              return getConversationMessages(conversationId, fromId);

            case 10:
              messages = _context8.sent;


              messages.forEach(function (m) {
                return Object.assign(m, {
                  message_raw: (0, _botpress.DatabaseHelpers)(knex).json.get(m.message_raw),
                  message_data: (0, _botpress.DatabaseHelpers)(knex).json.get(m.message_data)
                });
              });

              return _context8.abrupt('return', Object.assign({}, conversation, {
                messages: _lodash2.default.orderBy(messages, ['sent_on'], ['asc'])
              }));

            case 13:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function getConversation(_x19, _x20) {
      return _ref13.apply(this, arguments);
    };
  }();

  var RECENT_CONVERSATION_LIFETIME = (0, _ms2.default)(config.recentConversationLifetime);

  var isLite = function isLite(knex) {
    return knex.client.config.client === 'sqlite3';
  };

  function initialize() {
    if (!knex) {
      throw new Error('you must initialize the database before');
    }

    return (0, _botpress.DatabaseHelpers)(knex).createTableIfNotExists('web_conversations', function (table) {
      table.increments('id').primary();
      table.string('userId');
      table.string('title');
      table.string('description');
      table.string('logo_url');
      table.timestamp('created_on');
      table.timestamp('last_heard_on'); // The last time the user interacted with the bot. Used for "recent" conversation
      table.timestamp('user_last_seen_on');
      table.timestamp('bot_last_seen_on');
    }).then(function () {
      return (0, _botpress.DatabaseHelpers)(knex).createTableIfNotExists('web_messages', function (table) {
        table.string('id').primary();
        table.integer('conversationId');
        table.string('userId');
        table.string('message_type');
        table.text('message_text');
        table.jsonb('message_raw');
        table.binary('message_data'); // Only useful if type = file
        table.string('full_name');
        table.string('avatar_url');
        table.timestamp('sent_on');
      });
    });
  }

  function getConversationMessages(conversationId) {
    var fromId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var query = knex('web_messages').where({ conversationId: conversationId });

    if (fromId) {
      query = query.andWhere('id', '<', fromId);
    }

    return query.orderBy('sent_on', 'desc').limit(20).then();
  }

  return {
    initialize: initialize,
    appendUserMessage: appendUserMessage,
    appendBotMessage: appendBotMessage,
    createConversation: createConversation,
    patchConversation: patchConversation,
    getConversation: getConversation,
    listConversations: listConversations,
    getOrCreateRecentConversation: getOrCreateRecentConversation,
    isLite: isLite
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _sillyname = __webpack_require__(22);

var _sillyname2 = _interopRequireDefault(_sillyname);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(bp) {
    var getOrCreateUser = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(userId) {
        var throwIfNotFound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var realUserId, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                realUserId = userId.startsWith('webchat:') ? userId.substr(8) : userId;
                _context.next = 3;
                return knex('users').where({
                  platform: 'webchat',
                  userId: realUserId
                }).then().get(0);

              case 3:
                user = _context.sent;

                if (!user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', user);

              case 6:
                if (!throwIfNotFound) {
                  _context.next = 8;
                  break;
                }

                throw new Error('User ' + realUserId + ' not found');

              case 8:
                _context.next = 10;
                return createNewUser(realUserId);

              case 10:
                return _context.abrupt('return', getOrCreateUser(realUserId, true));

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getOrCreateUser(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    var getUserProfile = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(userId) {
        var realUserId, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                realUserId = userId.startsWith('webchat:') ? userId.substr(8) : userId;
                _context2.next = 3;
                return knex('users').where({
                  platform: 'webchat',
                  userId: realUserId
                }).then().get(0);

              case 3:
                user = _context2.sent;
                return _context2.abrupt('return', user);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUserProfile(_x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    var knex, createNewUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            createNewUser = function createNewUser(userId) {
              var _sillyname$split = (0, _sillyname2.default)().split(' '),
                  _sillyname$split2 = _slicedToArray(_sillyname$split, 2),
                  first_name = _sillyname$split2[0],
                  last_name = _sillyname$split2[1];

              return bp.db.saveUser({
                first_name: first_name,
                last_name: last_name,
                profile_pic: null,
                id: userId,
                platform: 'webchat'
              });
            };

            _context3.next = 3;
            return bp.db.get();

          case 3:
            knex = _context3.sent;
            return _context3.abrupt('return', { getOrCreateUser: getOrCreateUser, getUserProfile: getUserProfile });

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _umm = __webpack_require__(8);

var _umm2 = _interopRequireDefault(_umm);

var _api = __webpack_require__(11);

var _api2 = _interopRequireDefault(_api);

var _socket = __webpack_require__(24);

var _socket2 = _interopRequireDefault(_socket);

var _db = __webpack_require__(3);

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  config: {
    uploadsUseS3: { type: 'bool', required: false, default: false, env: 'WEBCHAT_USE_S3' },
    uploadsS3Bucket: { type: 'string', required: false, default: 'bucket-name', env: 'WEBCHAT_S3_BUCKET' },
    uploadsS3Region: { type: 'any', required: false, default: null, env: 'WEBCHAT_S3_REGION' },
    uploadsS3AWSAccessKey: { type: 'any', required: false, default: null, env: 'WEBCHAT_S3_ACCESS_KEY' },
    uploadsS3AWSAccessSecret: { type: 'any', required: false, default: null, env: 'WEBCHAT_S3_KEY_SECRET' },
    startNewConvoOnTimeout: {
      type: 'bool',
      required: false,
      default: false,
      env: 'WEBCHAT_START_NEW_CONVO_ON_TIMEOUT'
    },
    recentConversationLifetime: {
      type: 'any',
      required: false,
      default: '6 hours',
      env: 'WEBCHAT_RECENT_CONVERSATION_LIFETIME'
    }
  },

  init: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(bp, configurator) {
      var config;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return configurator.loadAll();

            case 2:
              config = _context.sent;


              bp.webchat = {};

              // Setup the socket events
              _context.next = 6;
              return (0, _socket2.default)(bp, config);

            case 6:
              return _context.abrupt('return', (0, _umm2.default)(bp));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function init(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return init;
  }(),

  ready: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(bp, configurator) {
      var config, knex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return configurator.loadAll();

            case 2:
              config = _context2.sent;
              _context2.next = 5;
              return bp.db.get();

            case 5:
              knex = _context2.sent;

              (0, _db2.default)(knex, config).initialize();

              // Setup the APIs
              _context2.next = 9;
              return (0, _api2.default)(bp, config);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function ready(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return ready;
  }()
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = __webpack_require__(1);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _mime = __webpack_require__(10);

var _mime2 = _interopRequireDefault(_mime);

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUICK_REPLY_PAYLOAD = /\<(.+)\>\s(.+)/i;

function getUserId(event) {
  var userId = _lodash2.default.get(event, 'user.id') || _lodash2.default.get(event, 'user.userId') || _lodash2.default.get(event, 'userId') || _lodash2.default.get(event, 'raw.from') || _lodash2.default.get(event, 'raw.userId') || _lodash2.default.get(event, 'raw.user.id');

  if (!userId) {
    throw new Error('Could not find userId in the incoming event.');
  }

  return userId;
}

// TODO Extract this logic directly to botpress's UMM
function processQuickReplies(qrs, blocName) {
  if (!_lodash2.default.isArray(qrs)) {
    throw new Error('Expected quick_replies to be an array');
  }

  return qrs.map(function (qr) {
    if (_lodash2.default.isString(qr) && QUICK_REPLY_PAYLOAD.test(qr)) {
      var _QUICK_REPLY_PAYLOAD$ = QUICK_REPLY_PAYLOAD.exec(qr),
          _QUICK_REPLY_PAYLOAD$2 = _slicedToArray(_QUICK_REPLY_PAYLOAD$, 3),
          payload = _QUICK_REPLY_PAYLOAD$2[1],
          text = _QUICK_REPLY_PAYLOAD$2[2];
      // <.HELLO> becomes <BLOCNAME.HELLO>


      if (payload.startsWith('.')) {
        payload = blocName + payload;
      }

      return {
        title: text,
        payload: payload.toUpperCase()
      };
    }

    return qr;
  });
}

function loginPrompt(event, instruction, options) {
  var user = getUserId(event);

  var raw = buildObjectRaw(event, instruction, options, user);

  return PromisifyEvent({
    platform: 'webchat',
    type: 'login_prompt',
    user: { id: user },
    raw: raw,
    text: instruction.text
  });
}

// - type: file
//   url: "https://exemple.com"

function uploadFile(event, instruction, options) {
  var user = getUserId(event);
  var url = instruction.url;

  // if you are working on the same url
  // you can let absolute path for your image

  var extension = _path2.default.extname(url);

  var mimeType = _mime2.default.getType(extension);

  var basename = _path2.default.basename(url, extension);

  var raw = buildObjectRaw(event, instruction, options, user);

  return PromisifyEvent({
    platform: 'webchat',
    type: 'file',
    user: { id: user },
    raw: raw,
    text: instruction.text || basename,
    data: {
      storage: 'remote',
      url: url,
      name: basename || 'unknown',
      mime: mimeType || 'unknown'
    }
  });
}

function carousel(event, instruction, options) {
  var user = getUserId(event);

  var raw = buildObjectRaw(event, instruction, options, user);

  return PromisifyEvent({
    platform: 'webchat',
    type: 'carousel',
    user: { id: user },
    raw: raw,
    text: instruction.text
  });
}

function customEvent(event, instruction, options) {
  var user = getUserId(event);
  var raw = buildObjectRaw(event, instruction, options, user);

  return PromisifyEvent({
    platform: 'webchat',
    type: 'custom',
    user: { id: user },
    raw: _extends({}, raw, { custom_type: instruction.type, custom_data: instruction.data }),
    text: instruction.text
  });
}

function defaultText(event, instruction, options) {
  var user = getUserId(event);
  var raw = buildObjectRaw(event, instruction, options, user);

  if (!_lodash2.default.isNil(instruction.text)) {
    return PromisifyEvent({
      platform: 'webchat',
      type: 'text',
      user: { id: user },
      raw: raw,
      text: instruction.text
    });
  }
}

// Build the raw obj to pass to the Promise
function buildObjectRaw(event, instruction, options, user) {
  var raw = Object.assign({
    to: user,
    message: instruction.text || null
  }, options, _lodash2.default.pick(event && event.raw, 'conversationId'));

  if (raw.elements) {
    encryptIfRequired(raw.elements, event.bp, user);
  }

  return raw;
}

function encryptIfRequired(obj, bp, user) {
  if (obj instanceof Array) {
    for (var i = 0; i < obj.length; i++) {
      encryptIfRequired(obj[i], bp, user);
    }
  } else {
    for (var prop in obj) {
      if (prop === 'encrypt' && obj.encrypt && obj.payload) {
        var payloadToEncrypt = _extends({
          userId: user,
          expire: (0, _moment2.default)().add(1, 'hours').unix()
        }, obj.payload);

        var encrypted = bp.crypto.encrypt(JSON.stringify(payloadToEncrypt));

        obj.payload = 'crypt|' + encrypted;
        delete obj.encrypt;
      }

      if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
        encryptIfRequired(obj[prop], bp, user);
      }
    }
  }
}

function processForm(formElement) {
  if (_lodash2.default.isArray(formElement)) {
    throw new Error('Expected `form` to be an object!');
  }
  if (!formElement.hasOwnProperty('id') || formElement.id === null) {
    throw new Error('Expected `form.id` field');
  }
  if (!formElement.hasOwnProperty('elements') || !_lodash2.default.isArray(formElement.elements)) {
    throw new Error('Expected `form.elements` to be an Array!');
  }
  return {
    title: formElement.title,
    id: formElement.id,
    elements: formElement.elements.map(function (field) {
      if ('input' in field) {
        // Input field
        return {
          label: field.input.label,
          placeholder: field.input.placeholder || '',
          name: field.input.name,
          type: 'input',
          subtype: field.input.subtype || '',
          maxlength: field.input.maxlength || '',
          minlength: field.input.minlength || '',
          required: field.input.required || false
        };
      } else if ('textarea' in field) {
        // Textarea field
        return {
          label: field.textarea.label,
          placeholder: field.textarea.placeholder || '',
          name: field.textarea.name,
          type: 'textarea',
          maxlength: field.textarea.maxlength || '',
          minlength: field.textarea.minlength || '',
          required: field.textarea.required || false
        };
      } else if ('select' in field) {
        // Select field
        return {
          label: field.select.label,
          placeholder: field.select.placeholder || '',
          name: field.select.name,
          options: field.select.options,
          required: field.select.required || false,
          type: 'select'
        };
      } else {
        throw new Error('Cannot recognize element type!');
      }
    })
  };
}

function PromisifyEvent(event) {
  if (!event._promise) {
    event._promise = new _bluebird2.default(function (resolve, reject) {
      event._resolve = resolve;
      event._reject = reject;
    });
  }

  return event;
}

function _processOutgoing(_ref) {
  var event = _ref.event,
      blocName = _ref.blocName,
      instruction = _ref.instruction;

  var ins = Object.assign({}, instruction); // Create a shallow copy of the instruction

  ////////
  // PRE-PROCESSING
  ////////

  var optionsList = ['typing', 'quick_replies', 'file', 'form', 'elements', 'web-style', 'settings', 'markdown'];

  var options = _lodash2.default.pick(instruction, optionsList);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = optionsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;

      delete ins[prop];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (options.quick_replies) {
    options.quick_replies = processQuickReplies(options.quick_replies, blocName);
  }

  // TODO : Make a Quick_replies than handle text and picture.

  if (options.form) {
    options.form = processForm(options.form);
  }
  /////////
  /// Processing
  /////////

  if (instruction.type === 'login_prompt') {
    return loginPrompt(event, instruction, options);
  } else if (instruction.type === 'file') {
    return uploadFile(event, instruction, options);
  } else if (instruction.type === 'carousel') {
    return carousel(event, instruction, options);
  } else if (instruction.type === 'location_picker') {
    // TODO
  } else if (instruction.type && instruction.type.startsWith('@')) {
    return customEvent(event, instruction, options);
  } else {
    return defaultText(event, instruction, options);
  }

  ////////////
  /// POST-PROCESSING
  ////////////

  // Nothing to post-process yet

  ////////////
  /// INVALID INSTRUCTION
  ////////////

  var strRep = _util2.default.inspect(instruction, false, 1);
  throw new Error('Unrecognized instruction on Web in bloc \'' + blocName + '\': ' + strRep);
}

////////////
/// TEMPLATES
////////////

function getTemplates() {
  return [];
}

module.exports = function (bp) {
  var _$at = _lodash2.default.at(bp, ['renderers', 'renderers.registerConnector']),
      _$at2 = _slicedToArray(_$at, 2),
      renderers = _$at2[0],
      registerConnector = _$at2[1];

  renderers && registerConnector && registerConnector({
    platform: 'webchat',
    processOutgoing: function processOutgoing(args) {
      return _processOutgoing(Object.assign({}, args, { bp: bp }));
    },
    templates: getTemplates()
  });
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mime");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _multer = __webpack_require__(12);

var _multer2 = _interopRequireDefault(_multer);

var _multerS = __webpack_require__(13);

var _multerS2 = _interopRequireDefault(_multerS);

var _awsSdk = __webpack_require__(14);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

var _inject = __webpack_require__(15);

var _inject2 = _interopRequireDefault(_inject);

var _inject3 = __webpack_require__(16);

var _inject4 = _interopRequireDefault(_inject3);

var _serveStatic = __webpack_require__(17);

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _db2 = __webpack_require__(3);

var _db3 = _interopRequireDefault(_db2);

var _users = __webpack_require__(5);

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ERR_USER_ID_REQ = '`userId` is required and must be valid';
var ERR_MSG_TYPE = '`type` is required and must be valid';
var ERR_CONV_ID_REQ = '`conversationId` is required and must be valid';

module.exports = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(bp, config) {
    var sendNewMessage = function () {
      var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(userId, conversationId, payload) {
        var sanitizedPayload, persistedPayload, message, user, data, decrypted, dest, flow, node;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!payload.text || !_lodash2.default.isString(payload.text) || payload.text.length > 360)) {
                  _context6.next = 2;
                  break;
                }

                throw new Error('Text must be a valid string of less than 360 chars');

              case 2:
                sanitizedPayload = _lodash2.default.pick(payload, ['text', 'type', 'data']);

                // let the bot programmer make extra cleanup

                if (bp.webchat && bp.webchat.sanitizeIncomingMessage) {
                  sanitizedPayload = bp.webchat.sanitizeIncomingMessage(sanitizedPayload) || sanitizedPayload;
                }

                // Because we don't necessarily persist what we emit/received
                persistedPayload = _extends({}, sanitizedPayload);

                // We remove the password from the persisted messages for security reasons

                if (payload.type === 'login_prompt') {
                  persistedPayload.data = _lodash2.default.omit(persistedPayload.data, ['password']);
                }

                if (payload.type === 'form') {
                  persistedPayload.data.formId = payload.formId;
                }

                _context6.next = 9;
                return appendUserMessage(userId, conversationId, persistedPayload);

              case 9:
                message = _context6.sent;


                Object.assign(message, {
                  __room: 'visitor:' + userId // This is used to send to the relevant user's socket
                });

                bp.events.emit('guest.webchat.message', message);

                _context6.next = 14;
                return getOrCreateUser(userId);

              case 14:
                user = _context6.sent;

                if (!(payload.data && payload.data.payload)) {
                  _context6.next = 36;
                  break;
                }

                data = payload.data.payload;

                if (!(typeof data === 'string' && data.startsWith('crypt|'))) {
                  _context6.next = 36;
                  break;
                }

                decrypted = null;
                _context6.prev = 19;

                decrypted = JSON.parse(bp.crypto.decrypt(data.slice(6)));
                _context6.next = 26;
                break;

              case 23:
                _context6.prev = 23;
                _context6.t0 = _context6['catch'](19);
                throw new Error('Error while decrypting payload', _context6.t0);

              case 26:
                if (!(decrypted.userId != user.id)) {
                  _context6.next = 28;
                  break;
                }

                throw new Error('The encrypted payload is for a different user');

              case 28:
                if (!(0, _moment2.default)().isAfter(_moment2.default.unix(decrypted.expire))) {
                  _context6.next = 30;
                  break;
                }

                throw new Error('User payload expired');

              case 30:
                if (!(decrypted.action === 'gotoFlow')) {
                  _context6.next = 36;
                  break;
                }

                dest = decrypted.dest.split('#');
                flow = dest.shift();
                node = dest.shift();
                _context6.next = 36;
                return bp.dialogEngine.jumpTo(user.id, flow, node);

              case 36:
                return _context6.abrupt('return', bp.middlewares.sendIncoming(Object.assign({
                  platform: 'webchat',
                  type: payload.type,
                  user: user,
                  text: sanitizedPayload.text,
                  raw: _extends({}, sanitizedPayload, {
                    conversationId: conversationId
                  })
                }, payload.data)));

              case 37:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[19, 23]]);
      }));

      return function sendNewMessage(_x14, _x15, _x16) {
        return _ref14.apply(this, arguments);
      };
    }();

    var diskStorage, upload, awsConfig, s3, s3Storage, knex, _db, listConversations, getConversation, appendUserMessage, getOrCreateRecentConversation, createConversation, _ref2, getOrCreateUser, getUserProfile, router, asyncApi, pkg, modulePath, staticFolder, validateUserId, getMessageContent, convertToTxtFile;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            validateUserId = function validateUserId(userId) {
              return (/[a-z0-9-_]+/i.test(userId)
              );
            };

            diskStorage = _multer2.default.diskStorage({
              limits: {
                files: 1,
                fileSize: 5242880 // 5MB
              },
              filename: function filename(req, file, cb) {
                var userId = _lodash2.default.get(req, 'params.userId') || 'anonymous';
                var ext = _path2.default.extname(file.originalname);

                cb(null, userId + '_' + new Date().getTime() + ext);
              }
            });
            upload = (0, _multer2.default)({ storage: diskStorage });


            if (config.uploadsUseS3) {
              /*
                You can override AWS's default settings here. Example:
                { region: 'us-east-1', apiVersion: '2014-10-01', credentials: {...} }
               */
              awsConfig = {
                region: config.uploadsS3Region,
                credentials: {
                  accessKeyId: config.uploadsS3AWSAccessKey,
                  secretAccessKey: config.uploadsS3AWSAccessSecret
                }
              };


              if (!awsConfig.credentials.accessKeyId && !awsConfig.credentials.secretAccessKey) {
                delete awsConfig.credentials;
              }

              if (!awsConfig.region) {
                delete awsConfig.region;
              }

              s3 = new _awsSdk2.default.S3(awsConfig);
              s3Storage = (0, _multerS2.default)({
                s3: s3,
                bucket: config.uploadsS3Bucket || 'uploads',
                contentType: _multerS2.default.AUTO_CONTENT_TYPE,
                cacheControl: 'max-age=31536000', // one year caching
                acl: 'public-read',
                key: function key(req, file, cb) {
                  var userId = _lodash2.default.get(req, 'params.userId') || 'anonymous';
                  var ext = _path2.default.extname(file.originalname);

                  cb(null, userId + '_' + new Date().getTime() + ext);
                }
              });


              upload = (0, _multer2.default)({ storage: s3Storage });
            }

            _context13.next = 6;
            return bp.db.get();

          case 6:
            knex = _context13.sent;
            _db = (0, _db3.default)(knex, config), listConversations = _db.listConversations, getConversation = _db.getConversation, appendUserMessage = _db.appendUserMessage, getOrCreateRecentConversation = _db.getOrCreateRecentConversation, createConversation = _db.createConversation;
            _context13.next = 10;
            return (0, _users2.default)(bp, config);

          case 10:
            _ref2 = _context13.sent;
            getOrCreateUser = _ref2.getOrCreateUser;
            getUserProfile = _ref2.getUserProfile;
            router = bp.getRouter('botpress-platform-webchat', { auth: false });

            asyncApi = function asyncApi(fn) {
              return function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return fn(req, res, next);

                        case 3:
                          _context.next = 9;
                          break;

                        case 5:
                          _context.prev = 5;
                          _context.t0 = _context['catch'](0);

                          bp.logger.error(_context.t0.message, _context.t0.stack);
                          res.status(500).send(_context.t0 && _context.t0.message);

                        case 9:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined, [[0, 5]]);
                }));

                return function (_x3, _x4, _x5) {
                  return _ref3.apply(this, arguments);
                };
              }();
            };

            router.get('/inject.js', function (req, res) {
              res.contentType('text/javascript');
              res.send(_inject2.default);
            });

            router.get('/inject.css', function (req, res) {
              res.contentType('text/css');
              res.send(_inject4.default);
            });

            pkg = __webpack_require__(23);
            modulePath = bp._loadedModules[pkg.name].root;
            staticFolder = _path2.default.join(modulePath, './static');

            router.use('/static', (0, _serveStatic2.default)(staticFolder));

            // ?conversationId=xxx (optional)
            router.post('/messages/:userId', asyncApi(function () {
              var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
                var _ref5, userId, payload, _ref6, conversationId;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _ref5 = req.params || {}, userId = _ref5.userId;

                        if (validateUserId(userId)) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt('return', res.status(400).send(ERR_USER_ID_REQ));

                      case 3:
                        _context2.next = 5;
                        return getOrCreateUser(userId);

                      case 5:
                        // Just to create the user if it doesn't exist

                        payload = req.body || {};
                        _ref6 = req.query || {}, conversationId = _ref6.conversationId;

                        conversationId = conversationId && parseInt(conversationId);

                        if (_lodash2.default.includes(['text', 'quick_reply', 'form', 'login_prompt', 'visit'], payload.type)) {
                          _context2.next = 10;
                          break;
                        }

                        return _context2.abrupt('return', res.status(400).send(ERR_MSG_TYPE));

                      case 10:
                        if (conversationId) {
                          _context2.next = 14;
                          break;
                        }

                        _context2.next = 13;
                        return getOrCreateRecentConversation(userId, { originatesFromUserMessage: true });

                      case 13:
                        conversationId = _context2.sent;

                      case 14:
                        _context2.next = 16;
                        return sendNewMessage(userId, conversationId, payload);

                      case 16:
                        return _context2.abrupt('return', res.sendStatus(200));

                      case 17:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x6, _x7) {
                return _ref4.apply(this, arguments);
              };
            }()));

            // ?conversationId=xxx (required)
            router.post('/messages/:userId/files', upload.single('file'), asyncApi(function () {
              var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
                var _ref8, userId, _ref9, conversationId, payload;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _ref8 = req.params || {}, userId = _ref8.userId;

                        if (validateUserId(userId)) {
                          _context3.next = 3;
                          break;
                        }

                        return _context3.abrupt('return', res.status(400).send(ERR_USER_ID_REQ));

                      case 3:
                        _context3.next = 5;
                        return getOrCreateUser(userId);

                      case 5:
                        // Just to create the user if it doesn't exist

                        _ref9 = req.query || {}, conversationId = _ref9.conversationId;

                        conversationId = conversationId && parseInt(conversationId);

                        if (conversationId) {
                          _context3.next = 9;
                          break;
                        }

                        return _context3.abrupt('return', res.status(400).send(ERR_CONV_ID_REQ));

                      case 9:
                        payload = {
                          text: 'Uploaded a file [' + req.file.originalname + ']',
                          type: 'file',
                          data: {
                            storage: req.file.location ? 's3' : 'local',
                            url: req.file.location || null,
                            name: req.file.originalname,
                            mime: req.file.contentType || req.file.mimetype,
                            size: req.file.size
                          }
                        };
                        _context3.next = 12;
                        return sendNewMessage(userId, conversationId, payload);

                      case 12:
                        return _context3.abrupt('return', res.sendStatus(200));

                      case 13:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x8, _x9) {
                return _ref7.apply(this, arguments);
              };
            }()));

            router.get('/conversations/:userId/:conversationId', function () {
              var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
                var _ref11, userId, conversationId, conversation;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _ref11 = req.params || {}, userId = _ref11.userId, conversationId = _ref11.conversationId;

                        if (validateUserId(userId)) {
                          _context4.next = 3;
                          break;
                        }

                        return _context4.abrupt('return', res.status(400).send(ERR_USER_ID_REQ));

                      case 3:
                        _context4.next = 5;
                        return getConversation(userId, conversationId);

                      case 5:
                        conversation = _context4.sent;
                        return _context4.abrupt('return', res.send(conversation));

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x10, _x11) {
                return _ref10.apply(this, arguments);
              };
            }());

            router.get('/conversations/:userId', function () {
              var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
                var _ref13, userId, conversations;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _ref13 = req.params || {}, userId = _ref13.userId;

                        if (validateUserId(userId)) {
                          _context5.next = 3;
                          break;
                        }

                        return _context5.abrupt('return', res.status(400).send(ERR_USER_ID_REQ));

                      case 3:
                        _context5.next = 5;
                        return getOrCreateUser(userId);

                      case 5:
                        _context5.next = 7;
                        return listConversations(userId);

                      case 7:
                        conversations = _context5.sent;
                        return _context5.abrupt('return', res.send({
                          conversations: [].concat(_toConsumableArray(conversations)),
                          startNewConvoOnTimeout: config.startNewConvoOnTimeout,
                          recentConversationLifetime: config.recentConversationLifetime
                        }));

                      case 9:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x12, _x13) {
                return _ref12.apply(this, arguments);
              };
            }());

            router.post('/events/:userId', asyncApi(function () {
              var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res) {
                var _ref16, type, payload, _ref17, userId, user;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _ref16 = req.body || {}, type = _ref16.type, payload = _ref16.payload;
                        _ref17 = req.params || {}, userId = _ref17.userId;
                        _context7.next = 4;
                        return getOrCreateUser(userId);

                      case 4:
                        user = _context7.sent;

                        bp.middlewares.sendIncoming(_extends({
                          platform: 'webchat',
                          type: type,
                          user: user,
                          text: payload.text,
                          raw: _lodash2.default.pick(payload, ['text', 'type', 'data'])
                        }, payload.data));
                        res.status(200).send({});

                      case 7:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x17, _x18) {
                return _ref15.apply(this, arguments);
              };
            }()));

            router.post('/conversations/:userId/:conversationId/reset', asyncApi(function () {
              var _ref18 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res) {
                var _req$params, userId, conversationId, user, payload;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _req$params = req.params, userId = _req$params.userId, conversationId = _req$params.conversationId;
                        _context8.next = 3;
                        return getOrCreateUser(userId);

                      case 3:
                        user = _context8.sent;
                        payload = {
                          text: 'Reset the conversation',
                          type: 'session_reset'
                        };
                        _context8.next = 7;
                        return sendNewMessage(userId, conversationId, payload);

                      case 7:
                        _context8.next = 9;
                        return bp.dialogEngine.stateManager.deleteState(user.id);

                      case 9:
                        res.status(200).send({});

                      case 10:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              }));

              return function (_x19, _x20) {
                return _ref18.apply(this, arguments);
              };
            }()));

            router.post('/conversations/:userId/new', function () {
              var _ref19 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(req, res) {
                var userId;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        userId = req.params.userId;
                        _context9.next = 3;
                        return createConversation(userId);

                      case 3:

                        res.sendStatus(200);

                      case 4:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, _callee9, undefined);
              }));

              return function (_x21, _x22) {
                return _ref19.apply(this, arguments);
              };
            }());

            router.get('/:userId/reference', function () {
              var _ref20 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res) {
                var userId, webchatUrlQuery, state, newState;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.prev = 0;
                        userId = req.params.userId, webchatUrlQuery = req.query.ref;
                        _context10.next = 4;
                        return bp.dialogEngine.stateManager.getState(userId);

                      case 4:
                        state = _context10.sent;
                        newState = _extends({}, state, { webchatUrlQuery: webchatUrlQuery });
                        _context10.next = 8;
                        return bp.dialogEngine.stateManager.setState(userId, newState);

                      case 8:

                        res.status(200);
                        _context10.next = 14;
                        break;

                      case 11:
                        _context10.prev = 11;
                        _context10.t0 = _context10['catch'](0);

                        res.status(500);

                      case 14:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, _callee10, undefined, [[0, 11]]);
              }));

              return function (_x23, _x24) {
                return _ref20.apply(this, arguments);
              };
            }());

            getMessageContent = function getMessageContent(message) {
              switch (message.message_type) {
                case 'file':
                  return message.message_data.url;
                case 'text':
                  return message.message_text;
                default:
                  return 'Event (' + message.message_type + ')';
              }
            };

            convertToTxtFile = function () {
              var _ref21 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(conversation) {
                var messages, user, timeFormat, metadata, messagesAsTxt;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        messages = conversation.messages;
                        _context11.next = 3;
                        return getUserProfile(conversation.userId);

                      case 3:
                        user = _context11.sent;
                        timeFormat = 'MM/DD/YY HH:mm';
                        metadata = 'Title: ' + conversation.title + '\r\nCreated on: ' + (0, _moment2.default)(conversation.created_on).format(timeFormat) + '\r\nUser: ' + user.first_name + ' ' + user.last_name + '\r\n-----------------\r\n';
                        messagesAsTxt = messages.map(function (message) {
                          if (message.message_type === 'session_reset') {
                            return '';
                          }

                          return '[' + (0, _moment2.default)(message.sent_on).format(timeFormat) + '] ' + message.full_name + ': ' + getMessageContent(message) + '\r\n';
                        });
                        return _context11.abrupt('return', [metadata].concat(_toConsumableArray(messagesAsTxt)).join(''));

                      case 8:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, _callee11, undefined);
              }));

              return function convertToTxtFile(_x25) {
                return _ref21.apply(this, arguments);
              };
            }();

            router.get('/conversations/:userId/:conversationId/download/txt', function () {
              var _ref22 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(req, res) {
                var _ref23, userId, conversationId, conversation, txt;

                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _ref23 = req.params || {}, userId = _ref23.userId, conversationId = _ref23.conversationId;

                        if (validateUserId(userId)) {
                          _context12.next = 3;
                          break;
                        }

                        return _context12.abrupt('return', res.status(400).send(ERR_USER_ID_REQ));

                      case 3:
                        _context12.next = 5;
                        return getConversation(userId, conversationId);

                      case 5:
                        conversation = _context12.sent;
                        _context12.next = 8;
                        return convertToTxtFile(conversation);

                      case 8:
                        txt = _context12.sent;


                        res.send({ txt: txt, name: conversation.title + '.txt' });

                      case 10:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                }, _callee12, undefined);
              }));

              return function (_x26, _x27) {
                return _ref22.apply(this, arguments);
              };
            }());

            return _context13.abrupt('return', router);

          case 33:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("multer-s3");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "'use strict';\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar injectDOMElement = function injectDOMElement(tagName, targetSelector) {\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n  var element = document.createElement(tagName);\n  Object.keys(options).forEach(function (key) {\n    return element[key] = options[key];\n  });\n  document.querySelector(targetSelector).appendChild(element);\n  return element;\n};\n\nwindow.addEventListener('message', function (_ref) {\n  var data = _ref.data;\n\n  if (!data || !data.type || data.type !== 'setClass') {\n    return;\n  }\n  document.querySelector('#bp-widget').setAttribute('class', data.value);\n});\n\nvar init = function init(_ref2) {\n  var _ref2$host = _ref2.host,\n      host = _ref2$host === undefined ? '' : _ref2$host,\n      _ref2$hideWidget = _ref2.hideWidget,\n      hideWidget = _ref2$hideWidget === undefined ? false : _ref2$hideWidget,\n      config = _objectWithoutProperties(_ref2, ['host', 'hideWidget']);\n\n  var cssHref = host + '/api/botpress-platform-webchat/inject.css';\n  injectDOMElement('link', 'head', { rel: 'stylesheet', href: cssHref });\n\n  var options = encodeURIComponent(JSON.stringify({ hideWidget: hideWidget, config: config }));\n  var iframeSrc = host + '/lite/?m=channel-web&v=embedded&options=' + options;\n  var iframeHTML = '<iframe id=\\'bp-widget\\' frameborder=\\'0\\' src=\\'' + iframeSrc + '\\' />';\n  injectDOMElement('div', 'body', { id: 'bp-web-widget', innerHTML: iframeHTML });\n\n  var iframeWindow = document.querySelector('#bp-web-widget > #bp-widget').contentWindow;\n  var configure = function configure(payload) {\n    return iframeWindow.postMessage({ action: 'configure', payload: payload }, '*');\n  };\n  var sendEvent = function sendEvent(payload) {\n    return iframeWindow.postMessage({ action: 'event', payload: payload }, '*');\n  };\n\n  window.botpressWebChat = _extends({}, window.botpressWebChat, { configure: configure, sendEvent: sendEvent });\n};\n\nwindow.botpressWebChat = { init: init };"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = ".bp-widget-web {\n  border: none;\n  display: block;\n  position: fixed;\n  visibility: none;\n  z-index: 100000;\n  max-height: 100vh;\n  max-width: 100vw;\n  transition: none;\n  background: none transparent;\n  opacity: 1;\n  font-size: 16px;\n  letter-spacing: 0;\n  -webkit-font-smoothing: antialiased;\n  padding: 0;\n}\n\n.bp-widget-widget {\n  top: auto;\n  left: auto;\n  bottom: 24px;\n  right: 36px;\n  width: 76px !important;\n  height: 76px !important;\n}\n\n.bp-widget-convo {\n  top: auto;\n  left: auto;\n  bottom: 24px;\n  right: 36px;\n  width: 420px !important;\n  min-height: 382px !important;\n  max-height: 500px !important;\n}\n\n.bp-widget-side {\n  top: 0px;\n  left: auto;\n  bottom: 0px;\n  right: 0px;\n  width: 360px;\n  height: 100% !important;\n}\n\n@media only screen and (max-device-width: 768px) {\n  .bp-widget-side {\n    width: 100%;\n  }\n}\n"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("serve-static");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("botpress");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sanitizeUserId = exports.sanitizeUserId = function sanitizeUserId(userId) {
  return userId.replace(/webchat:/gi, '');
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("sillyname");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {
	"name": "@botpress/channel-web",
	"version": "10.41.1",
	"description": "An embeddable web chat for Botpress bots",
	"main": "bin/node.bundle.js",
	"homepage": "https://github.com/havasmtl-jkahner/botpress-channel-web",
	"botpress": {
		"menuText": "Web Chat",
		"menuIcon": "chrome_reader_mode",
		"webBundle": "bin/web.bundle.js",
		"noInterface": true,
		"plugins": [
			{
				"entry": "WebBotpressUIInjection",
				"position": "overlay"
			}
		]
	},
	"publishConfig": {
		"access": "public"
	},
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 0",
		"watch": "node webpack.js --watch",
		"compile": "node webpack.js --compile"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/havasmtl-jkahner/botpress-channel-web"
	},
	"author": "Botpress",
	"license": "AGPL-3.0-only",
	"peerDependencies": {
		"botpress": ">= 10.0.0"
	},
	"devDependencies": {
		"babel-core": "^6.26.0",
		"babel-loader": "^7.1.2",
		"babel-plugin-transform-async-to-generator": "^6.22.0",
		"babel-plugin-transform-decorators-legacy": "^1.3.4",
		"babel-plugin-transform-object-rest-spread": "^6.16.0",
		"babel-preset-latest": "^6.16.0",
		"babel-preset-react": "^6.24.0",
		"babel-preset-stage-0": "^6.16.0",
		"babel-register": "^6.18.0",
		"classnames": "^2.2.5",
		"copy-webpack-plugin": "^4.3.1",
		"core-js": "^2.4.1",
		"css-loader": "^0.28.8",
		"extract-text-webpack-plugin": "^3.0.2",
		"file-loader": "^1.1.6",
		"image-webpack-loader": "^3.4.2",
		"node-sass": "^4.9.3",
		"raw-loader": "^0.5.1",
		"react-chatview": "^0.2.5",
		"react-dropzone": "^3.13.1",
		"react-linkify": "^0.2.2",
		"react-resizable-box": "^2.0.4",
		"react-slick": "^0.15.4",
		"react-spinkit": "^3.0.0",
		"sass-loader": "^6.0.6",
		"slick-carousel": "^1.8.1",
		"snarkdown": "^1.2.2",
		"style-loader": "^0.19.1",
		"webpack": "^3.10.0",
		"webpack-node-externals": "^1.6.0"
	},
	"dependencies": {
		"aws-sdk": "^2.108.0",
		"axios": "^0.16.2",
		"bluebird": "^3.5.1",
		"date-fns": "^1.28.5",
		"lodash": "^4.17.4",
		"mime": "^2.0.3",
		"moment": "^2.18.1",
		"ms": "^2.1.1",
		"multer": "^1.3.0",
		"multer-s3": "^2.7.0",
		"query-string": "^5.0.1",
		"react-ga": "^2.4.1",
		"serve-static": "^1.12.3",
		"sillyname": "^0.1.0",
		"uuid": "^3.1.0"
	}
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = __webpack_require__(1);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _users = __webpack_require__(5);

var _users2 = _interopRequireDefault(_users);

var _db2 = __webpack_require__(3);

var _db3 = _interopRequireDefault(_db2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var outgoingTypes = ['text', 'login_prompt', 'file', 'carousel', 'custom'];

module.exports = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(bp, config) {
    var outgoingHandler = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, next) {
        var userId, user, typing, conversationId, socketId, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(event.platform !== 'webchat')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', next());

              case 2:
                if (_lodash2.default.includes(outgoingTypes, event.type)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', next('Unsupported event type: ' + event.type));

              case 4:
                userId = event.user && event.user.id || event.raw.to;
                _context.next = 7;
                return getOrCreateUser(userId);

              case 7:
                user = _context.sent;
                typing = parseTyping(event);
                _context.t0 = _lodash2.default.get(event, 'raw.conversationId');

                if (_context.t0) {
                  _context.next = 14;
                  break;
                }

                _context.next = 13;
                return getOrCreateRecentConversation(user.id, {
                  ignoreLifetimeExpiry: true,
                  originatesFromUserMessage: false
                });

              case 13:
                _context.t0 = _context.sent;

              case 14:
                conversationId = _context.t0;
                socketId = user.userId.replace(/webchat:/gi, '');

                if (!typing) {
                  _context.next = 20;
                  break;
                }

                bp.events.emit('guest.webchat.typing', {
                  timeInMs: typing,
                  userId: null,
                  __room: 'visitor:' + socketId,
                  conversationId: conversationId
                });

                _context.next = 20;
                return _bluebird2.default.delay(typing);

              case 20:
                _context.next = 22;
                return appendBotMessage(botName, botAvatarUrl, conversationId, event);

              case 22:
                message = _context.sent;


                Object.assign(message, {
                  __room: 'visitor:' + socketId // This is used to send to the relevant user's socket
                });

                bp.events.emit('guest.webchat.message', message);

                // Resolve the event promise
                event._promise && event._resolve && event._resolve();

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function outgoingHandler(_x3, _x4) {
        return _ref4.apply(this, arguments);
      };
    }();

    var knex, _db, appendBotMessage, getOrCreateRecentConversation, _ref2, getOrCreateUser, _ref3, _ref3$botName, botName, _ref3$botAvatarUrl, botAvatarUrl;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return bp.db.get();

          case 2:
            knex = _context2.sent;
            _db = (0, _db3.default)(knex, config), appendBotMessage = _db.appendBotMessage, getOrCreateRecentConversation = _db.getOrCreateRecentConversation;
            _context2.next = 6;
            return (0, _users2.default)(bp, config);

          case 6:
            _ref2 = _context2.sent;
            getOrCreateUser = _ref2.getOrCreateUser;
            _ref3 = config || {}, _ref3$botName = _ref3.botName, botName = _ref3$botName === undefined ? 'Bot' : _ref3$botName, _ref3$botAvatarUrl = _ref3.botAvatarUrl, botAvatarUrl = _ref3$botAvatarUrl === undefined ? null : _ref3$botAvatarUrl;


            bp.middlewares.register({
              name: 'webchat.sendMessages',
              type: 'outgoing',
              order: 100,
              handler: outgoingHandler,
              module: 'botpress-platform-webchat',
              description: 'Sends out messages that targets platform = webchat.' + ' This middleware should be placed at the end as it swallows events once sent.'
            });

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function parseTyping(msg) {
  if (msg.raw && !!msg.raw.typing) {
    if (isNaN(msg.raw.typing)) {
      return 1000;
    } else {
      return Math.max(msg.raw.typing, 500);
    }
  }

  return false;
}

/***/ })
/******/ ]);
//# sourceMappingURL=node.bundle.js.map