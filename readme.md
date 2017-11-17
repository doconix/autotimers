# autotimers

[Visit the Demo Page](https://rawgit.com/doconix/autotimers/master/demo/index.html)

Why not just use `window.setTimeout`?  Because these timers provide:

* OO interface for starting, running, and cancelling.
* No dependencies.
* Automatic timer id tracking.
* Several types of repeating timers. 
* Automatically clearing of timers with the same name
* Automatic stopping after a number of runs.
* Automatic removal when related elements are removed from the DOM.
* Multiple, named timers per element.
* `this` is available in your timed function.


## Install

**`npm install autotimers`**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; or

[Get the latest v2 code](https://raw.githubusercontent.com/doconix/autotimers/master/dist/autotimers.min.js)


### A few examples: 

Wait four seconds, then run one time.  Connect to default element (document).

```
Timers.Timer(4000).do(() => {
    console.log('one time joe!')
})
```

Place timer on "#someid".  Run immediately, then repeatedly run exactly four seconds after the *end* of the previous run.

```
let elem = document.getElementById('#someid')
Timers.SleepAfterTimer(elem, 4000).do(() => {
    console.log('right now, then again and again!')
    console.log(this)  # elem
})
```

Place timer on "#someid".  Wait four seconds, then repeatedly run exactly four seconds after the *start* of the
previous run. Stop after five runs.  

```
let elem = document.getElementById('#someid')
Timers.IntervalTimer(elem, {
    'millis': 4000, 
    'maxRuns': 5 
}).do((tmr) => {
    console.log('wait first, then again and again!')
    console.log(tmr.runIndex)    # 0, 1, 2, 3, or 4
    console.log(tmr.timerStart)  # Date object for start of current timer
})
```

Check every fours seconds for boolean to be true, then cancel the timer.

```
let elem = document.getElementById('#someid')
Timers.SleepAfterTimer(elem, 4000).do((tmr) => {
    if (somebool)
        tmr.cancel()
})
```

Trigger a function when the user stops typing for 500ms.  If the user presses another key quickly, cancel
that timer and start the 500ms clock again.

```
elem = document.getElementById('#some_text_field')
elem.addEventListener('keyup', () {
    Timers.IntervalTimer(elem, {
        'millis': 500, 
        'name': 'keyup',  # this autocancels any previous timers by this name on elem
                          # if omitted, the default name is 'default', so we actually
                          # didn't need to set it explicitly
    }).do((tmr) => {
        console.log('The user finally stopped typing')
    })
})
```


## Description:

Timer object that provides five types of timers.

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
Timers.Timer(elem, millis, options).do(...).then(...).catch(...)
Timers.SleepTimer(elem, millis, options).do(...).then(...).catch(...)
Timers.SleepAfterTimer(elem, millis, options).do(...).then(...).catch(...)
Timers.IntervalTimer(elem, millis, options).do(...).then(...).catch(...)
Timers.IntervalAfterTimer(elem, millis, options).do(...).then(...).catch(...)
```

The `elem` and `millis` can be specified as above, or they can be specified in the `options` object.  Since the arguments are three distinct types, they can be specified in any order or omitted from the call (see the examples at the top of this page).

```
{
    # element to attach to (defaults to document)
    elem = document,
    
    # timer duration in milliseconds
    'millis': 1000,

    # maximum number of timer callbacks (< 1 is infinite runs)
    'maxRuns': 0,

    # name of this timer - (elem + name) is unique and cancels any
    # previous timer with the same name on the elemnent
    'name': 'default',
}
```

The callbacks are specified with a familiar API:

* `do(timer)` is run each time the timer hits zero.
* `then(timer)` is run one time after maxRuns is reached or the timer is cancelled or `elem` is removed from the DOM.
* `catch(timer, error)` is run if an exception is thrown in `do()`.

Within each method, `this` is set to the element.  If you are using fat arrow functions, it is available at `timer.elem`.

Promises: While the above methods look similar to promises, this is actually the observer pattern. Promises are a contract to do an action exactly one time, and repeating timers don't really match the pattern.  There's also no idea of chaining and value passing.  I've used the method names to make it familiar to programmers (who most likely don't care about the distinction anyway :).

### Helper functions

```
Timers.cancel(elem)          # Cancels all timers on elem
Timers.cancel(elem, 'name')  # Cancels named timer on #somediv
let ar = Timers.timers(elem) # Returns the timer objects on elem (additional param 'name' filters by name)
```

### Canceling Timers

Any of the following will cancel a timer:

* `Timers.cancel(elem)` or `Timers.cancel(elem, name)` is called.
* `tmr.cancel()` is called within a `do(tmr)` function.
* `elem` is removed from the DOM.
* Another timer with the same name is placed on `elem`.

### Global options

Change any of the global options with:

```
Timers.defaults.millis = 2000
```

## Development

`autotimers` is programmed in Python and transpiled to Javascript using [Transcrypt Library](https://www.transcrypt.org/).  `dist/autotimers.js` is the only file needed to use the library.

The source code is in `src/*.py`, with `main.py` being the primary script. The output files are in `src/__javascript/*.js`.  Upon build, `main.js` (which contains everything) is copied to `dist/autotimers.js`. 

During development and testing, run `auto_transpiler.py` to automatically transpile whenever source files change.  You can also run `build.py` to erase and rebuild everything.

The `tests/` directory holds a small testing suite to ensure everything works.  To run the test suite, open `tests/run_tests.html` file and check the output in the browser console.
    