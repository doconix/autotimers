from timer_base import BaseTimer
S = jQuery


class SleepTimer(BaseTimer):
    '''A repeating timer that ensures a specific amount of time between runs'''
    def _startTimer(self):
        '''Helper function for start().  Call window.setTimeout and return the id'''
        return window.setTimeout(self._notifyObservers, self.millis)


class SleepAfterTimer(SleepTimer):
    '''This timer immediately calls the timer function, then starts the sleep/function cycle.'''
    def start(self):
        if self.run_index == 0:
            return self._notifyObservers()
        return super().start()


    

