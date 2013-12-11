/*  
   Publishing reminder:

Change the version number in all the files.
git commit -am 'message'
git push origin master
git tag 1.1.10
git push origin --tags

*/

/*
   Author: Conan C. Albrecht <ca@byu.edu>
   Version: 1.1.10 (December 2013)
   License: MIT
 
   A jQuery plugin that provides the following types of timers:

     1. A single-run timer (a.k.a. setTimeout)
     2. A repeated-run timer (a.k.a. setInterval)
     3. A repeated-run timer that runs immediately, then waits the interval.
     4. A repeated-run, definite interval timer (see sleep option below).
     5. A repeated-run, definite interval timer that runs immediately, then waits the sleep time.


   Why would you use this library vs. the regular setTimeout?  Because it provides lots of
   additional features!  For example:

     - Automatic timer id tracking.
     - Pausing and later continuing of timers.
     - Unique timers, meaning if you start a timer twice, the first one is
       automatically cleared.
     - Automatic stopping of timer after a specified number of millis.
     - Automatic timer removal when related elements are removed from the DOM.
     - Multiple, named timers per element.
     - The "this" variable is available in your timed function.
     - Simply return false from a timer function to cancel the timer.
     - A JQuery-like interface for more clear code.
     - Allows parameter passing in both all browsers, including IE which normally doesn't pass parameters nicely
     - Returning of timer options, which provides access to the timer function, etc.

   Here's just one example.  Suppose you want a function to run when the user
   scrolls the web page.  But, you only want it to run when the user is 
   *finished* scrolling, not on every pixel that gets scrolled.  Since powertimers 
   automatically clear earlier timers on elements, simply start a new timer in 
   the scroll event.  The function will *only* run once the user has stopped 
   scrolling for 500 ms.

     $(window).scroll(function() {
       $(document).powerTimer({
          delay: 500,
          name: 'scroll watcher',
          func: function() {
            // this will run only after the user has stopped scrolling for 500ms
          },
       });
     });

   A few things to keep in mind when using timers and this plugin:

     1. If the given JQuery array has multiple elements in it, a timer will be set
        on *each* element.  In other words, if your array contains two <div> elements,
        you'll get two timers running, one for each div.  You probably want
        to use a JQuery array with a single element like the document or an id-based
        selectors: $('#id').powerTimer(), so you get a single timer.

     2. Use a JQuery-style object {} to set the options of your timers:

          $('#myid').powerTimer({
            name: 'mytimer',
            sleep: 1000,
            func: function() {
              console.log('Run with element: ' + this);
            },
          });

     3. If you remove DOM elements that have running timers attached to them,
        the plugin will clear the timers automatically. 

     4. The "this" variable is set to the related DOM element during your function call, 
        the same way JQuery events work.  See #2 example above.

     5. Normally you only need one timer attached to an element, so there's no reason
        to name the timer (it just uses the default name).  If you need additional timers
        on an element, you may want to name them so you can stop/pause/continue the
        timers individually. 

     7. .powerTimer('pause') and .powerTimer('continue') are really useful when doing asynchronous
        Ajax calls.  Pause your timer when the ajax call is made, then continue it
        when the response comes back.  


   See the options comments at the start of the code for detail on the available options.


   Example: Set a timer to run one time, in 2 seconds:

   <div id="someid">Element here</div>
   <script>
     $('#someid').powerTimer({
        delay: 2000,
        params: {
          first: 1,
          second: 'text',
        },
        func: function(params) {
          // do something with params.first and params.second here.
        },
     });
   </script>


   Example: Set a timer to run repeatedly at exact intervals of 5 seconds:

   <div id="someid">Element here</div>
   <script>
     $('#someid').powerTimer({
        interval: 5000,
        func: function() {
          console.log('Running');
        },
     });
   </script>


   Example: Set a timer to run repeatedly every 2 seconds, with an immediate
         initial run.  Note below, however, since the function removes the element 
         from the document on the first run, the timer only runs one time.  
         The timer is cleared from the queue and never runs again.

   <div id="someid">Element here</div>
   <script>
     $("#someid").powerTimer({
       intervalAfter: 2000,
       func: function() {
         console.log('Running.');
         $(this).remove();
       },
     });
   </script>


   Example: Set a timer to run with exactly 3 seconds between the end
   of the previous call and the start of the next.  For example, if the timer
   function takes 1 second to run, the timer will be run every 4 seconds.
   This is DIFFERENT than JavaScript's setInterval method because this ensurse
   that 3 seconds passes between runs, regardless of how long the run function takes.

   <div id="someid">Element here</div>
   <script>
     $("#someid").powerTimer({
       sleepAfter: 3000,
       func: function() {
         console.log('Running.');
         // the 3 second timer is started again at the *end* of this function,
         // ensuring the processor doesn't get pegged.  We know a specific 
         // amount of time will lapse between calls.
       },
     });
   </script>


   Example: Clears any timer(s) on the matching element(s).

   <div id="someid"></div>
   <script>
     $('#someid').powerTimer('stop');
   </script>


   Example: Pauses a timer.  This is different than stopping a timer because a
   call to "continue" will again run the timer with the same options.

    <button id="btn">Pause</button>
    <script>
      var start = new Date().getTime();
      $('#btn').powerTimer({
        intervalAfter: 1000,
        func: function() {
          console.log(new Date().getTime() - start);
        },
      }).click(function() {
        if ($(this).text() == 'paused') {
          $(this).powerTimer('continue').text('pause');
        }else{
          $(this).powerTimer('pause').text('paused');
        }
      });
    </script>


   Example: Pause a timer during an Ajax call, with run information use.

   <button id="btn">Go</button>
   <script>
      $('#btn').powerTimer({
        intervalAfter: 100,
        params: { next_ajax: 1 },
        func: function(params) {
          // do something every 1/10 second

          // ping the server every 60 seconds
          if (new Date().getTime() > params.next_ajax) {
            $(this).powerTimer('pause');          // pause processing until ajax return, this == the button
            $.ajax({
              ...
              success: function() {
                // do something with ajax response

                // reset the next ajax for 60 seconds from now
                params.next_ajax = new Date().getTime() + 60000;
                $('#btn').powerTimer('continue'); // continue the interface update
              }
            });
          }
        },
      });
   </script>


  Example: Two timers on the same element.  The following will only run the second
  timer because it overwrites the one that prints "first".  If you really wanted two
  timers on the document element, they need to be named differently (next example).

  <script>
    $(document).powerTimer({
      interval: 1000,
      func: function(params) {
        console.log('first');
      },
    });

    $(document).powerTimer({
      interval: 1000,
      func: function(params) {
        console.log('second');
      },
    });
  </script>


  Example: Two timers with different names.  Both will run simultaneously.  Because they
  have different names, the second doesn't overwrite the first, even though they are both
  on the same element.

  <script>
    $(document).powerTimer({
      interval: 1000,
      name: 'first timer',
      func: function(params) {
        console.log('first');
      },
    });

    $(document).powerTimer({
      interval: 1000,
      name: 'second timer',
      func: function(params) {
        console.log('second');
      },
    });
  </script>



*/
(function($) {
  /** Sets a timer on the elements in the JQuery array. */
	$.fn.powerTimer = function(options, timerName) {
    // if the options are a command, short circuit over to those methods instead 
    switch (options)  {
      case 'stop': 
        return funcStop.call(this, timerName);
      case 'pause':
        return funcPause.call(this, timerName);
      case 'continue':
        return funcContinue.call(this, timerName);
      case 'options':
        return funcOptions.call(this, timerName);
    }//switch
    // if we get here, then options was not an action word, but it was a {} of options
    
	  // set the options defaults
		options = $.extend({
		  func: null,           // The function to be called by the timer.  Often, this is an inline anonymous
		                        // function in JQuery style like func: function() { ... }.  If your function
		                        // returns false, the timer will be cancelled.

		  params: {},           // The parameters to send to func when it is called.  To send multiple parameters
		                        // to your function, use a JavaScript object in JQuery-style: { key1=val1, key2=val2 }.

		  name: TIMER_KEY,      // The name of this timer -- used to stop the timer after it is set.  Timers are 
		                        // unique to the name + DOM element, so two timers by the same name on a different 
		                        // element are two different timers, and two timers by the different names on
		                        // the same element are two different timers.  
                            // If you do not set a name, only one powerTimer per DOM element can exist.  
      
                            // NOTE:
                            // The next five options (delay, interval, intervalAfter, sleep, and sleepAfter) are 
                            // mutually-exclusive - only use one at a time because each represents a different type of timer.

		  delay: -1,            // If >= 0, sets a one-time timer that is called after *delay* milliseconds.
		                        // The delay is 0 or less, no timer is set.

		  interval: -1,         // If >= 0, sets a repeating timer that is called every *interval* milliseconds.
		                        // If the interval is 0 or less, no timer is set.   Note that this option calls
		                        // your method every *interval* seconds regardless of how long your function takes
		                        // to run.  If the interval is 2 seconds and your function takes 1 second, the wait
		                        // period between calls will only be 1 second.  If your interval is 2 seconds and
		                        // your function takes 2 seconds, there will be no wait period at all.  For many
		                        // purposes, sleep is a better option than interval because it ensures yielding.
		                        
		  intervalAfter: -1,    // This option is the same as *interval*, but it waits after an initial call
		                        // to the function.  Normally, initial waits the specified period before the first
		                        // call.  This option immediately calls your function, followed by the interval,
		                        // then calls it again.
		                        
		  sleep: -1,            // If >= 0, sets a repeating timer that waits *sleep* milliseconds between calls.
		                        // If the sleep is 0 or less, no timer is set.  Note that this option will 
		                        // wait the entire sleep period between each call.  If your sleep is 2 seconds and your
		                        // function takes 1 second to run, there will be 3 seconds between each call
		                        // (the 2 second interval + 1 second function run time).  If your sleep is 2 seconds
		                        // and your function takes 2 seconds to run, there will be 4 seconds between each
		                        // call.  This is different than the interval option, which calls your method every 
		                        // *interval* seconds, regardless of how long your function runs.  
		                        // The sleep option is likely the better option because it ensures that *sleep* 
		                        // milliseconds are waited from the end of your function run to the beginning 
		                        // of the next run, ensureing that your function will yield time to other processes
		                        // regardless of how long the function takes. 

		  sleepAfter: -1,       // This option is the same as *sleep*, but it waits after an initial call
		                        // to the function.  Normally, initial waits the specified period before the first
		                        // call.  This option immediately calls your function, followed by the sleep,
		                        // then calls it again.  Mozilla developer docs call this option the "recursive setTimeout"
		                        // pattern.
                            
      stopAfter: -1,        // If set, this option will stop and dispose of the timer after a given number of milliseconds,
                            // regardless of how many times the timer has run. 
                            // The expected use of this option is for timers that try some behavior, with
                            // the timer to giving up after trying for a period of time.
		                        
		}, options || {});

    // clear any timers by this name
    funcStop.call(this, options.name);
    
    // set the timeouts on every element in the JQuery array
    $(this).each(function() {
      setTimerValue(this, options.name, 'options', options);
      setTimerValue(this, options.name, 'starttime', new Date().getTime());
      funcContinue.call(this, options.name) // starts up the timer now that the options are in place
    });//main each loop
    
    // return this to allow chaining
    return this;
  };//setTimer function
  
    
   /** 
    *  Clears the timers with the given name on this element. If name is 
    *  not specified, the timers registered with the default name are cleared. 
    */
   var funcStop = function(name) {
     name = name || TIMER_KEY;
     $(this).each(function() {
       stopTimerByName(this, name);
       removeTimerValues(this, name); // by entirely removing the object, we prevent it from running again and free memory used by the optiosn (especially the function)
     });//each
     return this;
   };//clearTimer
     
     
   /** 
    *  Pauses the timers with the given name on this element.  If name is 
    *  not specified, the timers registered with the default name are paused.
    */
   var funcPause = function(name) {
     name = name || TIMER_KEY;
     $(this).each(function() {
       stopTimerByName(this, name);                      // clears the setTimeout
       setTimerValue(this, name, 'timerid', false);      // stops the timer from continuing
     });//each
     return this;
   }; 
     
  /** 
   *  Continues a paused timer with the given name on this element.  If name is
   *  not specified, the timer registered with the default name are continued.
   */
  var funcContinue = function(name) {
    name = name || TIMER_KEY;
    stopTimerByName(this, name);                      // clears a timeout if pause wasn't called first
    // for continue to work, the options must have been saved from a previous startTimer()
    // continuing is like to starting, but we already have the options (i.e. function to call) saved
    var options = getTimerValue(this, name, 'options');
    if (options) {
      $(this).each(function() {
        if (options.delay >= 0) {
          registerTimeout(this, options, options.delay);
        }else if (options.interval >= 0) {
          registerTimeout(this, options, options.interval);
        }else if (options.intervalAfter >= 0) {
          registerTimeout(this, options, 0);     // immediate call first
        }else if (options.sleep >= 0) {
          registerTimeout(this, options, options.sleep);
        }else if (options.sleepAfter >= 0) {
          registerTimeout(this, options, 0);     // immediate call first
        }//if
      });//each
    }//if
    return this;
  }; 
    
  /**
   *  Retrieves the options for the named timer attached to the element.  If name is
   *  not specified, the timer options registered with the default name is returned.
   */
  var funcOptions = function(name) {
    return getTimerValue(this, name || TIMER_KEY, 'options');
  };
    
    
    
    
    
  ////////////////////////////////////////////////
  ///   Internal methods
  
  
  
  TIMER_KEY = 'jquery.powertimers.js';
    
  /* Does the actual setTimeout call. This is called from setTimer for the first run and then callWithElement for subsequent runs. */
  function registerTimeout(elem, options, duration) {
    if (duration > 0) { // call later
      setTimerValue(elem, options.name, 'timerid', window.setTimeout(function() { callWithElement(elem, options); }, duration));

    }else{ // call immediately
      setTimerValue(elem, options.name, 'timerid', 'dummy'); // set a non-real timerid so callWithElement continues the timer loop
      callWithElement(elem, options)

    }//if
  }//registerTimeout
      
      
  /* The event function that setTimeout calls.  It runs the user function, then continues the timer loop. */
  function callWithElement(elem, options) {
    var now = new Date().getTime();
    if (options.stopAfter && options.stopAfter > 0 && now - getTimerValue(elem, options.name, 'starttime') > options.stopAfter) {
      $(elem).powerTimer('stop');
      return false;
    }//if
    var ret = options.func.call(elem, options.params);
    stopTimerByName(elem, options.name);
    if (ret !== false && options.delay <= 0 && getTimerValue(elem, options.name, 'timerid')) {
      if (options.interval >= 0) {
        registerTimeout(elem, options, Math.max(0, options.interval - (new Date().getTime() - now)));
      }else if (options.intervalAfter >= 0) {
        registerTimeout(elem, options, Math.max(0, options.intervalAfter - (new Date().getTime() - now)));
      }else if (options.sleep >= 0) {
        registerTimeout(elem, options, options.sleep);
      }else if (options.sleepAfter >= 0) {
        registerTimeout(elem, options, options.sleepAfter);
      }//if
    }//if
    return ret;
  }//callWithElement
      
      
  /* Clears a timer or interval with the given name */
  function stopTimerByName(elem, name, clear) {
    // if we have a timer id, clear the timer 
    var timerid = getTimerValue(elem, name, 'timerid');
    if (timerid) {
      window.clearTimeout(timerid);
    }//if
  }//stopTimerByName
      
      
  /** Gets a value on the given element for the named timer */
  function getTimerValue(elem, name, key) {
    var $elem = $(elem);
    // ensure we have our data structure attached to the element
    if (!$elem.data(TIMER_KEY)) {
      $elem.data(TIMER_KEY, []);
    }//if
    if (!$elem.data(TIMER_KEY)[name]) {
      $elem.data(TIMER_KEY)[name] = [];
    }//if
    return $elem.data(TIMER_KEY)[name][key];
  }//getTimerValue
      
  /** Sets a value on the given element for the named timer */
  function setTimerValue(elem, name, key, value) {
    getTimerValue(elem, name, key); 
    $(elem).data(TIMER_KEY)[name][key] = value;
  }//setTimerValue
      
  /** Removes all values associated with the named timer */
  function removeTimerValues(elem, name) {
    getTimerValue(elem, name, 'dummy'); // ensures we have the data structure set up
    delete $(elem).data(TIMER_KEY)[name];
  }//removeTimerValues
    
  
  /* Hook to JQuery's cleanData method so we can clear timers when DOM elements are removed */
  var oldClean = jQuery.cleanData;
  $.cleanData = function( elems ) {
   for ( var i = 0, elem; (elem = elems[i]) !== undefined; i++ ) {
     $(elem).powerTimer('stop');
   }//for i
   return oldClean(elems);
  }//cleanData  
  
  
})(jQuery);
















