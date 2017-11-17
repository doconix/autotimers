	(function () {
		var TestBase = __init__ (__world__.test_base).TestBase;
		var TestSleep = __class__ ('TestSleep', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.start_time = new Date ();
				var func = function () {
					self.counter++;
				};
				Timers.SleepTimer (self.div, dict ({'millis': 400})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 2);
			});}
		});
		document.TESTS.append (TestSleep);
		var TestSleepAfter = __class__ ('TestSleepAfter', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.start_time = new Date ();
				var func = function () {
					self.counter++;
				};
				Timers.SleepAfterTimer (self.div, dict ({'millis': 400})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 3);
			});}
		});
		document.TESTS.append (TestSleepAfter);
		__pragma__ ('<use>' +
			'test_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.TestBase = TestBase;
			__all__.TestSleep = TestSleep;
			__all__.TestSleepAfter = TestSleepAfter;
		__pragma__ ('</all>')
	}) ();
