from timer_base import BaseTimer
S = jQuery


class OnceTimer(BaseTimer):
    def __init__(self, elem, options, deferred):
        options['max_runs'] = 1  # force one time
        super().__init__(elem, options, deferred)

    def _startTimer(self):
        '''Helper function for start().  Call window.setTimeout and return the id'''
        return window.setTimeout(self._notifyObservers, self.millis)
        


