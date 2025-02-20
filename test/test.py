import re

# 回调函数
def replace_callback(match):
    # 根据匹配的内容进行转换
    return match.group(0).upper()  # 将匹配的字符串转换为大写

text = "hello world, hello python"
result = re.sub(r'hello', replace_callback, text)

print(result)
