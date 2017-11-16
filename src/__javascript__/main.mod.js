	(function () {
		var timer_interval = {};
		var timer_once = {};
		var timer_sleep = {};
		var get_timers = __init__ (__world__.storage).get_timers;
		__nest__ (timer_once, '', __init__ (__world__.timer_once));
		__nest__ (timer_sleep, '', __init__ (__world__.timer_sleep));
		__nest__ (timer_interval, '', __init__ (__world__.timer_interval));
		var Timers = __class__ ('Timers', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.defaults = dict ({'millis': 1000, 'maxRuns': 0, 'name': 'default'});
			});},
			get cancel () {return __get__ (this, function (self, elem, tname) {
				for (var timer of get_timers (elem, tname)) {
					timer.cancel ();
				}
			});},
			get timers () {return __get__ (this, function (self, elem, tname) {
				return get_timers (elem, tname);
			});},
			get Timer () {return __get__ (this, function (self, elem, options) {
				return self._create (timer_once.OnceTimer, elem, options);
			});},
			get SleepTimer () {return __get__ (this, function (self, elem, options) {
				return self._create (timer_sleep.SleepTimer, elem, options);
			});},
			get SleepAfterTimer () {return __get__ (this, function (self, elem, options) {
				return self._create (timer_sleep.SleepAfterTimer, elem, options);
			});},
			get IntervalTimer () {return __get__ (this, function (self, elem, options) {
				return self._create (timer_interval.IntervalTimer, elem, options);
			});},
			get IntervalAfterTimer () {return __get__ (this, function (self, elem, options) {
				return self._create (timer_interval.IntervalAfterTimer, elem, options);
			});},
			get _create () {return __get__ (this, function (self, timer_class, elem, options) {
				if (!(elem)) {
					console.warn ('Timer set on undefined element. Setting on document instead.');
					var elem = document;
				}
				if (typeof (options) == 'number') {
					var options = dict ({'millis': options});
				}
				var combined = dict ({});
				combined.py_update (self.defaults);
				if (options !== null) {
					combined.py_update (options);
				}
				var timer = timer_class (elem, combined);
				return timer.promise;
			});}
		});
		var in_browser = function () {
			return typeof (window) !== 'undefined';
		};
		var in_commonjs = function () {
			return typeof (module) === 'object' && module.exports;
		};
		var in_amd = function () {
			return typeof (define) === 'function' && define.amd;
		};
		if (in_commonjs ()) {
			module.exports = Timers ();
		}
		else if (in_browser ()) {
			window ['Timers'] = Timers ();
		}
		__pragma__ ('<use>' +
			'storage' +
			'timer_interval' +
			'timer_once' +
			'timer_sleep' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Timers = Timers;
			__all__.get_timers = get_timers;
			__all__.in_amd = in_amd;
			__all__.in_browser = in_browser;
			__all__.in_commonjs = in_commonjs;
		__pragma__ ('</all>')
	}) ();
