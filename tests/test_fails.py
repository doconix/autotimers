from test_base import TestBase

 
class TestZeroMillis(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
        Timers.Timer(self.div, {
            'millis': 0
        }).do(func)

    def end(self):
        # with no millis, it should not trigger
        assert self.counter == 0

document.TESTS.append(TestZeroMillis)


class TestDOMRemoval(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        self.counter = 0
        def func(timer):
            self.counter += 1
            console.log("DOM DOM DOM")
            console.log(timer)
        Timers.Timer(self.div, {
            'millis': 200,
        }).do(func)
        self.div.remove()

    def end(self):
        # with elem out of the document, it should not trigger
        self.assertTrue(self.counter == 0)

document.TESTS.append(TestDOMRemoval)




class TestCancelTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
            self.div.autotimer('cancel')
        Timers.SleepTimer(self.div, {
            'millis': 200,
            'name': 'test1',
        }).do(func)

    def end(self):
        self.assertTrue(self.counter == 1)

document.TESTS.append(TestCancelTimer)


class TestExceptionInTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.then_counter = 0
        self.cach_counter = 0
        def func():
            self.counter += 1
            raise Error('intentional')
        def then():
            self.then_counter += 1
        def fail():
            self.cach_counter += 1
        Timers.Timer(self.div, {
            'millis': 200,
            'name': 'test1',
        }).do(func).then(then).catch(fail)

    def end(self):
        self.assertTrue(self.counter == 1)
        self.assertTrue(self.then_counter == 0)
        self.assertTrue(self.cach_counter == 1)

document.TESTS.append(TestExceptionInTimer)


class TestNoExceptionInTimer(TestBase):
    NEEDED_TIME = 1000

    def begin(self):
        self.counter = 0
        self.then_counter = 0
        self.cach_counter = 0
        def func():
            self.counter += 1
        def then():
            self.then_counter += 1
        def fail():
            self.cach_counter += 1
        Timers.Timer(self.div, {
            'millis': 200,
            'name': 'test1',
        }).do(func).then(then).catch(fail)

    def end(self):
        self.assertTrue(self.counter == 1)
        self.assertTrue(self.then_counter == 1)
        self.assertTrue(self.cach_counter == 0)

document.TESTS.append(TestNoExceptionInTimer)


