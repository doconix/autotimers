	(function () {
		var main = function () {
			var func = function () {
				console.log ('hey world');
			};
			$ ('#div1').timers ().Timer (5000).do (func);
		};
		$ (main);
		__pragma__ ('<all>')
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
