	__nest__ (
		__all__,
		'test_base', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var TestBase = __class__ ('TestBase', [object], {
						NEEDED_TIME: 3000,
						get make () {return __get__ (this, function (self, elem_id, elem_tag) {
							if (typeof elem_tag == 'undefined' || (elem_tag != null && elem_tag .hasOwnProperty ("__kwargtrans__"))) {;
								var elem_tag = 'div';
							};
							var e = document.getElementById ('#' + elem_id);
							if (e) {
								e.remove ();
							}
							var e = document.createElement (elem_tag);
							e.id = elem_id;
							document.body.appendChild (e);
							return e;
						});},
						get startTest () {return __get__ (this, function (self) {
							self.div = self.make ('test1');
							try {
								self.begin ();
							}
							catch (__except0__) {
								if (isinstance (__except0__, Error)) {
									var err = __except0__;
									console.error (err);
								}
								else {
									throw __except0__;
								}
							}
						});},
						get endTest () {return __get__ (this, function (self) {
							try {
								self.end ();
							}
							catch (__except0__) {
								if (isinstance (__except0__, Error)) {
									var err = __except0__;
									console.error (err);
								}
								else {
									throw __except0__;
								}
							}
							self.div.remove ();
						});},
						get begin () {return __get__ (this, function (self) {
							var __except0__ = Error ('Subclass needs to implement begin()');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get end () {return __get__ (this, function (self) {
							var __except0__ = Error ('Subclass needs to implement end()');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get assertTrue () {return __get__ (this, function (self, cond, msg) {
							if (typeof msg == 'undefined' || (msg != null && msg .hasOwnProperty ("__kwargtrans__"))) {;
								var msg = 'assertTrue condition was false';
							};
							if (!(cond)) {
								var __except0__ = Error (msg);
								__except0__.__cause__ = null;
								throw __except0__;
							}
						});}
					});
					__pragma__ ('<all>')
						__all__.TestBase = TestBase;
					__pragma__ ('</all>')
				}
			}
		}
	);
