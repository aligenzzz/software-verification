import webbrowser

if __name__ == '__main__':
    # write to gradient_table.html
    with open('gradient_table.html', 'w') as file:
        # the beginning od html file
        file.write('<!doctype html>\n')
        file.write('<html>\n')
        file.write('\t<head>\n')

        # style of table
        file.write('\t\t<style>\n')
        file.write('\t' * 3 + 'table {\n')
        file.write('\t' * 4 + 'border-collapse: collapse;\n')
        file.write('\t' * 4 + 'width: 25%;\n')
        file.write('\t' * 3 + '}\n')
        file.write('\t\t</style>\n')

        file.write('\t</head>\n')
        file.write('\t<body>\n')
        file.write('\t\t<table>\n')

        # table has 255 rows and every row has 1 column
        # with rgb(255 255 255) - white to rgb(0 0 0) - black
        for i in range(255, -1, -1):
            file.write('\t' * 3 +
                       f'<tr style="background-color: rgb({i} {i} {i});">\n')
            file.write('\t' * 4 + '<td></td>\n')
            file.write('\t' * 3 + '</tr>\n')

        # the ending of html file
        file.write('\t\t</table>\n')
        file.write('\t</body>\n')
        file.write('</html>\n')

        # file's opening in the browser
        webbrowser.open('gradient_table.html', new=2)
