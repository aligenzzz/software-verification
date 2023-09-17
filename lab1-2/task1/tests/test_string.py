import unittest

from task1.functions import get_string
from task1.tests.constants import STATIC_PART, A, B


class TestString(unittest.TestCase):
    def test_static_part(self):
        s = get_string()
        result = s.startswith(STATIC_PART)

        self.assertEqual(result, True)

    def test_length(self):
        s = get_string()
        result = len(STATIC_PART) + A <= len(s) <= len(STATIC_PART) + B

        self.assertEqual(result, True)


if __name__ == '__main__':
    unittest.main()
