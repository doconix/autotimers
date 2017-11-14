# Author: Conan C. Albrecht <doconix@gmail.com>
# Version: 2.0.6
# License: MIT
#
# See the readme.md file for docs.
#

   
DEFAULT_OPTIONS = {
    # timer duration in milliseconds
    'millis': 1000,

    # maximum number of timer callbacks (< 1 is infinite runs)
    'max_runs': 0,

    # name of this timer (only one timer of a given name can exist
    # on a given element at a time).
    'name': 'default',    
}

# we don't need to be in an anonymous function because Transcrypt already places
# everything in this file inside one - we're already in a local scope.
S = jQuery

from storage import get_timers

############################################
###  Main plugin entry point

def timers(options, tname):
    '''Main plugin function'''
    elems = this
    
    # shortcuts
    if options == 'cancel':
        for e in elems:
            for timer in get_timers(S(e), tname):
                timer.cancel()
        return elems
        
    elif options == 'list':
        timers = []
        for e in elems:
            timers.extend(get_timers(S(e), tname))
        return timers
        
    # if we get here, the user is hitting the secondary namespace
    return SecondaryNamespace(elems)
        
        
# attach plugin fnction to jQuery prototype
# only one function so not using extend()
S.fn.timers = timers
S.fn.timers.defaults = DEFAULT_OPTIONS
S.fn.timers.VERSION = "2.0.6"





####################################################################
###  A secondary namespace that allows us to have multiple functions
###  under a single name (see jQuery namespace pattern), e.g.:
###
###      $('#div1').timers().Timer({...})
###      $('#div2').timers().SleepTimer({...})

import timer_once, timer_sleep, timer_interval


class SecondaryNamespace(object):
    '''
    Factory that creates timer classes.  To have a secondary namespace,
    we have to hold the `this` variable from the primary call.  We
    create this object when .timers() is called, which holds `elems`
    for the secondary call (one of the methods below).
    '''
    def __init__(self, elems):
        self.elems = elems
        
    def _create_timer(self, klass, options):
        # shortcuts
        if S.isNumeric(options):
            options = { 'millis': options }
        
        # options
        combined = {}
        combined.update(S.fn.timers.defaults)
        if options is not None:
            combined.update(options)
            
        # set timer on each element in the jquery array
        deferred = S.Deferred()
        for e in self.elems:
            klass(e, combined, deferred)
        p = deferred.promise()
        p.do = p.progress  # alias because "do" is a more appropriate name, but we still are able to take advantage of built-in functionality
        return p
        
    def Timer(self, options):
        return self._create_timer(timer_once.OnceTimer, options)
        
    def SleepTimer(self, options):
        return self._create_timer(timer_sleep.SleepTimer, options)

    def SleepAfterTimer(self, options):
        return self._create_timer(timer_sleep.SleepAfterTimer, options)

    def IntervalTimer(self, options):
        return self._create_timer(timer_interval.IntervalTimer, options)

    def IntervalAfterTimer(self, options):
        return self._create_timer(timer_interval.IntervalAfterTimer, options)





