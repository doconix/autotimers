	(function () {
		var main = function () {
			var elem = document.querySelector ('#div1');
			var func = function () {
				console.log ('timer!');
			};
			console.log (elem);
			Timers.Timer (elem, 1000).do (func);
		};
		document.addEventListener ('DOMContentLoaded', main);
		__pragma__ ('<all>')
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
