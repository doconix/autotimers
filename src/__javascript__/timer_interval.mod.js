	(function () {
		var BaseTimer = __init__ (__world__.timer_base).BaseTimer;
		var S = jQuery;
		var IntervalTimer = __class__ ('IntervalTimer', [BaseTimer], {
			get _startTimer () {return __get__ (this, function (self) {
				if (self.timer_start === null) {
					var millis = self.millis;
				}
				else {
					var millis = max (0, self.millis - (new Date ().getTime () - self.timer_start));
				}
				return window.setTimeout (self._notifyObservers, millis);
			});}
		});
		var IntervalAfterTimer = __class__ ('IntervalAfterTimer', [IntervalTimer], {
			get start () {return __get__ (this, function (self) {
				if (self.run_index == 0) {
					return self._notifyObservers ();
				}
				return __super__ (IntervalAfterTimer, 'start') (self);
			});}
		});
		__pragma__ ('<use>' +
			'timer_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.BaseTimer = BaseTimer;
			__all__.IntervalAfterTimer = IntervalAfterTimer;
			__all__.IntervalTimer = IntervalTimer;
			__all__.S = S;
		__pragma__ ('</all>')
	}) ();
