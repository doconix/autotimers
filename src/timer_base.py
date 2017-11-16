from storage import get_timers, set_timer, remove_timer
from promise import TimerPromise


class BaseTimer(object):
    '''The base timer class.'''
    def __init__(self, elem, options):
        self.elem = elem
        self.millis = options['millis']
        self.maxRuns = options['maxRuns']
        self.tname = options['name']
        
        # timer state
        self.timer_id = None
        self.timer_start = None  # IntervalTimer needs this to be initially None
        self.run_index = 0
        self.cancelled = False
        
        # remove any existing, and place this timer on element
        for other_timer in get_timers(self.elem, self.tname):
            if other_timer is not self:
                other_timer.cancel()
        set_timer(self.elem, self.tname, self)
        
        # start the timer
        self.promise = TimerPromise(self._renewTimer)
        
        
    def cancel(self):
        '''Cancels the timer - triggers .then()'''
        self.cancelled = True
        self._cleanup()
        self.promise.resolve.apply(self.elem, [ self ])
        
        
    ############################################
    ###  Private methods
    
    def _renewTimer(self):
        console.log(11)
        if not self._shouldRunAgain():
            console.log(22)  
            self._cleanup()
            self.promise.resolve.apply(self.elem, [ self ])
        else:
            console.log(33)
            self.timer_start = __new__(Date()).getTime()
            self.timer_id = window.setTimeout(self._onTimeout, self._nextMillis())
            

    def _nextMillis(self):
        return self.millis  # subclasses like IntervalTimer adjust this

        
    def _onTimeout(self):
        if not self._shouldRunAgain():
            self._cleanup()
            self.promise.resolve.apply(self.elem, [ self ])
        else:
            self.run_index += 1
            try:
                self.palarm(self.elem, [ self ])
            except Error as err:
                self._cleanup()
                if not self.promise.pending:
                    raise err  # resolve or reject already ran, so just raise normally
                self.promise.reject.apply(self.elem, [ self, err ])
                return
            self._doAlarm()


    def _shouldRunAgain(self):
        # 1) in dom, 2) not cancelled, 3) valid millis, 4) less than max runs, 5) deferred is still pending
        return \
            (self.elem is not None and (document == self.elem or document.contains(self.elem))) and \
            (not self.cancelled) and \
            (self.millis >= 0) and \
            (self.maxRuns <= 0 or self.run_index < self.maxRuns) and \
            (self.deferred.state() == 'pending')
            

    def _cleanup(self):
        remove_timer(self.elem, self.tname)
        window.clearTimeout(self.timer_id)
        self.timer_id = None
            