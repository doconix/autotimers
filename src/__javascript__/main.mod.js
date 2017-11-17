	(function () {
		var timer_concrete = {};
		var get_timers = __init__ (__world__.storage).get_timers;
		__nest__ (timer_concrete, '', __init__ (__world__.timer_concrete));
		var Timers = __class__ ('Timers', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.defaults = dict ({'elem': document, 'millis': 1000, 'maxRuns': 0, 'name': 'default'});
			});},
			get cancel () {return __get__ (this, function (self, elem, tname) {
				if (!(elem)) {
					var elem = document;
				}
				for (var timer of get_timers (elem, tname)) {
					timer.cancel ();
				}
			});},
			get timers () {return __get__ (this, function (self, elem, tname) {
				if (!(elem)) {
					var elem = document;
				}
				return get_timers (elem, tname);
			});},
			get Timer () {return __get__ (this, function (self) {
				var args = tuple ([].slice.apply (arguments).slice (1));
				return self._create (timer_concrete.OnceTimer, args);
			});},
			get SleepTimer () {return __get__ (this, function (self) {
				var args = tuple ([].slice.apply (arguments).slice (1));
				return self._create (timer_concrete.SleepTimer, args);
			});},
			get SleepAfterTimer () {return __get__ (this, function (self) {
				var args = tuple ([].slice.apply (arguments).slice (1));
				return self._create (timer_concrete.SleepAfterTimer, args);
			});},
			get IntervalTimer () {return __get__ (this, function (self) {
				var args = tuple ([].slice.apply (arguments).slice (1));
				return self._create (timer_concrete.IntervalTimer, args);
			});},
			get IntervalAfterTimer () {return __get__ (this, function (self) {
				var args = tuple ([].slice.apply (arguments).slice (1));
				return self._create (timer_concrete.IntervalAfterTimer, args);
			});},
			get _create () {return __get__ (this, function (self, timer_class, args) {
				var combined = dict ({});
				combined.py_update (self.defaults);
				for (var arg of args) {
					if (typeof (arg) == 'number') {
						combined ['millis'] = arg;
					}
					else if (arg ['nodeType']) {
						combined ['elem'] = arg;
					}
					else if (!(arg)) {
						// pass;
					}
					else {
						combined.py_update (arg);
					}
				}
				return timer_class (combined);
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
			'timer_concrete' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Timers = Timers;
			__all__.get_timers = get_timers;
			__all__.in_amd = in_amd;
			__all__.in_browser = in_browser;
			__all__.in_commonjs = in_commonjs;
		__pragma__ ('</all>')
	}) ();
