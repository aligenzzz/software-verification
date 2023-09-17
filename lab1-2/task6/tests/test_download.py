import unittest
from unittest.mock import patch

from task6.functions import download, check_url
from task6.tests.constants import DIRECTORY, URLS


class TestDownload(unittest.TestCase):
    @patch('builtins.exit')
    def test_russian_file(self, mock_exit):
        url = check_url(URLS[0])
        download(url, DIRECTORY, False)

        mock_exit.assert_not_called()

    @patch('builtins.exit')
    def test_image_file_with_parameters(self, mock_exit):
        url = check_url(URLS[1])
        print(url)
        download(url, DIRECTORY, False)

        mock_exit.assert_not_called()

    @patch('builtins.exit')
    def test_image_file(self, mock_exit):
        url = check_url(URLS[2])
        download(url, DIRECTORY, False)

        mock_exit.assert_not_called()

    @patch('builtins.exit')
    def test_page(self, mock_exit):
        url = check_url(URLS[3])
        download(url, DIRECTORY, False)

        mock_exit.assert_called_with(-1)


if __name__ == '__main__':
    unittest.main()
