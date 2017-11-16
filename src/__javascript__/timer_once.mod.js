	__nest__ (
		__all__,
		'timer_once', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var BaseTimer = __init__ (__world__.timer_base).BaseTimer;
					var OnceTimer = __class__ ('OnceTimer', [BaseTimer], {
						get __init__ () {return __get__ (this, function (self, elem, options, deferred) {
							options ['maxRuns'] = 1;
							__super__ (OnceTimer, '__init__') (self, elem, options, deferred);
						});}
					});
					__pragma__ ('<use>' +
						'timer_base' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BaseTimer = BaseTimer;
						__all__.OnceTimer = OnceTimer;
					__pragma__ ('</all>')
				}
			}
		}
	);
