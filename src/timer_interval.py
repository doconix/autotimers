from timer_base import BaseTimer
S = jQuery


class IntervalTimer(BaseTimer):
    def _startTimer(self):
        '''Helper function for start().  Call window.setTimeout and return the id'''
        if self.timer_start is None:
            millis = self.millis
        else:
            millis = max(0, self.millis - (__new__(Date()).getTime() - self.timer_start))
        return window.setTimeout(self._notifyObservers, millis)


class IntervalAfterTimer(IntervalTimer):
    '''This timer immediately calls the timer function, then starts the sleep/function cycle.'''
    def start(self):
        if self.run_index == 0:
            return self._notifyObservers()
        return super().start()


    
