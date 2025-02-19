# Read the main.scss file in the current directory
try:
    with open('e:/work/jie-Li-1995.github.io/py/main.scss', 'r', encoding='utf-8') as file:
        scss_content = file.read()
        print(scss_content)  # Print the file content
except FileNotFoundError:
    print("File main.scss not found. Please ensure the file exists in the current directory.")
except IOError as e:
    print(f"An error occurred while reading the file: {e}")
