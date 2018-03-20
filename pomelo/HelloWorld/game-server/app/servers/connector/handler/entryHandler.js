module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
  console.log("received session stuff: ", session);
  console.log("received msg stuff: ", msg);
  const no = parseInt(msg.number);
  const check = isNaN(no) ? 0 : 1;
  if (check) {
    var binaryRep = (no >>> 0).toString(2);
    var binaryNo = binaryRep.split('1');
    var max = 0;
    for (var i = 0; i < binaryNo.length; i++)
      if (max < binaryNo[i].length)
        max = binaryNo[i].length
  }
  const resultMessage = (check === 0 ?
    'Enter a valid number.' : 'Size of biggest seq of zeros: [ ' + max +  ' ].\
  \nBinary rep is: ' + binaryRep + ".");
  next(null, {code: 200, msg: resultMessage});
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
