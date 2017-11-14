	__nest__ (
		__all__,
		'test_sleep', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TestBase = __init__ (__world__.test_base).TestBase;
					var S = jQuery;
					var TestSleep = __class__ ('TestSleep', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							self.start_time = new Date ();
							var func = function () {
								self.counter++;
							};
							self.div.timers ().SleepTimer (dict ({'millis': 400})).do (func);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 2);
						});}
					});
					S.fn.timers.TESTS.append (TestSleep);
					var TestSleepAfter = __class__ ('TestSleepAfter', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							self.start_time = new Date ();
							var func = function () {
								self.counter++;
							};
							self.div.timers ().SleepAfterTimer (dict ({'millis': 400})).do (func);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 3);
						});}
					});
					S.fn.timers.TESTS.append (TestSleepAfter);
					__pragma__ ('<use>' +
						'test_base' +
					'</use>')
					__pragma__ ('<all>')
						__all__.S = S;
						__all__.TestBase = TestBase;
						__all__.TestSleep = TestSleep;
						__all__.TestSleepAfter = TestSleepAfter;
					__pragma__ ('</all>')
				}
			}
		}
	);
