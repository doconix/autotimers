	__nest__ (
		__all__,
		'storage', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TIMERS = new WeakMap ();
					var _tstore = function (elem) {
						if (!(TIMERS.has (elem))) {
							TIMERS.set (elem, new Map ());
						}
						return TIMERS.get (elem);
					};
					var remove_timer = function (elem, tname) {
						var tmap = _tstore (elem);
						tmap.delete (tname);
						if (tmap.length == 0) {
							TIMERS.delete (elem);
						}
					};
					var store_timer = function (elem, tname, timer) {
						_tstore (elem).set (tname, timer);
					};
					var get_timers = function (elem, tname) {
						var tlist = list ([]);
						var tmap = _tstore (elem);
						for (var key of tmap.keys ()) {
							if (tname === null || tname === undefined || tname == key) {
								tlist.append (tmap.get (key));
							}
						}
						return tlist;
					};
					var get_timer = function (elem, tname) {
						var timer = _tstore (elem).get (tname);
						return (timer !== undefined ? timer : null);
					};
					__pragma__ ('<all>')
						__all__.TIMERS = TIMERS;
						__all__._tstore = _tstore;
						__all__.get_timer = get_timer;
						__all__.get_timers = get_timers;
						__all__.remove_timer = remove_timer;
						__all__.store_timer = store_timer;
					__pragma__ ('</all>')
				}
			}
		}
	);
