import unittest
from unittest.mock import patch

from task6.functions import check_url, check_directory


class TestValidation(unittest.TestCase):
    @patch('builtins.exit')
    def test_url1(self, mock_exit):
        check_url('http://')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_url2(self, mock_exit):
        check_url('url')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_directory(self, mock_exit):
        check_directory('directory')
        mock_exit.assert_called_with(-1)


if __name__ == '__main__':
    unittest.main()
