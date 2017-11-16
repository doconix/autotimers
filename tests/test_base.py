
# each test is given 3 seconds to do its work. The process is:
# .begin()
# .func()
# .func()
# ...
# .end() is called exactly 3 seconds after .begin()
#
# call self.resolve() or self.reject() at any time to stop the process.
#
class TestBase(object):
    NEEDED_TIME = 3000  # time from begin() to end()
    
    def make(self, elem_id, elem_tag='div'):
        e = document.createElement(elem_tag)
        e.id = elem_id
        document.body.appendChild(e)
        return e
    
    def setUp(self):
        self.div = self.make('test1')

    def tearDown(self):
        self.div.remove()
        
    def promise_start(self):
        def promise(resolve, reject):
            self.resolve, self.reject = resolve, reject
            self.begin()
            window.setTimeout(self.promise_end, self.NEEDED_TIME)
        return __new__(Promise(promise))
        
    def promise_end(self):
        try:
            self.end()
            self.resolve()
        except Error as err:
            console.error(err)
            self.reject()
        # cancel any timers till running
        self.div.remove()  

    def begin(self):
        raise Error('Subclass needs to implement begin()')
    
    def end(self):
        raise Error('Subclass needs to implement end()')
    
    
    ## Tests ##
    
    def assertTrue(self, cond, msg='assertTrue condition was false'):
        if not cond:
            raise Error(msg)