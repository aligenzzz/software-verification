import unittest

from task2.functions import get_ages
from constants import PEOPLE, EXPECTED_AGES


class TestAges(unittest.TestCase):
    def test_something(self):
        result = get_ages(PEOPLE)

        self.assertTupleEqual(result, EXPECTED_AGES)


if __name__ == '__main__':
    unittest.main()
