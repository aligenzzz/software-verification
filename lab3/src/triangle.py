# this script can contain errors because is important for this laboratory work
import math


class Triangle:
    TR_EQUILATERAL = 1
    TR_ISOSCELES = 2
    TR_ORDINARY = 4
    TR_RECTANGULAR = 8

    def __init__(self, a: float, b: float, c: float):
        self.__a = a
        self.__b = b
        self.__c = c
        self.__message = ''

    def get_message(self):
        return self.__message

    def check_triangle(self):
        if self.__a <= 0:
            self.__message = 'a<=0'
            return False
        if self.__b <= 0:
            self.__message = 'b<=0'
            return False
        if self.__b <= 0:
            self.__message = 'c<=0'
            return False

        if self.__a + self.__b <= self.__c:
            self.__message = 'a+b<=c'
            return False
        if self.__a + self.__c <= self.__b:
            self.__message = 'a+c<=b'
            return False
        if self.__b + self.__c <= self.__a:
            self.__message = 'b+c<=a'
            return False

        return True

    def detect_triangle(self):
        final_state = 0

        if self.__a**2 + self.__b**2 == self.__c**2 or \
           self.__b**2 + self.__c**2 == self.__a**2 or \
           self.__a**2 + self.__c**2 == self.__b * self.__c:
            final_state = final_state | self.TR_RECTANGULAR
        if self.__a == self.__b and self.__b == self.__c and self.__a == self.__c:
            final_state = final_state | self.TR_EQUILATERAL
        if self.__a == self.__b or self.__b == self.__c or self.__a == self.__c:
            final_state = final_state | self.TR_ISOSCELES

        if final_state == 0:
            return self.TR_ORDINARY
        else:
            return final_state

    def get_square(self):
        p = (self.__a + self.__b + self.__c) / 2
        return math.sqrt(p * (p - self.__a) * (p - self.__b) * (p - self.__c))
