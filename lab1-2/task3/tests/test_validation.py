import unittest
from unittest.mock import patch

from task3.functions import check_number


class TestValidation(unittest.TestCase):
    @patch('builtins.exit')
    def test_number_validation1(self, mock_exit):
        check_number('-123')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_number_validation2(self, mock_exit):
        check_number('number')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_number_validation3(self, mock_exit):
        check_number('0')
        mock_exit.assert_called_with(-1)


if __name__ == '__main__':
    unittest.main()
