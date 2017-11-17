	(function () {
		var test_fails = {};
		var test_interval = {};
		var test_once = {};
		var test_shortcut = {};
		var test_sleep = {};
		document.TESTS = list ([]);
		__nest__ (test_shortcut, '', __init__ (__world__.test_shortcut));
		__nest__ (test_once, '', __init__ (__world__.test_once));
		__nest__ (test_fails, '', __init__ (__world__.test_fails));
		__nest__ (test_sleep, '', __init__ (__world__.test_sleep));
		__nest__ (test_interval, '', __init__ (__world__.test_interval));
		var test_counter = 0;
		var nextTest = function () {
			if (test_counter == len (document.TESTS)) {
				console.log ('{} tests completed'.format (test_counter));
				return ;
			}
			var klass = document.TESTS [test_counter];
			console.log (klass.__name__);
			var t = klass ();
			var endTest = function () {
				t.endTest ();
				nextTest ();
			};
			window.setTimeout (endTest, t.NEEDED_TIME);
			t.startTest ();
			test_counter++;
		};
		console.log ('Starting {} unit tests'.format (len (document.TESTS)));
		document.addEventListener ('DOMContentLoaded', nextTest);
		__pragma__ ('<use>' +
			'test_fails' +
			'test_interval' +
			'test_once' +
			'test_shortcut' +
			'test_sleep' +
		'</use>')
		__pragma__ ('<all>')
			__all__.nextTest = nextTest;
			__all__.test_counter = test_counter;
		__pragma__ ('</all>')
	}) ();
