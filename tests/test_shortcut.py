from test_base import TestBase

    
class TestSetTimer(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        def func():
            self.assertTrue(bool(self.div.data('_jquery_timers_')['test1']))
        self.div.autotimer().Timer({
            'millis': 200,
            'name': 'test1',
        }).do(func)
        
    def end(self):
        pass
        
document.TESTS.append(TestSetTimer)
    
    
class TestRemoveTimer(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        def func1(timer):
            timer.cancel()
        self.div.autotimer().Timer({
            'millis': 200,
            'name': 'test1',
        }).do(func1)
        def func2():
            self.assertTrue(not self.div.data('_jquery_timers_')['test1'])
            self.assertTrue(self.div.data('_jquery_timers_')['test2'])
        self.div.autotimer().Timer({
            'millis': 300,
            'name': 'test2',
        }).do(func2)
        
    def end(self):
        pass
        
document.TESTS.append(TestRemoveTimer)
    
    
