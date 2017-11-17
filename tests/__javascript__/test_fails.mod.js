	(function () {
		var TestBase = __init__ (__world__.test_base).TestBase;
		var TestZeroMillis = __class__ ('TestZeroMillis', [TestBase], {
			NEEDED_TIME: 500,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
				};
				Timers.Timer (self.div, dict ({'millis': 0})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
			});}
		});
		document.TESTS.append (TestZeroMillis);
		var TestDOMRemoval = __class__ ('TestDOMRemoval', [TestBase], {
			NEEDED_TIME: 500,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function (timer) {
					self.counter++;
					console.log ('DOM DOM DOM');
					console.log (timer);
				};
				Timers.Timer (self.div, dict ({'millis': 200})).do (func);
				self.div.remove ();
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 0);
			});}
		});
		document.TESTS.append (TestDOMRemoval);
		var TestCancelTimer = __class__ ('TestCancelTimer', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
					self.div.autotimer ('cancel');
				};
				Timers.SleepTimer (self.div, dict ({'millis': 200, 'name': 'test1'})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
			});}
		});
		document.TESTS.append (TestCancelTimer);
		var TestExceptionInTimer = __class__ ('TestExceptionInTimer', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.then_counter = 0;
				self.cach_counter = 0;
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
					self.cach_counter++;
				};
				Timers.Timer (self.div, dict ({'millis': 200, 'name': 'test1'})).do (func).then (then).catch (fail);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
				self.assertTrue (self.then_counter == 0);
				self.assertTrue (self.cach_counter == 1);
			});}
		});
		document.TESTS.append (TestExceptionInTimer);
		var TestNoExceptionInTimer = __class__ ('TestNoExceptionInTimer', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.then_counter = 0;
				self.cach_counter = 0;
				var func = function () {
					self.counter++;
				};
				var then = function () {
					self.then_counter++;
				};
				var fail = function () {
					self.cach_counter++;
				};
				Timers.Timer (self.div, dict ({'millis': 200, 'name': 'test1'})).do (func).then (then).catch (fail);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
				self.assertTrue (self.then_counter == 1);
				self.assertTrue (self.cach_counter == 0);
			});}
		});
		document.TESTS.append (TestNoExceptionInTimer);
		__pragma__ ('<use>' +
			'test_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.TestBase = TestBase;
			__all__.TestCancelTimer = TestCancelTimer;
			__all__.TestDOMRemoval = TestDOMRemoval;
			__all__.TestExceptionInTimer = TestExceptionInTimer;
			__all__.TestNoExceptionInTimer = TestNoExceptionInTimer;
			__all__.TestZeroMillis = TestZeroMillis;
		__pragma__ ('</all>')
	}) ();
