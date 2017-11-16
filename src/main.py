# Author: Conan C. Albrecht <doconix@gmail.com>
# Version: 2.0.9
# License: MIT
from storage import get_timers
import timer_once, timer_sleep, timer_interval


############################################
###  Main module

class Timers(object):
    def __init__(self):
        self.defaults = {
            # timer duration in milliseconds
            'millis': 1000,

            # maximum number of timer callbacks (< 1 is infinite runs)
            'maxRuns': 0,

            # name of this timer (only one timer of a given name can exist
            # on a given element at a time).
            'name': 'default',    
        }
        
        
    def cancel(self, elem, tname):
        '''Cancels the timers on the given element, optionally filtered by name'''
        for timer in get_timers(elem, tname):
            timer.cancel()
        

    def timers(self, elem, tname):
        '''Returns an array of timers on the given element, optionally filtered by name'''
        return get_timers(elem, tname)
        
    
    def Timer(self, elem, options):
        '''Starts a one-time timer'''
        return self._create(timer_once.OnceTimer, elem, options)
        

    def SleepTimer(self, elem, options):
        '''
        Starts a repeating timer with an exact time between the 
        end of previous run and start of next run.
        '''
        return self._create(timer_sleep.SleepTimer, elem, options)


    def SleepAfterTimer(self, elem, options):
        '''
        Runs the do() function, then starts a repeating timer with 
        an exact time between the end of previous run and start of next run.
        '''
        return self._create(timer_sleep.SleepAfterTimer, elem, options)


    def IntervalTimer(self, elem, options):
        '''
        Starts a repeating timer with an exact time between the
        start of previous run and start of next run.
        '''
        return self._create(timer_interval.IntervalTimer, elem, options)


    def IntervalAfterTimer(self, elem, options):
        '''
        Runs the do() function, then starts a repeating timer with 
        an exact time between the start of previous run and start of next run.
        '''
        return self._create(timer_interval.IntervalAfterTimer, elem, options)


    def _create(self, timer_class, elem, options):
        # checks
        if not elem:
            console.warn('Timer set on undefined element. Setting on document instead.')
            elem = document
        
        # shortcuts
        if typeof(options) == 'number':
            options = { 'millis': options }
    
        # options
        combined = {}
        combined.update(self.defaults)
        if options is not None:
            combined.update(options)
        
        # set timer on each element in the jquery array
        timer = timer_class(elem, combined)
        return timer.promise
        



######################################################
###  Export the library, depending on the environment

def in_browser():
    '''Returns true if running in a browser environment'''
    return typeof(window) is not 'undefined'
    
def in_commonjs():
    '''Returns true if running in CommonJS with require(), such as node/npm'''
    return typeof(module) is 'object' and module.exports
    
def in_amd():
    '''Returns true if running in Asynchronous module definition environment'''
    return typeof(define) is 'function' and define.amd
    
    
if in_commonjs():
    module.exports = Timers()
    
elif in_browser():
    window['Timers'] = Timers()


    