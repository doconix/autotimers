	(function () {
		var TestBase = __init__ (__world__.test_base).TestBase;
		var TestInterval = __class__ ('TestInterval', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.start_time = new Date ();
				var func = function () {
					self.counter++;
				};
				Timers.IntervalTimer (self.div, dict ({'millis': 400})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 2);
			});}
		});
		document.TESTS.append (TestInterval);
		var TestIntervalAfter = __class__ ('TestIntervalAfter', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.start_time = new Date ();
				var func = function () {
					self.counter++;
				};
				Timers.IntervalAfterTimer (self.div, dict ({'millis': 400})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 3);
			});}
		});
		document.TESTS.append (TestIntervalAfter);
		__pragma__ ('<use>' +
			'test_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.TestBase = TestBase;
			__all__.TestInterval = TestInterval;
			__all__.TestIntervalAfter = TestIntervalAfter;
		__pragma__ ('</all>')
	}) ();
