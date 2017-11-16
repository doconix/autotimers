	__nest__ (
		__all__,
		'test_shortcut', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TestBase = __init__ (__world__.test_base).TestBase;
					var TestSetTimer = __class__ ('TestSetTimer', [TestBase], {
						NEEDED_TIME: 500,
						get begin () {return __get__ (this, function (self) {
							var func = function () {
								self.assertTrue (bool (self.div.data ('_jquery_timers_') ['test1']));
							};
							self.div.autotimer ().Timer (dict ({'millis': 200, 'name': 'test1'})).do (func);
						});},
						get end () {return __get__ (this, function (self) {
							// pass;
						});}
					});
					document.TESTS.append (TestSetTimer);
					var TestRemoveTimer = __class__ ('TestRemoveTimer', [TestBase], {
						NEEDED_TIME: 500,
						get begin () {return __get__ (this, function (self) {
							var func1 = function (timer) {
								timer.cancel ();
							};
							self.div.autotimer ().Timer (dict ({'millis': 200, 'name': 'test1'})).do (func1);
							var func2 = function () {
								self.assertTrue (!(self.div.data ('_jquery_timers_') ['test1']));
								self.assertTrue (self.div.data ('_jquery_timers_') ['test2']);
							};
							self.div.autotimer ().Timer (dict ({'millis': 300, 'name': 'test2'})).do (func2);
						});},
						get end () {return __get__ (this, function (self) {
							// pass;
						});}
					});
					document.TESTS.append (TestRemoveTimer);
					__pragma__ ('<use>' +
						'test_base' +
					'</use>')
					__pragma__ ('<all>')
						__all__.TestBase = TestBase;
						__all__.TestRemoveTimer = TestRemoveTimer;
						__all__.TestSetTimer = TestSetTimer;
					__pragma__ ('</all>')
				}
			}
		}
	);
