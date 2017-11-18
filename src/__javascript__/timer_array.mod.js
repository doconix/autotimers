	(function () {
		var TimerArray = __class__ ('TimerArray', [object], {
			get __init__ () {return __get__ (this, function (self, timers) {
				self.timers = timers;
			});},
			get cancel () {return __get__ (this, function (self) {
				for (var timer of self.timers) {
					timer.cancel ();
				}
				return self;
			});},
			get do () {return __get__ (this, function (self, onAlarm) {
				for (var timer of self.timers) {
					timer.do (onAlarm);
				}
				return self;
			});},
			get catch () {return __get__ (this, function (self, onError) {
				for (var timer of self.timers) {
					timer.catch (onError);
				}
				return self;
			});},
			get then () {return __get__ (this, function (self, onFinish) {
				for (var timer of self.timers) {
					timer.then (onFinish);
				}
				return self;
			});}
		});
		__pragma__ ('<all>')
			__all__.TimerArray = TimerArray;
		__pragma__ ('</all>')
	}) ();
