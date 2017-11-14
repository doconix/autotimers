##############################################################
###  unit tests for powertimers library
###
###  Run tests by including this file just after the plugin:
###
###        <script src="jquery-3.2.1.js"></script>
###        <script src="src/__javascript__/plugin.js"></script>
###        <script src="tests/__javascript__/run_tests.js"></script>
###

__pragma__('alias', 'S', '$')
S.fn.autotimer.TESTS = []

# when imported, the modules add to S.fn.autotimer.TESTS
import test_shortcut
import test_once
import test_fails
import test_sleep
import test_interval

##################################
###   Test runner    
    
test_log = []
def nextTest():
    if len(test_log) == len(S.fn.autotimer.TESTS):
        console.log('{} tests completed'.format(len(test_log)))
        return
    klass = S.fn.autotimer.TESTS[len(test_log)]
    console.log(klass.__name__)
    t = klass()
    t.setUp()
    def then():
        t.tearDown()
        test_log.push('success')
        nextTest()
    def reject(err):
        console.error(err)
        test_log.push(err)
        nextTest()
    t.promise_start().then(then, reject)
    

# start the tests
console.log('Starting {} unit tests'.format(len(S.fn.autotimer.TESTS)))
S(nextTest)

