##############################################################
###  unit tests for powertimers library
###
###  Run tests by including this file just after the main:
###
###        <script src="jquery-3.2.1.js"></script>
###        <script src="src/__javascript__/main.js"></script>
###        <script src="tests/__javascript__/run_tests.js"></script>
###

document.TESTS = []

# when imported, the modules add to document.TESTS
import test_shortcut
import test_once
import test_fails
import test_sleep
import test_interval

##################################
###   Test runner    
    
test_counter = 0
def nextTest():
    if test_counter == len(document.TESTS):
        console.log('{} tests completed'.format(test_counter))
        return
    klass = document.TESTS[test_counter]
    console.log(klass.__name__)
    t = klass()
    def endTest():
        t.endTest()
        nextTest()
    window.setTimeout(endTest, t.NEEDED_TIME)
    t.startTest()
    test_counter += 1
    

# start the tests
console.log('Starting {} unit tests'.format(len(document.TESTS)))
document.addEventListener('DOMContentLoaded', nextTest)

