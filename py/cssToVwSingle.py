# coding=utf-8
# 作者：刘
import re

# 全局配置
EXCLUDE_PROPERTIES = ['border']  # 排除的 CSS 属性

def px_to_vw(css_content, base_width):
    """将 CSS 内容中的 px 单位转换为 vw"""
    def convert_px(match):
        property_name = match.group(1).strip()
        value_str = match.group(2).strip()

        # 如果属性在排除列表中，直接返回原值
        if property_name in EXCLUDE_PROPERTIES:
            return f'{property_name}: {value_str};'

        # 处理值中的每个 px 单位
        def replace_px(px_match):
            px_value = px_match.group(1)
            try:
                px_num = float(px_value)
                vw_value = (px_num / base_width) * 100
                # 格式化输出（整数去小数点，否则保留两位）
                return f'{vw_value:.2f}vw'.rstrip('0').rstrip('.') if vw_value % 1 else f'{int(vw_value)}vw'
            except ValueError:
                return px_match.group(0)  # 转换失败则保留原值

        # 匹配所有 px 值（包括负值和小数）
        new_value_str = re.sub(
            r'(-?\d+\.?\d*)px',  # 匹配 15px、-15px、14.5px 等
            replace_px,
            value_str
        )
        return f'{property_name}:{new_value_str};'

    # 正则匹配 CSS 属性（支持多值，如 padding: 15px 14px;）
    pattern = r'([a-zA-Z][a-zA-Z0-9_-]*)\s*:\s*([^;{}]+);'

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
        if base_width == 750:
            combined_scss += 'mobile' + "\n\n"
            combined_scss += converted_scss + "\n\n"
        else:
            combined_scss += converted_scss + "\n\n"
            

    # 将合并后的 SCSS 内容写入输出文件
    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.write(combined_scss)
    
    print(f"conversion and merge successful:\n{output_path}")


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
