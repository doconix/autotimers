from test_base import TestBase

# I really need to make func() take a long time so I can ensure sleep instead of interval
    
class TestSleep(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        Timers.SleepTimer(self.div, {
            'millis': 400,
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 2)
        
document.TESTS.append(TestSleep)
    
    

class TestSleepAfter(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        Timers.SleepAfterTimer(self.div, {
            'millis': 400,
        }).do(func)
        
    def end(self):
        # immediate run, plus two after timer runs
        self.assertTrue(self.counter == 3)
        
document.TESTS.append(TestSleepAfter)
    
    
    
