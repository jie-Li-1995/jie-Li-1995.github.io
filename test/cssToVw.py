# coding=utf-8
# 作者：刘
import re

# 全局配置
EXCLUDE_PROPERTIES = ['font-size', 'border-width', 'border-radius','border','border-botton']  # 排除的 CSS 属性

def px_to_vw(css_content, base_width):
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
            vw_value = (px_value / base_width) * 100

            # 格式化为保留两位小数的 vw，且如果是0就不保留小数
            if vw_value == int(vw_value):  # 判断是否是整数
                return f'{property_name}: {int(vw_value)}vw;'  # 输出整数
            else:
                return f'{property_name}: {vw_value:.2f}vw;'  # 输出保留两位小数

        except ValueError:
            return full_property  # 如果转换失败，返回原值

    # 正则表达式匹配 CSS 样式属性值为 px 的部分
    pattern = r'(\w[\w-]*):\s*(-?\d+(\.\d+)?)px;'  # 允许匹配负号
    return re.sub(pattern, convert_px, css_content)


def process_scss_file(file_path, base_width):
    """处理单个 SCSS 文件"""
    with open(file_path, 'r', encoding='utf-8') as file:
        scss_content = file.read()

    # 转换 px 为 vw
    return px_to_vw(scss_content, base_width)


def generate_combined_scss(output_path, scss_files):
    """将多个 SCSS 文件的转换结果合并为一个 SCSS 文件"""
    combined_scss = ""
    mb_scss = ""

    for scss_file in scss_files:
        mb_scss =""
        base_width = scss_file['base_width']
        input_file = scss_file['input']
        
        # 获取转换后的 SCSS 内容
        converted_scss = process_scss_file(input_file, base_width)
        
        # 将转换后的内容拼接到最终的 SCSS 字符串
        combined_scss += converted_scss + "\n\n"
            

    # 将合并后的 SCSS 内容写入输出文件
    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.write(combined_scss)
    
    print(f"文件合并并转换成功。输出文件路径：{output_path}")


# 示例用法
def process_and_combine_files():
    """处理多个 SCSS 文件并将它们合并到一个 SCSS 文件"""
    scss_files = [
        {'input': 'e:/work/jie-Li-1995.github.io/py/pc.scss', 'base_width': 1920},
        {'input': 'e:/work/jie-Li-1995.github.io/py/mb.scss', 'base_width': 750}
    ]

    output_combined_scss = 'e:/work/jie-Li-1995.github.io/py/out/combined_vw.scss'  # 输出合并后的 SCSS 文件路径

    generate_combined_scss(output_combined_scss, scss_files)

# 运行合并处理函数
process_and_combine_files()
