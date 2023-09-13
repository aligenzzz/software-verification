from random import randint

# random number of exclamation marks
n = randint(5, 50)

if __name__ == '__main__':
    print('Hello, world!\n'
          'Andhiagain!\n'
          + '!' * n)
