import unittest

import html5lib
from task4.tests.constants import FILE_PATH


class TestValidation(unittest.TestCase):
    def test_html_validation(self):
        html5parser = html5lib.HTMLParser(strict=True)
        with open(FILE_PATH, 'r') as file:
            content = file.read()

        html5parser.parse(content)

        self.assertEqual(True, True)


if __name__ == '__main__':
    unittest.main()
