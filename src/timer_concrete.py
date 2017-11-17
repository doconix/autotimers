from timer_base import BaseTimer


class OnceTimer(BaseTimer):
    def __init__(self, options):
        options['maxRuns'] = 1  # force one time
        super().__init__(options)



class SleepTimer(BaseTimer):
    '''
    Timer that runs at exact intervals from previous END to next start.
    In other words, an exact amount of time *between* runs.
    '''
    pass  # no changes needed from Base Timer
    

class SleepAfterTimer(SleepTimer):
    '''
    Timer that runs (nearly) immediately, then at at exact intervals from previous END to next start.
    In other words, an exact amount of time *between* runs.
    '''
    def _nextMillis(self):
        '''Trigger the alarm now, then starts the sleep/function cycle.'''
        if self.runIndex == 0:
            return 100
        return super()._nextMillis()


class IntervalTimer(BaseTimer):
    '''
    Timer that runs at exact intervals from previous START to next start.
    '''
    def _nextMillis(self):
        if self.timerStart is None:
            return self.millis
        else:
            return max(0, self.millis - (__new__(Date()).getTime() - self.timerStart))


class IntervalAfterTimer(IntervalTimer):
    '''
    Timer that runs (nearly) immediately, then at at exact intervals from previous START to next start.
    '''
    def _nextMillis(self):
        '''Trigger the alarm now, then starts the sleep/function cycle.'''
        if self.runIndex == 0:
            return 100
        return super()._nextMillis()

    
    