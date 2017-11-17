	(function () {
		var TestBase = __init__ (__world__.test_base).TestBase;
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
				Timers.Timer (self.div, dict ({'millis': 500})).do (func).then (then);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
				self.assertTrue (self.then_counter == 1);
			});}
		});
		document.TESTS.append (TestTimer);
		var TestNamedTimers = __class__ ('TestNamedTimers', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
				};
				Timers.Timer (self.div, dict ({'millis': 400, 'name': 'first'})).do (func);
				Timers.Timer (dict ({'millis': 600, 'name': 'second'})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 2);
			});}
		});
		document.TESTS.append (TestNamedTimers);
		var TestSameNamedTimers = __class__ ('TestSameNamedTimers', [TestBase], {
			NEEDED_TIME: 1000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
				};
				Timers.Timer (self.div, dict ({'millis': 400, 'name': 'same'})).do (func);
				Timers.Timer (self.div, dict ({'millis': 600, 'name': 'same'})).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 1);
			});}
		});
		document.TESTS.append (TestSameNamedTimers);
		var TestArgs = __class__ ('TestArgs', [TestBase], {
			NEEDED_TIME: 2000,
			get begin () {return __get__ (this, function (self) {
				self.counter = 0;
				var func = function () {
					self.counter++;
				};
				self.timer1 = Timers.Timer (dict ({'name': 'timer1'})).do (func);
				self.timer2 = Timers.Timer (self.div, dict ({'name': 'timer2'})).do (func);
				self.timer3 = Timers.Timer (500, dict ({'name': 'timer3'})).do (func);
				self.timer4 = Timers.Timer (self.div, 500, dict ({'name': 'timer4'})).do (func);
				self.timer5 = Timers.Timer (500, self.div, dict ({'name': 'timer5'})).do (func);
				self.timer6 = Timers.Timer (dict ({'name': 'timer6'}), self.div, 500).do (func);
				self.timer7 = Timers.Timer (dict ({'name': 'timer7'}), 500, self.div).do (func);
				self.timer8 = Timers.Timer (500, dict ({'name': 'timer8'}), self.div).do (func);
				self.timer9 = Timers.Timer (dict ({'name': 'timer9', 'millis': 500}), 700).do (func);
			});},
			get end () {return __get__ (this, function (self) {
				self.assertTrue (self.counter == 9);
				self.assertTrue (self.timer1.tname == 'timer1' && self.timer1.millis == 1000 && self.timer1.elem == document);
				self.assertTrue (self.timer2.tname == 'timer2' && self.timer2.millis == 1000 && self.timer2.elem == self.div);
				self.assertTrue (self.timer3.tname == 'timer3' && self.timer3.millis == 500 && self.timer3.elem == document);
				self.assertTrue (self.timer4.tname == 'timer4' && self.timer4.millis == 500 && self.timer4.elem == self.div);
				self.assertTrue (self.timer5.tname == 'timer5' && self.timer5.millis == 500 && self.timer5.elem == self.div);
				self.assertTrue (self.timer6.tname == 'timer6' && self.timer6.millis == 500 && self.timer6.elem == self.div);
				self.assertTrue (self.timer7.tname == 'timer7' && self.timer7.millis == 500 && self.timer7.elem == self.div);
				self.assertTrue (self.timer8.tname == 'timer8' && self.timer8.millis == 500 && self.timer8.elem == self.div);
				self.assertTrue (self.timer9.tname == 'timer9' && self.timer9.millis == 700 && self.timer9.elem == document);
			});}
		});
		document.TESTS.append (TestArgs);
		var TestListTimers = __class__ ('TestListTimers', [TestBase], {
			NEEDED_TIME: 500,
			get begin () {return __get__ (this, function (self) {
				Timers.Timer (self.div, dict ({'millis': 200, 'name': 'test1'}));
				Timers.Timer (self.div, dict ({'millis': 300, 'name': 'test2'}));
				self.assertTrue (len (Timers.timers (self.div)) == 2);
				self.assertTrue (len (Timers.timers (self.div, 'test2')) == 1);
			});},
			get end () {return __get__ (this, function (self) {
				// pass;
			});}
		});
		document.TESTS.append (TestListTimers);
		__pragma__ ('<use>' +
			'test_base' +
		'</use>')
		__pragma__ ('<all>')
			__all__.TestArgs = TestArgs;
			__all__.TestBase = TestBase;
			__all__.TestListTimers = TestListTimers;
			__all__.TestNamedTimers = TestNamedTimers;
			__all__.TestSameNamedTimers = TestSameNamedTimers;
			__all__.TestTimer = TestTimer;
		__pragma__ ('</all>')
	}) ();
