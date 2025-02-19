# coding=utf-8
# 作者：刘
import re

# 全局配置
BASE_WIDTH = 1920  # 基准宽度
EXCLUDE_PROPERTIES = ['font-size']  # 排除的 CSS 属性

def px_to_vw(css_content):
    """将 px 转换为 vw"""
    def convert_px(match):
        full_property = match.group(0)
        property_name = match.group(1)
        value_with_unit = match.group(2)

        # 如果当前属性在排除列表中，直接返回原值
        if property_name in EXCLUDE_PROPERTIES:
            return full_property

        # 转换 px 为 vw
        try:
            px_value = float(value_with_unit.replace('px', ''))
            vw_value = (px_value / BASE_WIDTH) * 100

            # 格式化为保留两位小数的 vw，且如果是0就不保留小数
          # 如果是整数，则直接输出整数，若是小数则保留两位小数
            if vw_value == int(vw_value):  # 判断是否是整数
                return f'{property_name}: {int(vw_value)}vw;'  # 输出整数
            else:
                return f'{property_name}: {vw_value:.2f}vw;'  # 输出保留两位小数

        except ValueError:
            return full_property  # 如果转换失败，返回原值

    # 正则表达式匹配 CSS 样式属性值为 px 的部分
    pattern = r'(\w[\w-]*):\s*(\d+(\.\d+)?)px;'
    return re.sub(pattern, convert_px, css_content)


def process_scss_file(file_path):
    """处理单个 SCSS 文件"""
    with open(file_path, 'r', encoding='utf-8') as file:
        scss_content = file.read()

    # 转换 px 为 vw
    return px_to_vw(scss_content)


def generate_vw_scss(output_path, main_scss_file):
    """生成转换后的 SCSS 文件"""
    converted_scss = process_scss_file(main_scss_file)

    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.write(converted_scss)
    print(f"File conversion successful. Output file path: {output_path}")


# 示例用法
main_scss = 'e:/work/jie-Li-1995.github.io/py/main.scss'  # 主 SCSS 文件路径
output_scss = 'e:/work/jie-Li-1995.github.io/py/main_vw.scss'  # 输出的转换后的 SCSS 文件路径

generate_vw_scss(output_scss, main_scss)
