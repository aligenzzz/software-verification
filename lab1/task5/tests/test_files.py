import unittest

from task5.functions import get_files
from task5.tests.constants import DIRECTORY, EXISTING_EXTENSION, NONEXISTING_EXTENSION


class TestFiles(unittest.TestCase):
    def test_existing_files(self):
        result = get_files(DIRECTORY, EXISTING_EXTENSION)

        self.assertEqual(len(result) > 0, True)

    def test_nonexisting_files(self):
        result = get_files(DIRECTORY, NONEXISTING_EXTENSION)

        self.assertEqual(len(result) == 0, True)


if __name__ == '__main__':
    unittest.main()
