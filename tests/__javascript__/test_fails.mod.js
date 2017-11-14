	__nest__ (
		__all__,
		'test_fails', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TestBase = __init__ (__world__.test_base).TestBase;
					var TestZeroMillis = __class__ ('TestZeroMillis', [TestBase], {
						NEEDED_TIME: 500,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							var func = function () {
								self.counter++;
							};
							self.div.timers ().Timer (dict ({'func': self.func, 'millis': 0})).do (func);
						});},
						get end () {return __get__ (this, function (self) {
						});}
					});
					$.fn.timers.TESTS.append (TestZeroMillis);
					var TestDOMRemoval = __class__ ('TestDOMRemoval', [TestBase], {
						NEEDED_TIME: 500,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							var func = function () {
								self.counter++;
							};
							self.div.timers ().Timer (dict ({'millis': 200})).do (func);
							self.div.remove ();
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 0);
						});}
					});
					$.fn.timers.TESTS.append (TestDOMRemoval);
					var TestDebugTimer = __class__ ('TestDebugTimer', [TestBase], {
						NEEDED_TIME: 500,
						get begin () {return __get__ (this, function (self) {
							var func1 = function () {
								// pass;
							};
							self.div.timers ().Timer (dict ({'millis': 200, 'name': 'test1'})).do (func1);
							var func2 = function () {
								// pass;
							};
							self.div.timers ().Timer (dict ({'millis': 300, 'name': 'test2'})).do (func2);
							self.div.timers ('debug');
						});},
						get end () {return __get__ (this, function (self) {
							// pass;
						});}
					});
					$.fn.timers.TESTS.append (TestDebugTimer);
					var TestCancelTimer = __class__ ('TestCancelTimer', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							var func = function () {
								self.counter++;
								self.div.timers ('cancel');
							};
							self.div.timers ().SleepTimer (dict ({'millis': 200, 'name': 'test1'})).do (func);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 1);
						});}
					});
					$.fn.timers.TESTS.append (TestCancelTimer);
					var TestExceptionInTimer = __class__ ('TestExceptionInTimer', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							self.then_counter = 0;
							self.fail_counter = 0;
							var func = function () {
								self.counter++;
								var __except0__ = Error ('intentional');
								__except0__.__cause__ = null;
								throw __except0__;
							};
							var then = function () {
								self.then_counter++;
							};
							var fail = function () {
								self.fail_counter++;
							};
							self.div.timers ().Timer (dict ({'millis': 200, 'name': 'test1'})).do (func).then (then).fail (fail);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 1);
							self.assertTrue (self.then_counter == 0);
							self.assertTrue (self.fail_counter == 1);
						});}
					});
					$.fn.timers.TESTS.append (TestExceptionInTimer);
					var TestNoExceptionInTimer = __class__ ('TestNoExceptionInTimer', [TestBase], {
						NEEDED_TIME: 1000,
						get begin () {return __get__ (this, function (self) {
							self.counter = 0;
							self.then_counter = 0;
							self.fail_counter = 0;
							var func = function () {
								self.counter++;
							};
							var then = function () {
								self.then_counter++;
							};
							var fail = function () {
								self.fail_counter++;
							};
							self.div.timers ().Timer (dict ({'millis': 200, 'name': 'test1'})).do (func).then (then).fail (fail);
						});},
						get end () {return __get__ (this, function (self) {
							self.assertTrue (self.counter == 1);
							self.assertTrue (self.then_counter == 1);
							self.assertTrue (self.fail_counter == 0);
						});}
					});
					$.fn.timers.TESTS.append (TestNoExceptionInTimer);
					__pragma__ ('<use>' +
						'test_base' +
					'</use>')
					__pragma__ ('<all>')
						__all__.TestBase = TestBase;
						__all__.TestCancelTimer = TestCancelTimer;
						__all__.TestDOMRemoval = TestDOMRemoval;
						__all__.TestDebugTimer = TestDebugTimer;
						__all__.TestExceptionInTimer = TestExceptionInTimer;
						__all__.TestNoExceptionInTimer = TestNoExceptionInTimer;
						__all__.TestZeroMillis = TestZeroMillis;
					__pragma__ ('</all>')
				}
			}
		}
	);
