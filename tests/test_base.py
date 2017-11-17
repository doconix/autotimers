
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
        e = document.getElementById('#' + elem_id)
        if e:
            e.remove()
        e = document.createElement(elem_tag)
        e.id = elem_id
        document.body.appendChild(e)
        return e
    
    def startTest(self):
        self.div = self.make('test1')
        try:
            self.begin()
        except Error as err:
            console.error(err)
        
    def endTest(self):
        try:
            self.end()
        except Error as err:
            console.error(err)
        self.div.remove()  

    def begin(self):
        raise Error('Subclass needs to implement begin()')
    
    def end(self):
        raise Error('Subclass needs to implement end()')
    
    
    ## Tests ##
    
    def assertTrue(self, cond, msg='assertTrue condition was false'):
        if not cond:
            raise Error(msg)