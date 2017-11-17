	__nest__ (
		__all__,
		'timer_base', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var get_timers = __init__ (__world__.storage).get_timers;
					var set_timer = __init__ (__world__.storage).set_timer;
					var remove_timer = __init__ (__world__.storage).remove_timer;
					var BaseTimer = __class__ ('BaseTimer', [object], {
						get __init__ () {return __get__ (this, function (self, options) {
							self.elem = options ['elem'];
							self.millis = options ['millis'];
							self.maxRuns = options ['maxRuns'];
							self.tname = options ['name'];
							self.timerId = null;
							self.timerStart = null;
							self.runIndex = 0;
							self.finished = false;
							for (var other_timer of get_timers (self.elem, self.tname)) {
								if (other_timer !== self) {
									other_timer.cancel ();
								}
							}
							set_timer (self.elem, self.tname, self);
							self.observers = dict ({'do': list ([]), 'then': list ([]), 'catch': list ([])});
							self._renewTimer ();
						});},
						get cancel () {return __get__ (this, function (self) {
							self._notifyObservers ('then', list ([self]));
							self._finalizeTimer ();
						});},
						get _finalizeTimer () {return __get__ (this, function (self) {
							remove_timer (self.elem, self.tname);
							if (self.timerId) {
								window.clearTimeout (self.timerId);
								self.timerId = null;
							}
							self.observers = null;
						});},
						get _renewTimer () {return __get__ (this, function (self) {
							if (!(self._shouldRunAgain ())) {
								self._notifyObservers ('then', list ([self]));
								self._finalizeTimer ();
							}
							else {
								self.timerStart = new Date ().getTime ();
								self.timerId = window.setTimeout (self._onTimeout, self._nextMillis ());
							}
						});},
						get _nextMillis () {return __get__ (this, function (self) {
							return self.millis;
						});},
						get _onTimeout () {return __get__ (this, function (self) {
							if (!(self._shouldRunAgain ())) {
								self._notifyObservers ('then', list ([self]));
								self._finalizeTimer ();
							}
							else {
								self.runIndex++;
								try {
									self._notifyObservers ('do', list ([self]));
								}
								catch (__except0__) {
									if (isinstance (__except0__, Error)) {
										var err = __except0__;
										if (self.observers === null) {
											var __except1__ = err;
											__except1__.__cause__ = null;
											throw __except1__;
										}
										self._notifyObservers ('catch', list ([self, err]));
										self._finalizeTimer ();
										return ;
									}
									else {
										throw __except0__;
									}
								}
								self._renewTimer ();
							}
						});},
						get _shouldRunAgain () {return __get__ (this, function (self) {
							return (self.elem !== null && (document == self.elem || document.contains (self.elem))) && self.observers !== null && self.millis >= 0 && (self.maxRuns <= 0 || self.runIndex < self.maxRuns);
						});},
						get do () {return __get__ (this, function (self, onAlarm) {
							return self._registerObserver ('do', onAlarm);
						});},
						get catch () {return __get__ (this, function (self, onError) {
							return self._registerObserver ('catch', onError);
						});},
						get then () {return __get__ (this, function (self, onFinish) {
							return self._registerObserver ('then', onFinish);
						});},
						get _registerObserver () {return __get__ (this, function (self, observer_key, callback) {
							if (self.observers && self.observers [observer_key]) {
								self.observers [observer_key].append (callback);
							}
							return self;
						});},
						get _notifyObservers () {return __get__ (this, function (self, observer_key, args) {
							if (self.observers && self.observers [observer_key]) {
								for (var f of self.observers [observer_key]) {
									f.apply (self.elem, args);
								}
							}
						});}
					});
					__pragma__ ('<use>' +
						'storage' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BaseTimer = BaseTimer;
						__all__.get_timers = get_timers;
						__all__.remove_timer = remove_timer;
						__all__.set_timer = set_timer;
					__pragma__ ('</all>')
				}
			}
		}
	);
