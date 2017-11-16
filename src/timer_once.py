from timer_base import BaseTimer


class OnceTimer(BaseTimer):
    def __init__(self, elem, options, deferred):
        options['maxRuns'] = 1  # force one time
        super().__init__(elem, options, deferred)



