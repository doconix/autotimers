	(function () {
		var amd_test = function (Timers) {
			console.log ('Starting timer...');
			var func = function () {
				console.log ('timer do!');
			};
			Timers.SleepTimer (document.getElementById ('#div1'), dict ({'millis': 1000, 'maxRuns': 2})).do (func);
		};
		var main = function () {
			requirejs (list (['../../src/__javascript__/main.js']), amd_test);
		};
		document.addEventListener ('DOMContentLoaded', main);
		__pragma__ ('<all>')
			__all__.amd_test = amd_test;
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
