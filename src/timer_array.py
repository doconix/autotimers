

class TimerArray(object):
    '''
    An array of timers - used when an array is sent into the timer library.
    This makes it easy to use something like jQuery with the library.
    '''
    def __init__(self, timers):
        self.timers = timers
        
    #####################################################################
    ###  Methods to make this object look like a regular timer.
    
    def cancel(self):
        for timer in self.timers:
            timer.cancel()
        return self

    def do(self, onAlarm):
        for timer in self.timers:
            timer.do(onAlarm)
        return self

    def catch(self, onError):
        for timer in self.timers:
            timer.catch(onError)
        return self

    def then(self, onFinish):
        for timer in self.timers:
            timer.then(onFinish)
        return self


            
