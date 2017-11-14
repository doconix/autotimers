	__nest__ (
		__all__,
		'timer_base', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var get_timers = __init__ (__world__.storage).get_timers;
					var set_timer = __init__ (__world__.storage).set_timer;
					var remove_timer = __init__ (__world__.storage).remove_timer;
					var S = jQuery;
					var BaseTimer = __class__ ('BaseTimer', [object], {
						get __init__ () {return __get__ (this, function (self, elem, options, deferred) {
							self.elem = elem;
							self.millis = options ['millis'];
							self.max_runs = options ['max_runs'];
							self.tname = options ['name'];
							self.deferred = deferred;
							self.timer_id = null;
							self.timer_start = null;
							self.run_index = 0;
							self.cancelled = false;
							for (var other_timer of get_timers (S (self.elem), self.tname)) {
								if (other_timer !== self) {
									other_timer.cancel ();
								}
							}
							set_timer (S (self.elem), self.tname, self);
							self.start ();
						});},
						get start () {return __get__ (this, function (self) {
							if (!(self._shouldRunAgain ())) {
								self._cleanup ();
								self.deferred.resolveWith (self.elem, list ([self]));
							}
							else {
								self.timer_start = new Date ().getTime ();
								self.timer_id = self._startTimer ();
							}
						});},
						get cancel () {return __get__ (this, function (self) {
							self.cancelled = true;
							self._cleanup ();
							self.deferred.resolveWith (self.elem, list ([self]));
						});},
						get _startTimer () {return __get__ (this, function (self) {
							console.warn ('Subclass did not implement _startTimer');
						});},
						get _notifyObservers () {return __get__ (this, function (self) {
							if (!(self._shouldRunAgain ())) {
								self._cleanup ();
								self.deferred.resolveWith (self.elem, list ([self]));
							}
							else {
								self.run_index++;
								try {
									self.deferred.notifyWith (self.elem, list ([self]));
								}
								catch (__except0__) {
									if (isinstance (__except0__, Error)) {
										var err = __except0__;
										self._cleanup ();
										if (self.deferred.state () != 'pending') {
											var __except1__ = err;
											__except1__.__cause__ = null;
											throw __except1__;
										}
										self.deferred.rejectWith (self.elem, list ([self, err]));
										return ;
									}
									else {
										throw __except0__;
									}
								}
								self.start ();
							}
						});},
						get _shouldRunAgain () {return __get__ (this, function (self) {
							return (self.elem !== null && (document == self.elem || S.contains (document, self.elem))) && !(self.cancelled) && self.millis >= 0 && (self.max_runs <= 0 || self.run_index < self.max_runs) && self.deferred.state () == 'pending';
						});},
						get _cleanup () {return __get__ (this, function (self) {
							remove_timer (S (self.elem), self.tname);
							window.clearTimeout (self.timer_id);
							self.timer_id = null;
						});}
					});
					__pragma__ ('<use>' +
						'storage' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BaseTimer = BaseTimer;
						__all__.S = S;
						__all__.get_timers = get_timers;
						__all__.remove_timer = remove_timer;
						__all__.set_timer = set_timer;
					__pragma__ ('</all>')
				}
			}
		}
	);
