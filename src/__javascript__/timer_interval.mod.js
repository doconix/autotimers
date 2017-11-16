	__nest__ (
		__all__,
		'timer_interval', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var BaseTimer = __init__ (__world__.timer_base).BaseTimer;
					var IntervalTimer = __class__ ('IntervalTimer', [BaseTimer], {
						get _nextMillis () {return __get__ (this, function (self) {
							if (self.timer_start === null) {
								return self.millis;
							}
							else {
								return max (0, self.millis - (new Date ().getTime () - self.timer_start));
							}
						});}
					});
					var IntervalAfterTimer = __class__ ('IntervalAfterTimer', [IntervalTimer], {
						get _renewTimer () {return __get__ (this, function (self) {
							if (self.run_index == 0) {
								return self._onTimeout ();
							}
							return __super__ (IntervalAfterTimer, '_renewTimer') (self);
						});}
					});
					__pragma__ ('<use>' +
						'timer_base' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BaseTimer = BaseTimer;
						__all__.IntervalAfterTimer = IntervalAfterTimer;
						__all__.IntervalTimer = IntervalTimer;
					__pragma__ ('</all>')
				}
			}
		}
	);
