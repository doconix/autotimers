The `src/*.py` files are the source code for the plugin, with `plugin.py` being the primary script. This version of the timer library is coded in Python, which is then transpiled into Javascript.  The output files are in `src/__javascript/*.js`.  Only `plugin.js` really matters - the other files are included within it when Transcrypt runs. For more information, see https://www.transcrypt.org/.

I've also split the plugin into many files to make maintenance easier.  The individual files are fairly small.

The `tests/` directory holds a small testing suite to ensure everything works.  To run the test suite, include it in your html file after the timer plugin is loaded.  The output goes to the browser console.
    
    <script src="jquery-3.2.1.js"></script>
    <script src="src/__javascript__/plugin.js"></script>
    <script src="tests/__javascript__/run_tests.js"></script>

