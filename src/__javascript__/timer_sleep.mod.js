	__nest__ (
		__all__,
		'timer_sleep', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var BaseTimer = __init__ (__world__.timer_base).BaseTimer;
					var SleepTimer = __class__ ('SleepTimer', [BaseTimer], {
					});
					var SleepAfterTimer = __class__ ('SleepAfterTimer', [SleepTimer], {
						get _renewTimer () {return __get__ (this, function (self) {
							if (self.runIndex == 0) {
								return self._onTimeout ();
							}
							return __super__ (SleepAfterTimer, '_renewTimer') (self);
						});}
					});
					__pragma__ ('<use>' +
						'timer_base' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BaseTimer = BaseTimer;
						__all__.SleepAfterTimer = SleepAfterTimer;
						__all__.SleepTimer = SleepTimer;
					__pragma__ ('</all>')
				}
			}
		}
	);
