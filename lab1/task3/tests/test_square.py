import unittest

from task3.functions import get_square


class TestSquare(unittest.TestCase):
    def test_square(self):
        result = get_square(5, 10)

        self.assertEqual(result, 50)


if __name__ == '__main__':
    unittest.main()
