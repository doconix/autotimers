__pragma__('alias', 'S', '$')
from test_base import TestBase

 
class TestZeroMillis(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
        self.div.timers().Timer({
            'func': self.func,
            'millis': 0
        }).do(func)

    def end(self):
        # with no func, it should not trigger
        assert self.counter == 0

S.fn.timers.TESTS.append(TestZeroMillis)


class TestDOMRemoval(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
        self.div.timers().Timer({
            'millis': 200,
        }).do(func)
        self.div.remove()

    def end(self):
        # with no func, it should not trigger
        self.assertTrue(self.counter == 0)

S.fn.timers.TESTS.append(TestDOMRemoval)


class TestDebugTimer(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        def func1():
           pass
        self.div.timers().Timer({
            'millis': 200,
            'name': 'test1',
        }).do(func1)
        def func2():
            pass
        self.div.timers().Timer({
            'millis': 300,
            'name': 'test2',
        }).do(func2)
        self.div.timers('debug')

    def end(self):
        pass

S.fn.timers.TESTS.append(TestDebugTimer)


class TestCancelTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
            self.div.timers('cancel')
        self.div.timers().SleepTimer({
            'millis': 200,
            'name': 'test1',
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        
S.fn.timers.TESTS.append(TestCancelTimer)


class TestExceptionInTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.then_counter = 0
        self.fail_counter = 0
        def func():
            self.counter += 1
            raise Error('intentional')
        def then():
            self.then_counter += 1
        def fail():
            self.fail_counter += 1
        self.div.timers().Timer({
            'millis': 200,
            'name': 'test1',
        }).do(func).then(then).fail(fail)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        self.assertTrue(self.then_counter == 0)
        self.assertTrue(self.fail_counter == 1)
        
S.fn.timers.TESTS.append(TestExceptionInTimer)


class TestNoExceptionInTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.then_counter = 0
        self.fail_counter = 0
        def func():
            self.counter += 1
        def then():
            self.then_counter += 1
        def fail():
            self.fail_counter += 1
        self.div.timers().Timer({
            'millis': 200,
            'name': 'test1',
        }).do(func).then(then).fail(fail)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        self.assertTrue(self.then_counter == 1)
        self.assertTrue(self.fail_counter == 0)
        
S.fn.timers.TESTS.append(TestNoExceptionInTimer)


