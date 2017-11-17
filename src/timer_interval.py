from timer_base import BaseTimer

class IntervalTimer(BaseTimer):
    def _nextMillis(self):
        if self.timerStart is None:
            return self.millis
        else:
            return max(0, self.millis - (__new__(Date()).getTime() - self.timerStart))


class IntervalAfterTimer(IntervalTimer):
    def _renewTimer(self):
        '''Trigger the alarm immediately, then starts the sleep/function cycle.'''
        if self.runIndex == 0:
            return self._onTimeout()
        return super()._renewTimer()


    
