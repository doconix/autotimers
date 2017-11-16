from timer_base import BaseTimer


class SleepTimer(BaseTimer):
    '''A repeating timer that ensures a specific amount of time between runs'''
    pass  # no changes needed from Base Timer
    

class SleepAfterTimer(SleepTimer):
    def _renewTimer(self):
        '''Trigger the alarm immediately, then starts the sleep/function cycle.'''
        if self.run_index == 0:
            return self._onTimeout()
        return super()._renewTimer()



    

