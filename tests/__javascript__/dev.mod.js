	(function () {
		var main = function () {
			var index = 1;
			var func = function (timer) {
				console.log (this);
				if (__mod__ (index, 5) == 0) {
					$ (this).html ('');
				}
				$ (this).append ('<div>Run #' + index);
				index++;
			};
			$ ('#div1').autotimer ().IntervalTimer (800).do (func);
		};
		$ (main);
		__pragma__ ('<all>')
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
