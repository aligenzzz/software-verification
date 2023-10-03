import math
import unittest

from src.triangle import Triangle


class TestDetectTriangle(unittest.TestCase):
    # result = test passed
    def test_detectTriangle_Rectangular_1(self):
        tr = Triangle(3, 4, 5)
        self.assertEqual(tr.detect_triangle(), 8)

    # result = test passed
    def test_detectTriangle_Rectangular_2(self):
        tr = Triangle(5, 4, 3)
        self.assertEqual(tr.detect_triangle(), 8)

    # result = test failed (because b*c -> b**2)
    # p.s. edited 2 -> 3
    def test_detectTriangle_Rectangular_3(self):
        tr = Triangle(3, 5, 4)
        self.assertEqual(tr.detect_triangle(), 8)

    # result = test failed (because isosceles after equilateral
    # + expected = 1)
    def test_detectTriangle_Equilateral(self):
        tr = Triangle(2, 2, 2)
        self.assertEqual(tr.detect_triangle(), 0)

    # result = test passed
    def test_detectTriangle_Isosceles_1(self):
        tr = Triangle(2, 2, 3)
        self.assertEqual(tr.detect_triangle(), 2)

    # result = test passed
    def test_detectTriangle_Isosceles_2(self):
        tr = Triangle(3, 2, 2)
        self.assertEqual(tr.detect_triangle(), 2)

    # result = test passed
    def test_detectTriangle_Isosceles_3(self):
        tr = Triangle(2, 3, 2)
        self.assertEqual(tr.detect_triangle(), 2)

    # result = test failed (because expected = 2)
    def test_detectTriangle_Isosceles_Rectangular(self):
        tr = Triangle(2, 2, 2 * math.sqrt(2))
        self.assertEqual(tr.detect_triangle(), 0)

    # result = test passed
    def test_detectTriangle_Ordinary(self):
        tr = Triangle(1, 3, 8 * math.sqrt(2))
        self.assertEqual(tr.detect_triangle(), 4)


if __name__ == '__main__':
    unittest.main()
