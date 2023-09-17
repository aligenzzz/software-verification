import unittest
from unittest.mock import patch

from task2.functions import check_name, check_age


class TestValidation(unittest.TestCase):
    @patch('builtins.exit')
    def test_name_validation1(self, mock_exit):
        check_name('123')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_name_validation2(self, mock_exit):
        check_name('!!..//')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_name_validation3(self, mock_exit):
        check_name('alina')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_age_validation1(self, mock_exit):
        check_age('age')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_age_validation2(self, mock_exit):
        check_age('300')
        mock_exit.assert_called_with(-1)


if __name__ == '__main__':
    unittest.main()
