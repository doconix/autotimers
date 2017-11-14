	(function () {
		var TestBase = __init__ (__world__.test_base).TestBase;
		var S = jQuery;
		var TestTimer = __class__ ('TestTimer', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				self.then_counter = 0;
				self.start_time = new Date ();
				var func = function () {
					self.counter++;
				};
				var then = function () {
					self.then_counter++;
				};
				self.div.timers ().Timer (dict ({'millis': 500})).do (func).then (then);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
				self.assertTrue (self.then_counter == 1);
			});}
		});
		S.fn.timers.TESTS.append (TestTimer);
		var TestNamedTimers = __class__ ('TestNamedTimers', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
				};
				self.div.timers ().Timer (dict ({'millis': 400, 'name': 'first'})).do (func);
				self.div.timers ().Timer (dict ({'millis': 600, 'name': 'second'})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 2);
			});}
		});
		S.fn.timers.TESTS.append (TestNamedTimers);
		var TestSameNamedTimers = __class__ ('TestSameNamedTimers', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
				};
				self.div.timers ().Timer (dict ({'millis': 400, 'name': 'same'})).do (func);
				self.div.timers ().Timer (dict ({'millis': 600, 'name': 'same'})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
			});}
		});
		S.fn.timers.TESTS.append (TestSameNamedTimers);
		__pragma__ ('<use>' +
			'test_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.S = S;
			__all__.TestBase = TestBase;
			__all__.TestNamedTimers = TestNamedTimers;
			__all__.TestSameNamedTimers = TestSameNamedTimers;
			__all__.TestTimer = TestTimer;
		__pragma__ ('</all>')
	}) ();
