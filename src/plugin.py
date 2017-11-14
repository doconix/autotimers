# Author: Conan C. Albrecht <doconix@gmail.com>
# Version: 2.0.3
# License: MIT
#
# tl;dr:
#
#     Wait four seconds, then run one time:
#         $('#somediv').timers().Timer({ 
#             'millis': 4000 
#         }).do((tmr) => {
#             console.log('one time joe!')
#         })
#     
#     Run immediately, then repeatedly run exactly four seconds after the *end* of the previous run:
#         $('#somediv').timers().SleepAfterTimer({ 'millis': 4000 }).do((tmr) => {
#             console.log('right now, then again and again!')
#         })
#     
#     Wait four seconds, then repeatedly run exactly four seconds after the *start* of the
#     previous run. Stop after five runs:
#         $('#somediv').timers().IntervalTimer({ 
#             'millis': 4000, 
#             'max_runs': 5 
#         }).do((tmr) => {
#             console.log('wait first, then again and again!')
#         })
#     
#     Check every fours seconds for boolean to be true, then stop checking:
#         $('#somediv').timers().SleepAfterTimer({ 
#             'millis': 4000 
#         }).do((tmr) => {
#             if (somebool) {
#                 tmr.cancel()
#             }
#         })
#     
# Description:
#     A jQuery plugin that provides three types of timers (with additional variations):
#
#     Regular Timer: Runs the do() function(s) one time after the given millis.
#     
#         For example, suppose millis is 120 (2 seconds):
#           * After 2 seconds, do() is called.  The timer is finished at that point.
#
#     Sleep and SleepAfter Timers: Repeating timer that ensures an exact time between runs.
#     
#         This is very similar to the normal window.setInterval(), but it ensures
#         an exact amount of time occurs between calls to do().  In other words,
#         a "sleep" time between calls is enforced; the timer is restarted only when
#         do() returns.
#     
#         For example, suppose millis is 120 (2 seconds):
#           * If do() takes 1 seconds, do() will be called again 2 seconds after
#             the end of the previous run (3 seconds after the previous start)
#           * If do() takes 2 seconds, do() will be called again 2 seconds after
#             the end of the previous run (4 seconds after the previous start)
#           * If do() takes 3 seconds, do() will be called again 2 seconds after
#             the end of the previous run (5 seconds after the previous start)
#     
#     Interval and IntervalAfter Timers:
#     
#         Sets a repeating timer that starts at a speific interval,
#         This is very similar to the normal window.setInterval(), but this version
#         does not allow do() to run concurrently with another run of itself.
#     
#         For example, suppose millis is 120 (2 seconds):
#           * If do() takes 1 seconds, do() will be called again 1 second after
#             the end of the previous run.
#           * If do() takes 2 seconds, do() will be called again immediately after
#             the end of the previous run.
#           * If do() takes 3 seconds, do() will be called again immediately after
#             the end of the previous run (no double running like window.setInterval())
#     
#         Note that SleepTimer is often a better option than IntervalTimer because it
#         ensures a set amount of time between runs.
#     
# Usage:
#
#     $('#somediv').timers().Timer(options).do(...)
#     $('#somediv').timers().SleepTimer(options).do(...)
#     $('#somediv').timers().SleepAfterTimer(options).do(...)
#     $('#somediv').timers().IntervalTimer(options).do(...)
#     $('#somediv').timers().IntervalAfterTimer(options).do(...)
#
#     Specfy options as:
#         {
#             # timer duration in milliseconds
#             'millis': 1000,
#
#             # maximum number of timer callbacks (< 1 is infinite runs)
#             'max_runs': 0,
#
#             # name of this timer - (elem + name) is unique and cancels any
#             # previous timer with the same name on the elemnent
#             'name': 'default',
#         }
#
#     Use the promise pattern to specify the callbacks:
#         do() is run each time the timer expires
#         then() is run one time after max_runs is reached or the timer is cancelled
#         fail() is run if an exception is thrown in do() methods
#     The timer object is sole parameter to your callbacks (`this` is also available).
#
#     Shortcut functions:
#         $('#somediv').timers('cancel')          # Cancels all timers on #somediv
#         $('#somediv').timers('cancel', 'name')  # Cancels named timer on #somediv
#         $('#somediv').timers('list')            # Returns the timer objects on #somediv
#    
#     Any of the following will cancel a timer:
#       * If $('#myid').timers('cancel') is called.
#       * If elem is removed from the document (DOM).
#       * If another timer with the same name is placed on elem.
#     
#     Global options:
#     
#         $.fn.timers.defaults.millis = 2000
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
S.fn.timers.VERSION = "2.0.3"





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
        deferred = S.Deferred()
        combined = update_options(options)
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



###############################################
###  Utility functions

def update_options(options):
    '''helper method that combines the defaults and options'''
    combined = {}
    combined.update(S.fn.timers.defaults)
    if options is not None:
        combined.update(options)
    return combined



