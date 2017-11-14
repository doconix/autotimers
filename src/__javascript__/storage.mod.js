	__nest__ (
		__all__,
		'storage', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var S = jQuery;
					var DATA_KEY = '_jquery_timers_';
					var _tstore = function (elem) {
						if (!(elem.data (DATA_KEY))) {
							elem.data (DATA_KEY, dict ({}));
						}
						return elem.data (DATA_KEY);
					};
					var get_timers = function (elem, tname) {
						var tlist = list ([]);
						for (var e of elem) {
							var store = _tstore (S (e));
							for (var timer_name of store.py_keys ()) {
								if (tname === null || tname === undefined || tname == timer_name) {
									tlist.push (store [timer_name]);
								}
							}
						}
						return tlist;
					};
					var set_timer = function (elem, tname, timer) {
						for (var e of elem) {
							_tstore (S (e)) [tname] = timer;
						}
					};
					var remove_timer = function (elem, tname) {
						delete _tstore (elem) [tname];
					};
					__pragma__ ('<all>')
						__all__.DATA_KEY = DATA_KEY;
						__all__.S = S;
						__all__._tstore = _tstore;
						__all__.get_timers = get_timers;
						__all__.remove_timer = remove_timer;
						__all__.set_timer = set_timer;
					__pragma__ ('</all>')
				}
			}
		}
	);
