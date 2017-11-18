	(function () {
		var main = function () {
			var func = function () {
				console.log ('timer do!');
			};
			var t = Timers.SleepTimer (jQuery ('div'), dict ({'millis': 1000, 'maxRuns': 2})).do (func);
			console.log (t);
		};
		document.addEventListener ('DOMContentLoaded', main);
		__pragma__ ('<all>')
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
