	(function () {
		var main = function () {
			var elem = document.querySelector ('#div1');
			var func = function () {
				console.log ('timer do!');
				var __except0__ = new Error ('asdf');
				__except0__.__cause__ = null;
				throw __except0__;
			};
			var then = function () {
				console.log ('then!');
			};
			var err = function (timer, error) {
				console.log ('error');
				console.log (error);
			};
			Timers.SleepTimer (elem, dict ({'millis': 1000, 'maxRuns': 2})).do (func).then (then).catch (err);
		};
		document.addEventListener ('DOMContentLoaded', main);
		__pragma__ ('<all>')
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
