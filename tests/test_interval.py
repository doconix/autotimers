from test_base import TestBase

# I really need to make func() take a long time so I can ensure interval instead of sleep
    
class TestInterval(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        Timers.IntervalTimer(self.div, {
            'millis': 400,
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 2)
        
document.TESTS.append(TestInterval)
    
    

class TestIntervalAfter(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.start_time = __new__(Date())
        def func():
            self.counter += 1
        Timers.IntervalAfterTimer(self.div, {
            'millis': 400,
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 3)
        
document.TESTS.append(TestIntervalAfter)
    
    

    
    
    