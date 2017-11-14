from storage import get_timers, set_timer, remove_timer
S = jQuery


class BaseTimer(object):

    '''A timer that runs func one time after the given millis.'''
    def __init__(self, elem, options, deferred):
        self.elem = elem
        self.millis = options['millis']
        self.max_runs = options['max_runs']
        self.tname = options['name']
        self.deferred = deferred
        
        # timer state
        self.timer_id = None
        self.timer_start = None  # IntervalTimer needs this to be initially None
        self.run_count = 0
        self.cancelled = False
        
        # remove any existing, and place this timer on element
        for other_timer in get_timers(S(self.elem), self.tname):
            if other_timer is not self:
                other_timer.cancel()
        set_timer(S(self.elem), self.tname, self)
        
        # start the timer
        self.start()
        
        
    def start(self):
        '''Starts the timer running'''
        if not self._shouldRunAgain():
            self._cleanup()
            self.deferred.resolveWith(self.elem, [ self ])
        else:
            self.timer_start = __new__(Date()).getTime()
            self.timer_id = self._startTimer()


    def cancel(self):
        '''Cancels the timer - triggers .then()'''
        self.cancelled = True
        self._cleanup()
        self.deferred.resolveWith(self.elem, [ self ])
        
        
    ############################################
    ###  Private methods

    def _startTimer(self):
        '''Helper function for start().  Call window.setTimeout and return the id'''
        console.warn('Subclass did not implement _startTimer')
        
    def _notifyObservers(self):
        '''Function registered when the timer reaches zero. Triggers the callbacks.'''
        if not self._shouldRunAgain():
            self._cleanup()
            self.deferred.resolveWith(self.elem, [ self ])
        else:
            self.run_count += 1
            try:
                self.deferred.notifyWith(self.elem, [ self ])
            except Error as err:
                self._cleanup()
                if self.deferred.state() != 'pending':
                    raise err  # resolve or reject already ran, so just raise normally
                self.deferred.rejectWith(self.elem, [ self, err ])
                return
            self.start()

    def _shouldRunAgain(self):
        '''Returns whether the timer should run again'''
        # 1) in dom, 2) not cancelled, 3) valid millis, 4) less than max runs, 5) deferred is still pending
        return \
            (self.elem is not None and (document == self.elem or S.contains(document, self.elem))) and \
            (not self.cancelled) and \
            (self.millis >= 0) and \
            (self.max_runs <= 0 or self.run_count < self.max_runs) and \
            (self.deferred.state() == 'pending')
            

    def _cleanup(self):
        remove_timer(S(self.elem), self.tname)
        window.clearTimeout(self.timer_id)
        self.timer_id = None


            
            
            