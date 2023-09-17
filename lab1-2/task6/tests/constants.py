import os

current_directory = os.path.dirname(os.path.abspath(__file__))
project_directory = os.path.abspath(os.path.join(current_directory, '..'))
DIRECTORY = os.path.join(project_directory, 'downloads')
# DIRECTORY = '../downloads/'

URLS = ('"https://cloud.mail.ru/public/4k5a/3t5oucx7M/Лекции/юнит-тестирование.doc"',
        '"https://avatars.mds.yandex.net/i?id=cafe1822fe142d1e65993f3510e007e2_l-4576286-images-thumbs&n=13"',
        '"https://i.pinimg.com/564x/d4/ca/f6/d4caf6f2499909f4a98f7adf9c518e63.jpg"',
        '"https://mishka-knizhka.ru/razvivajka-dlja-detej-1-3-let/cifry-i-formy/nabory-kartochek-izuchaem-cifry/"')

