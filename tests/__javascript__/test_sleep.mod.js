	__nest__ (
		__all__,
		'test_sleep', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TestBase = __init__ (__world__.test_base).TestBase;
					var TestSleep = __class__ ('TestSleep', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							self.start_time = new Date ();
							var func = function () {
								self.counter++;
							};
							self.div.autotimer ().SleepTimer (dict ({'millis': 400})).do (func);
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
							self.div.autotimer ().SleepAfterTimer (dict ({'millis': 400})).do (func);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 3);
						});}
					});
					document.TESTS.append (TestSleepAfter);
					var TestSleepAfter = __class__ ('TestSleepAfter', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							self.start_time = new Date ();
							var func = function () {
								self.counter++;
							};
							var promise = self.div.autotimer ().SleepAfterTimer (dict ({'millis': 10000}));
							var attach = function () {
								promise.do (func);
							};
							window.setTimeout (attach, 400);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 1);
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
				}
			}
		}
	);
