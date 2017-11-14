# jquery-timers

[Visit the Demo Page](https://rawgit.com/doconix/jquery-timers/master/demo/index.html)

Why not just use `window.setTimeout`?  Because these timers provide:

* A much easier API for starting, running, and cancelling
* Automatic timer id tracking.
* Several types of repeating timers. 
* Automatically clearing of timers with the same name (super useful when you need a `keyUp` responder to trigger when the user stops typing for 500 ms in a text control).
* Automatic stopping of repeating timer after a number of runs.
* Automatic timer removal when related elements are removed from the DOM.
* Multiple, named timers per element.
* `this` is available in your timed function.

[Latest v2 code](https://raw.githubusercontent.com/doconix/jquery-timers/master/dist/jquery-timers.min.js)

[Archived v1 code](https://github.com/doconix/jquery-timers/tree/master/archived-v1.2.4)

## tl;dr:

**Get the code in the `dist/` folder above.**  Everything is in the single `jquery-timers.min.js` file.

Wait four seconds, then run one time:

```
$('#somediv').timers().Timer(4000).do((tmr) => {
    console.log('one time joe!')
})
```

Run immediately, then repeatedly run exactly four seconds after the *end* of the previous run:

```
$('#somediv').timers().SleepAfterTimer({ 'millis': 4000 }).do((tmr) => {
    console.log('right now, then again and again!')
})
```

Wait four seconds, then repeatedly run exactly four seconds after the *start* of the
previous run. Stop after five runs:

```
$('#somediv').timers().IntervalTimer({ 
    'millis': 4000, 
    'max_runs': 5 
}).do((tmr) => {
    console.log('wait first, then again and again!')
})
```

Check every fours seconds for boolean to be true, then stop checking:

```
$('#somediv').timers().SleepAfterTimer(4000).do((tmr) => {
    if (somebool)
        tmr.cancel()
})
```

## Description:

A jQuery plugin that provides three types of timers (with additional variations):

### 1. Regular Timer

These run the `do()` function(s) one time after the given millis. For example, suppose millis is 120 (2 seconds):

* After 2 seconds, ``do()`` is called.  The timer is finished at that point.

### 2. Sleep and SleepAfter Timers

These are repeating timer that ensures an exact time between runs.

These are similar to the normal `window.setInterval()`, but they ensures an exact amount of time occurs between calls to `do()`.  In other words, a "sleep" time between calls is enforced; the timer is restarted only when ``do()`` returns.

For example, suppose millis is 120 (2 seconds):

* If ``do()`` takes 1 seconds, `do()` will be called again 2 seconds after the end of the previous run (3 seconds after the previous start)
* If `do()` takes 2 seconds, `do()` will be called again 2 seconds after the end of the previous run (4 seconds after the previous start)
* If `do()` takes 3 seconds, `do()` will be called again 2 seconds after the end of the previous run (5 seconds after the previous start)

### 3. Interval and IntervalAfter Timers

These set  a repeating timer that starts at a speific interval,
This is very similar to the normal window.setInterval(), but this version
does not allow `do()` to run concurrently with another run of itself.

For example, suppose millis is 120 (2 seconds):

* If `do()` takes 1 seconds, `do()` will be called again 1 second after the end of the previous run.
* If `do()` takes 2 seconds, `do()` will be called again immediately after the end of the previous run.
* If `do()` takes 3 seconds, `do()` will be called again immediately after the end of the previous run (no double running like window.setInterval())

Note that SleepTimer is often a better option than IntervalTimer because it ensures a set amount of time between runs.

## Usage

See also the tl;dr examples at the top of this page.

```
$('#somediv').timers().Timer(options).do(...)
$('#somediv').timers().SleepTimer(options).do(...)
$('#somediv').timers().SleepAfterTimer(options).do(...)
$('#somediv').timers().IntervalTimer(options).do(...)
$('#somediv').timers().IntervalAfterTimer(options).do(...)
```

Specfy options as a `single number` (duration in millis) or as an `object`:

```
{
    # timer duration in milliseconds
    'millis': 1000,

    # maximum number of timer callbacks (< 1 is infinite runs)
    'max_runs': 0,

    # name of this timer - (elem + name) is unique and cancels any
    # previous timer with the same name on the elemnent
    'name': 'default',
}
```

Use the promise pattern for callbacks:

* `do(timer)` is run each time the timer hits zero.
* `then()` is run one time after max_runs is reached or the timer is cancelled.
* `fail()` is run if an exception is thrown in your `do()` method.

The timer object is sole parameter to your callbacks (`this` is also available).

### Shortcut functions

```
$('#somediv').timers('cancel')          # Cancels all timers on #somediv
$('#somediv').timers('cancel', 'name')  # Cancels named timer on #somediv
$('#somediv').timers('list')            # Returns the timer objects on #somediv
```

### Cancel Timers

Any of the following will cancel a timer:

* If `$('#myid').timers('cancel')` is called.
* If `timer.cancel()` is called within a `do(timer)` function.
* If elem is removed from the DOM.
* If another timer with the same name is placed on elem.

### Global options

Change any of the global options with:

```
$.fn.timers.defaults.millis = 2000
```

## Development

`jquery-timers` is programmed in Python, then transpiled to Javascript using the excellent [Transcrypt Library](https://www.transcrypt.org/).

The `src/*.py` files are the source code for the plugin, with `plugin.py` being the primary script. The output files are in `src/__javascript/*.js`.  Only `plugin.js` really matters - the other files are included within it when Transcrypt runs. I've split the plugin into many files to make maintenance easier.  The individual files are fairly small.

During development and testing, run `auto_transpiler.py` to automatically transpile whenever source files change.  You can also run `build.py` to erase and rebuild everything.

The `tests/` directory holds a small testing suite to ensure everything works.  To run the test suite, open `tests/run_tests.html` file and check the output in the browser console.
    