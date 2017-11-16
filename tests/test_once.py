from test_base import TestBase

    
class TestTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.then_counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        def then():
            self.then_counter += 1
        self.div.autotimer().Timer({
            'millis': 500,
        }).do(func).then(then)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        self.assertTrue(self.then_counter == 1)
        
document.TESTS.append(TestTimer)
    
    
    
class TestNamedTimers(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
        self.div.autotimer().Timer({
            'millis': 400,
            'name': 'first',
        }).do(func)
        self.div.autotimer().Timer({
            'millis': 600,
            'name': 'second',
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 2)
        
document.TESTS.append(TestNamedTimers)
    
    
    
class TestSameNamedTimers(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
        self.div.autotimer().Timer({
            'millis': 400,
            'name': 'same',
        }).do(func)
        # this second one should override the first
        self.div.autotimer().Timer({
            'millis': 600,
            'name': 'same',
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        
document.TESTS.append(TestSameNamedTimers)


