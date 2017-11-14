	(function () {
		var timer_interval = {};
		var timer_once = {};
		var timer_sleep = {};
		var DEFAULT_OPTIONS = dict ({'millis': 1000, 'max_runs': 0, 'name': 'default'});
		var S = jQuery;
		var get_timers = __init__ (__world__.storage).get_timers;
		var autotimer = function (options, tname) {
			var elems = this;
			if (options == 'cancel') {
				for (var e of elems) {
					for (var timer of get_timers (S (e), tname)) {
						timer.cancel ();
					}
				}
				return elems;
			}
			else if (options == 'list') {
				var timers = list ([]);
				for (var e of elems) {
					timers.extend (get_timers (S (e), tname));
				}
				return timers;
			}
			return SecondaryNamespace (elems);
		};
		S.fn.autotimer = autotimer;
		S.fn.autotimer.defaults = DEFAULT_OPTIONS;
		S.fn.autotimer.VERSION = '2.0.6';
		__nest__ (timer_once, '', __init__ (__world__.timer_once));
		__nest__ (timer_sleep, '', __init__ (__world__.timer_sleep));
		__nest__ (timer_interval, '', __init__ (__world__.timer_interval));
		var SecondaryNamespace = __class__ ('SecondaryNamespace', [object], {
			get __init__ () {return __get__ (this, function (self, elems) {
				self.elems = elems;
			});},
			get _create_timer () {return __get__ (this, function (self, klass, options) {
				if (S.isNumeric (options)) {
					var options = dict ({'millis': options});
				}
				var combined = dict ({});
				combined.py_update (S.fn.autotimer.defaults);
				if (options !== null) {
					combined.py_update (options);
				}
				var deferred = S.Deferred ();
				for (var e of self.elems) {
					klass (e, combined, deferred);
				}
				var p = deferred.promise ();
				p.do = p.progress;
				return p;
			});},
			get Timer () {return __get__ (this, function (self, options) {
				return self._create_timer (timer_once.OnceTimer, options);
			});},
			get SleepTimer () {return __get__ (this, function (self, options) {
				return self._create_timer (timer_sleep.SleepTimer, options);
			});},
			get SleepAfterTimer () {return __get__ (this, function (self, options) {
				return self._create_timer (timer_sleep.SleepAfterTimer, options);
			});},
			get IntervalTimer () {return __get__ (this, function (self, options) {
				return self._create_timer (timer_interval.IntervalTimer, options);
			});},
			get IntervalAfterTimer () {return __get__ (this, function (self, options) {
				return self._create_timer (timer_interval.IntervalAfterTimer, options);
			});}
		});
		__pragma__ ('<use>' +
			'storage' +
			'timer_interval' +
			'timer_once' +
			'timer_sleep' +
		'</use>')
		__pragma__ ('<all>')
			__all__.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
			__all__.S = S;
			__all__.SecondaryNamespace = SecondaryNamespace;
			__all__.autotimer = autotimer;
			__all__.get_timers = get_timers;
		__pragma__ ('</all>')
	}) ();
