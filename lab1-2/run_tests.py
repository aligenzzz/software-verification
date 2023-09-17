import unittest
import coverage

# for running tests use
# py run_tests.py

cov = coverage.Coverage()
cov.start()

# creating environment to tests
loader = unittest.TestLoader()
suite = unittest.TestSuite()

# add to this environment my tests
test_suite = unittest.TestLoader().discover('.', pattern='test_*.py')

# run tests
runner = unittest.TextTestRunner().run(test_suite)

# stop coverage and create report
cov.stop()
cov.save()
cov.report()
