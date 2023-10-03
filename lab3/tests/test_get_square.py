import unittest

from src.triangle import Triangle


class TestGetSquare(unittest.TestCase):
    # result = test passed
    def test_getSquare_Rectangular(self):
        tr = Triangle(3, 4, 5)
        self.assertEqual(tr.get_square(), 6)

    # result = test passed
    def test_getSquare_Equilateral(self):
        tr = Triangle(3, 3, 3)
        self.assertEqual(round(tr.get_square(), 2), 3.9)

    # result = test passed
    def test_getSquare_Isosceles(self):
        tr = Triangle(3, 3, 5)
        self.assertEqual(round(tr.get_square(), 2), 4.15)

    # result = test passed
    def test_getSquare_Ordinary(self):
        tr = Triangle(1.5, 2, 3)
        self.assertEqual(round(tr.get_square(), 2), 1.33)


if __name__ == '__main__':
    unittest.main()
