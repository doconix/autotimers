__pragma__('alias', 'js_finally', 'finally')
from storage import get_timers, set_timer, remove_timer


class BaseTimer(object):
    '''The base timer class.'''
    def __init__(self, elem, options):
        self.elem = elem
        self.millis = options['millis']
        self.maxRuns = options['maxRuns']
        self.tname = options['name']
        
        # timer state
        self.timerId = None
        self.timerStart = None  # IntervalTimer needs this to be initially None
        self.runIndex = 0
        self.finished = False
        
        # remove any existing, and place this timer on element
        for other_timer in get_timers(self.elem, self.tname):
            if other_timer is not self:
                other_timer.cancel()
        set_timer(self.elem, self.tname, self)
        
        # set up the observer lists
        # this is set to None when the timer is finished
        self.observers = {
            'do': [],
            'then': [],
            'catch': [],
        }
        
        # finally, start the timer
        self._renewTimer()
        
        
    def cancel(self):
        '''Cancels the timer - triggers .then()'''
        self._notifyObservers('then', [ self ])
        self._finalizeTimer()
        
        
    ############################################
    ###  Private methods
    
    def _finalizeTimer(self):
        '''Called when the timer is entirely finished'''
        remove_timer(self.elem, self.tname)
        if self.timerId:
            window.clearTimeout(self.timerId)
            self.timerId = None
        self.observers = None
            

    def _renewTimer(self):
        '''Restarts the timer, assuming we can run again'''
        if not self._shouldRunAgain():
            self._notifyObservers('then', [ self ])
            self._finalizeTimer()
        else:
            self.timerStart = __new__(Date()).getTime()
            self.timerId = window.setTimeout(self._onTimeout, self._nextMillis())
        

    def _nextMillis(self):
        return self.millis  # subclasses like IntervalTimer adjust this

        
    def _onTimeout(self):
        '''Triggered when setTimeout is done'''
        if not self._shouldRunAgain():
            self._notifyObservers('then', [ self ])
            self._finalizeTimer()
        else:
            self.runIndex += 1
            try:
                self._notifyObservers('do', [ self ])
            except Error as err:
                if self.observers is None:
                    raise err  # just raise normally becaues finished
                self._notifyObservers('catch', [ self, err ])
                self._finalizeTimer()
                return
            self._renewTimer()  # next run


    def _shouldRunAgain(self):
        # 1) in dom, 2) pending, 3) valid millis, 4) less than max runs
        return \
            (self.elem is not None and (document == self.elem or document.contains(self.elem))) and \
            (self.observers is not None) and \
            (self.millis >= 0) and \
            (self.maxRuns <= 0 or self.runIndex < self.maxRuns)
            

        
    #####################################################################
    ###  Observers - I'm matching the API of A+ promises (somewhat)
    ###  for familiarity in use, but these are observers, not promises.
    ###  A repeating timer function doesn't really match the promise pattern.
    
    def do(self, onAlarm):
        '''Registers an observer to be called each time the timer reaches zero.'''
        return self._registerObserver('do', onAlarm)
        

    def catch(self, onError):
        '''
        Registers an observer to be called when exceptions occur.
        Exceptions cancel the timer.
        '''
        return self._registerObserver('catch', onError)

        
    def then(self, onFinish):
        '''
        Registers an observer to be called when the timer is finished.
        This could be max_timers or by cancel() being called.
        This method is triggered only once.
        '''
        return self._registerObserver('then', onFinish)

        
    def _registerObserver(self, observer_key, callback):
        if self.observers and self.observers[observer_key]:
            self.observers[observer_key].append(callback)
        return self  # allow chaining
            

    def _notifyObservers(self, observer_key, args):
        if self.observers and self.observers[observer_key]:
            for f in self.observers[observer_key]:
                f.apply(self.elem, args)

            

        