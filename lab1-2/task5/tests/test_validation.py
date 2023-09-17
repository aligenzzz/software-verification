import unittest
from unittest.mock import patch

from task5.functions import check_directory, check_extension


class TestValidation(unittest.TestCase):
    @patch('builtins.exit')
    def test_directory(self, mock_exit):
        check_directory('directory')
        mock_exit.assert_called_with(-1)

    @patch('builtins.exit')
    def test_extension(self, mock_exit):
        check_extension('extension')
        mock_exit.assert_called_with(-1)


if __name__ == '__main__':
    unittest.main()
