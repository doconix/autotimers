# Author: Conan C. Albrecht <doconix@gmail.com>
# Version: 2.0.9
# License: MIT
from storage import get_timers
import timer_concrete, timer_array


############################################
###  Main module

class Timers(object):
    def __init__(self):
        self.defaults = {
            # the element to attach to (can be an array, even jQuery array)
            'elem': document,
            
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
        if not elem:
            elem = document
        for timer in get_timers(elem, tname):
            timer.cancel()
        

    def timers(self, elem, tname):
        '''Returns an array of timers on the given element, optionally filtered by name'''
        if not elem:
            elem = document
        return get_timers(elem, tname)
        
    
    def Timer(self, *args):
        '''Starts a one-time timer'''
        return self._create(timer_concrete.OnceTimer, args)
        

    def SleepTimer(self, *args):
        '''
        Starts a repeating timer with an exact time between the 
        end of previous run and start of next run.
        '''
        return self._create(timer_concrete.SleepTimer, args)


    def SleepAfterTimer(self, *args):
        '''
        Runs the do() function, then starts a repeating timer with 
        an exact time between the end of previous run and start of next run.
        '''
        return self._create(timer_concrete.SleepAfterTimer, args)


    def IntervalTimer(self, *args):
        '''
        Starts a repeating timer with an exact time between the
        start of previous run and start of next run.
        '''
        return self._create(timer_concrete.IntervalTimer, args)


    def IntervalAfterTimer(self, *args):
        '''
        Runs the do() function, then starts a repeating timer with 
        an exact time between the start of previous run and start of next run.
        '''
        return self._create(timer_concrete.IntervalAfterTimer, args)


    def _create(self, timer_class, args):
        # since args are all different types, any order is fine
        combined = {}
        combined.update(self.defaults)    # set up defaults
        for arg in args:
            # undefined or null?
            if not arg:                   
                pass
                
            # millis?
            elif typeof(arg) == 'number': 
                combined['millis'] = arg
                
            # element?
            elif arg['nodeType']:         
                combined['elem'] = arg
                
            # array-like? (including jQuery)
            elif arg.length and arg[0] and arg[0]['nodeType']:    
                timers = []
                for elem in arg:
                    newargs = [ a for a in args if a is not arg ]
                    newargs.append(elem)
                    timers.append(self._create(timer_class, newargs))
                return timer_array.TimerArray(timers)
                                
            # must be options object
            else:                         
                combined.update(arg)
                
        # create and return the timer
        return timer_class(combined)
        
        
# our singleton instance of the object
timers_instance = Timers()




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
    module.exports = timers_instance
    
elif in_browser():
    window['Timers'] = timers_instance


    