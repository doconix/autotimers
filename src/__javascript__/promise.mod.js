	__nest__ (
		__all__,
		'promise', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TimerPromise = __class__ ('TimerPromise', [object], {
						get __init__ () {return __get__ (this, function (self, executor) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'executor': var executor = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							self.resolve;
							self.reject;
							self.executor = executor;
							self.do_handlers = list ([]);
							self.promise = new Promise (self._executor).then (self._cleanup, self._cleanup);
						});},
						get _cleanup () {return __get__ (this, function (self) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							self.resolve = null;
							self.reject = null;
							self.do_handlers = null;
							self.promise = null;
						});},
						get do () {return __get__ (this, function (self, onAlarm) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'onAlarm': var onAlarm = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							if (self.do_handlers !== null) {
								self.do_handlers.append (onAlarm);
							}
							return self;
						});},
						get alarm () {return __get__ (this, function (self, context, args) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'context': var context = __allkwargs0__ [__attrib0__]; break;
											case 'args': var args = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							console.log ('alarm called!');
							if (self._pending) {
								for (var f of self.do_handlers) {
									f.apply (context, args);
								}
							}
						});},
						get _executor () {return __get__ (this, function (self, resolve, reject) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'resolve': var resolve = __allkwargs0__ [__attrib0__]; break;
											case 'reject': var reject = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							console.log ('saving resolve and reject');
							self.resolve = resolve;
							self.reject = reject;
							self.executor ();
							self.executor = null;
						});},
						get _pending () {return __get__ (this, function (self) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							return bool (self.do_handlers);
						});},
						get catch () {return __get__ (this, function (self) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							self.promise = self.promise.catch (...args, __kwargtrans__ (kwargs));
							return self;
						});},
						get then () {return __get__ (this, function (self) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							self.promise = self.promise.then (...args, __kwargtrans__ (kwargs));
							return self;
						});},
						get finally () {return __get__ (this, function (self) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							self.promise = self.promise.finally (...args, __kwargtrans__ (kwargs));
							return self;
						});}
					});
					Object.defineProperty (TimerPromise, 'pending', property.call (TimerPromise, TimerPromise.pending));;
					__pragma__ ('<all>')
						__all__.TimerPromise = TimerPromise;
					__pragma__ ('</all>')
				}
			}
		}
	);
