	(function () {
		var BaseTimer = __init__ (__world__.timer_base).BaseTimer;
		var S = jQuery;
		var OnceTimer = __class__ ('OnceTimer', [BaseTimer], {
			get __init__ () {return __get__ (this, function (self, elem, options, deferred) {
				options ['max_runs'] = 1;
				__super__ (OnceTimer, '__init__') (self, elem, options, deferred);
			});},
			get _startTimer () {return __get__ (this, function (self) {
				return window.setTimeout (self._notifyObservers, self.millis);
			});}
		});
		__pragma__ ('<use>' +
			'timer_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.BaseTimer = BaseTimer;
			__all__.OnceTimer = OnceTimer;
			__all__.S = S;
		__pragma__ ('</all>')
	}) ();
