jquery.powertimer.js
====================

Javascript timers on steroids (and easier to boot)!

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


SEE THE .JS FILE FOR MORE INFO ON THE EXACT OPTIONS.