import unittest

from src.triangle import Triangle


class TestCheckTriangle(unittest.TestCase):
    # result = test passed
    def test_checkTriangle_Correct(self):
        tr = Triangle(15, 12, 14)
        self.assertTrue(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Zero_A(self):
        tr = Triangle(0, 12, 14)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Zero_B(self):
        tr = Triangle(15, 0, 14)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Zero_C(self):
        tr = Triangle(15, 12, 0)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Negative_A(self):
        tr = Triangle(-15, 12, 14)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Negative_B(self):
        tr = Triangle(15, -12, 14)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Negative_C(self):
        tr = Triangle(15, 12, -14)
        self.assertFalse(tr.check_triangle())

    # for what 3 same tests???
    # result = test passed
    def test_checkTriangle_Three_More_C(self):
        tr = Triangle(15, 12, 14)
        self.assertTrue(tr.check_triangle())

    def test_checkTriangle_Three_More_B(self):
        tr = Triangle(15, 12, 14)
        self.assertTrue(tr.check_triangle())

    def test_checkTriangle_Three_More_A(self):
        tr = Triangle(15, 12, 14)
        self.assertTrue(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Three_Less_C(self):
        tr = Triangle(1, 2, 14)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Three_Less_B(self):
        tr = Triangle(5, 12, 1)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Three_Less_A(self):
        tr = Triangle(15, 1, 1)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Three_Equal_C(self):
        tr = Triangle(5, 5, 10)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Three_Equal_B(self):
        tr = Triangle(5, 10, 5)
        self.assertFalse(tr.check_triangle())

    # result = test passed
    def test_checkTriangle_Three_Equal_A(self):
        tr = Triangle(10, 5, 5)
        self.assertFalse(tr.check_triangle())


if __name__ == '__main__':
    unittest.main()
