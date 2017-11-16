	__nest__ (
		__all__,
		'timer_base', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var get_timers = __init__ (__world__.storage).get_timers;
					var set_timer = __init__ (__world__.storage).set_timer;
					var remove_timer = __init__ (__world__.storage).remove_timer;
					var TimerPromise = __init__ (__world__.promise).TimerPromise;
					var BaseTimer = __class__ ('BaseTimer', [object], {
						get __init__ () {return __get__ (this, function (self, elem, options) {
							self.elem = elem;
							self.millis = options ['millis'];
							self.maxRuns = options ['maxRuns'];
							self.tname = options ['name'];
							self.timer_id = null;
							self.timer_start = null;
							self.run_index = 0;
							self.cancelled = false;
							for (var other_timer of get_timers (self.elem, self.tname)) {
								if (other_timer !== self) {
									other_timer.cancel ();
								}
							}
							set_timer (self.elem, self.tname, self);
							self.promise = TimerPromise (self._renewTimer);
						});},
						get cancel () {return __get__ (this, function (self) {
							self.cancelled = true;
							self._cleanup ();
							self.promise.resolve.apply (self.elem, list ([self]));
						});},
						get _renewTimer () {return __get__ (this, function (self) {
							console.log (11);
							if (!(self._shouldRunAgain ())) {
								console.log (22);
								self._cleanup ();
								self.promise.resolve.apply (self.elem, list ([self]));
							}
							else {
								console.log (33);
								self.timer_start = new Date ().getTime ();
								self.timer_id = window.setTimeout (self._onTimeout, self._nextMillis ());
							}
						});},
						get _nextMillis () {return __get__ (this, function (self) {
							return self.millis;
						});},
						get _onTimeout () {return __get__ (this, function (self) {
							if (!(self._shouldRunAgain ())) {
								self._cleanup ();
								self.promise.resolve.apply (self.elem, list ([self]));
							}
							else {
								self.run_index++;
								try {
									self.palarm (self.elem, list ([self]));
								}
								catch (__except0__) {
									if (isinstance (__except0__, Error)) {
										var err = __except0__;
										self._cleanup ();
										if (!(self.promise.pending)) {
											var __except1__ = err;
											__except1__.__cause__ = null;
											throw __except1__;
										}
										self.promise.reject.apply (self.elem, list ([self, err]));
										return ;
									}
									else {
										throw __except0__;
									}
								}
								self._doAlarm ();
							}
						});},
						get _shouldRunAgain () {return __get__ (this, function (self) {
							return (self.elem !== null && (document == self.elem || document.contains (self.elem))) && !(self.cancelled) && self.millis >= 0 && (self.maxRuns <= 0 || self.run_index < self.maxRuns) && self.deferred.state () == 'pending';
						});},
						get _cleanup () {return __get__ (this, function (self) {
							remove_timer (self.elem, self.tname);
							window.clearTimeout (self.timer_id);
							self.timer_id = null;
						});}
					});
					__pragma__ ('<use>' +
						'promise' +
						'storage' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BaseTimer = BaseTimer;
						__all__.TimerPromise = TimerPromise;
						__all__.get_timers = get_timers;
						__all__.remove_timer = remove_timer;
						__all__.set_timer = set_timer;
					__pragma__ ('</all>')
				}
			}
		}
	);
