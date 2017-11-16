from timer_base import BaseTimer

class IntervalTimer(BaseTimer):
    def _nextMillis(self):
        if self.timer_start is None:
            return self.millis
        else:
            return max(0, self.millis - (__new__(Date()).getTime() - self.timer_start))


class IntervalAfterTimer(IntervalTimer):
    def _renewTimer(self):
        '''Trigger the alarm immediately, then starts the sleep/function cycle.'''
        if self.run_index == 0:
            return self._onTimeout()
        return super()._renewTimer()


    
