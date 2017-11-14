__pragma__('alias', 'S', '$')
from test_base import TestBase

# I really need to make func() take a long time so I can ensure sleep instead of interval
    
class TestSleep(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        self.div.timers().SleepTimer({
            'millis': 400,
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 2)
        
S.fn.timers.TESTS.append(TestSleep)
    
    

class TestSleepAfter(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        self.div.timers().SleepAfterTimer({
            'millis': 400,
        }).do(func)
        
    def end(self):
        # immediate run, plus two after timer runs
        self.assertTrue(self.counter == 3)
        
S.fn.timers.TESTS.append(TestSleepAfter)
    
    
    
class TestSleepAfter(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        promise = self.div.timers().SleepAfterTimer({
            'millis': 10000, 
        })
        # wait 400ms to attach the do
        # this is after the first run of func would have happened
        # the timer should still run immediately when .do is added
        def attach():
            promise.do(func)
        window.setTimeout(attach, 400)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        
S.fn.timers.TESTS.append(TestSleepAfter)
    
    
    