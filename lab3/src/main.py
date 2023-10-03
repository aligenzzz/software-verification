from triangle import Triangle

if __name__ == '__main__':
    tr = Triangle(1.0, 2.0, 2.0)
    print(tr.check_triangle())
    print(tr.get_message())
    print(tr.detect_triangle())
