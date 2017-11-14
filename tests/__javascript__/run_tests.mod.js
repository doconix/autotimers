	(function () {
		var test_fails = {};
		var test_interval = {};
		var test_once = {};
		var test_shortcut = {};
		var test_sleep = {};
		var S = jQuery;
		S.fn.timers.TESTS = list ([]);
		__nest__ (test_shortcut, '', __init__ (__world__.test_shortcut));
		__nest__ (test_once, '', __init__ (__world__.test_once));
		__nest__ (test_fails, '', __init__ (__world__.test_fails));
		__nest__ (test_sleep, '', __init__ (__world__.test_sleep));
		__nest__ (test_interval, '', __init__ (__world__.test_interval));
		var test_log = list ([]);
		var nextTest = function () {
			if (len (test_log) == len (S.fn.timers.TESTS)) {
				console.log ('{} tests completed'.format (len (test_log)));
				return ;
			}
			var klass = S.fn.timers.TESTS [len (test_log)];
			console.log (klass.__name__);
			var t = klass ();
			t.setUp ();
			var then = function () {
				t.tearDown ();
				test_log.push ('success');
				nextTest ();
			};
			var reject = function (err) {
				console.error (err);
				test_log.push (err);
				nextTest ();
			};
			t.promise_start ().then (then, reject);
		};
		console.log ('Starting {} unit tests'.format (len (S.fn.timers.TESTS)));
		S (nextTest);
		__pragma__ ('<use>' +
			'test_fails' +
			'test_interval' +
			'test_once' +
			'test_shortcut' +
			'test_sleep' +
		'</use>')
		__pragma__ ('<all>')
			__all__.S = S;
			__all__.nextTest = nextTest;
			__all__.test_log = test_log;
		__pragma__ ('</all>')
	}) ();
