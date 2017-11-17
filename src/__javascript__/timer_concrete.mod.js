	(function () {
		var BaseTimer = __init__ (__world__.timer_base).BaseTimer;
		var OnceTimer = __class__ ('OnceTimer', [BaseTimer], {
			get __init__ () {return __get__ (this, function (self, options) {
				options ['maxRuns'] = 1;
				__super__ (OnceTimer, '__init__') (self, options);
			});}
		});
		var SleepTimer = __class__ ('SleepTimer', [BaseTimer], {
		});
		var SleepAfterTimer = __class__ ('SleepAfterTimer', [SleepTimer], {
			get _nextMillis () {return __get__ (this, function (self) {
				if (self.runIndex == 0) {
					return 100;
				}
				return __super__ (SleepAfterTimer, '_nextMillis') (self);
			});}
		});
		var IntervalTimer = __class__ ('IntervalTimer', [BaseTimer], {
			get _nextMillis () {return __get__ (this, function (self) {
				if (self.timerStart === null) {
					return self.millis;
				}
				else {
					return max (0, self.millis - (new Date ().getTime () - self.timerStart));
				}
			});}
		});
		var IntervalAfterTimer = __class__ ('IntervalAfterTimer', [IntervalTimer], {
			get _nextMillis () {return __get__ (this, function (self) {
				if (self.runIndex == 0) {
					return 100;
				}
				return __super__ (IntervalAfterTimer, '_nextMillis') (self);
			});}
		});
		__pragma__ ('<use>' +
			'timer_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.BaseTimer = BaseTimer;
			__all__.IntervalAfterTimer = IntervalAfterTimer;
			__all__.IntervalTimer = IntervalTimer;
			__all__.OnceTimer = OnceTimer;
			__all__.SleepAfterTimer = SleepAfterTimer;
			__all__.SleepTimer = SleepTimer;
		__pragma__ ('</all>')
	}) ();
