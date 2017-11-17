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
        Timers.Timer(self.div, {
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
        Timers.Timer(self.div, {
            'millis': 400,
            'name': 'first',
        }).do(func)
        Timers.Timer({
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
        Timers.Timer(self.div, {
            'millis': 400,
            'name': 'same',
        }).do(func)
        # this second one should override the first
        Timers.Timer(self.div, {
            'millis': 600,
            'name': 'same',
        }).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 1)
        
document.TESTS.append(TestSameNamedTimers)


class TestArgs(TestBase):
    NEEDED_TIME = 2000

    def begin(self):
        self.counter = 0
        def func():
            self.counter += 1
        self.timer1 = Timers.Timer({ 'name': 'timer1' }).do(func)
        self.timer2 = Timers.Timer(self.div, { 'name': 'timer2' }).do(func)
        self.timer3 = Timers.Timer(500, { 'name': 'timer3' }).do(func)
        self.timer4 = Timers.Timer(self.div, 500, { 'name': 'timer4' }).do(func)
        self.timer5 = Timers.Timer(500, self.div, { 'name': 'timer5' }).do(func)
        self.timer6 = Timers.Timer({ 'name': 'timer6' }, self.div, 500).do(func)
        self.timer7 = Timers.Timer({ 'name': 'timer7' }, 500, self.div).do(func)
        self.timer8 = Timers.Timer(500, { 'name': 'timer8' }, self.div).do(func)
        self.timer9 = Timers.Timer({ 'name': 'timer9', 'millis': 500 }, 700).do(func)
        
    def end(self):
        self.assertTrue(self.counter == 9)
        self.assertTrue(self.timer1.tname == 'timer1' and self.timer1.millis == 1000 and self.timer1.elem == document)
        self.assertTrue(self.timer2.tname == 'timer2' and self.timer2.millis == 1000 and self.timer2.elem == self.div)
        self.assertTrue(self.timer3.tname == 'timer3' and self.timer3.millis == 500 and self.timer3.elem == document)
        self.assertTrue(self.timer4.tname == 'timer4' and self.timer4.millis == 500 and self.timer4.elem == self.div)
        self.assertTrue(self.timer5.tname == 'timer5' and self.timer5.millis == 500 and self.timer5.elem == self.div)
        self.assertTrue(self.timer6.tname == 'timer6' and self.timer6.millis == 500 and self.timer6.elem == self.div)
        self.assertTrue(self.timer7.tname == 'timer7' and self.timer7.millis == 500 and self.timer7.elem == self.div)
        self.assertTrue(self.timer8.tname == 'timer8' and self.timer8.millis == 500 and self.timer8.elem == self.div)
        self.assertTrue(self.timer9.tname == 'timer9' and self.timer9.millis == 700 and self.timer9.elem == document)
        
document.TESTS.append(TestArgs)
    
    
class TestListTimers(TestBase):
    NEEDED_TIME = 500

    def begin(self):
        Timers.Timer(self.div, {
            'millis': 200,
            'name': 'test1',
        })
        Timers.Timer(self.div, {
            'millis': 300,
            'name': 'test2',
        })
        self.assertTrue(len(Timers.timers(self.div)) == 2)
        self.assertTrue(len(Timers.timers(self.div, 'test2')) == 1)

    def end(self):
        pass

document.TESTS.append(TestListTimers)
    