from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_form_submission_with_validation():
    driver = webdriver.Chrome()
    
    try:
        # 1. 打开测试网页
        driver.get("https://example.com/form-page")
        print("已打开表单页面")
        
        # 2. 填写表单
        # 使用显式等待代替固定等待
        wait = WebDriverWait(driver, 10)
        
        # 填写姓名
        name_field = wait.until(EC.presence_of_element_located((By.ID, "name")))
        name_field.send_keys("张三")
        
        # 填写邮箱
        email_field = driver.find_element(By.NAME, "email")
        email_field.send_keys("zhangsan@example.com")
        
        # 提交表单
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()
        print("已提交表单")
        
        # 3. 获取并验证结果
        # 等待结果页面加载完成
        result_element = wait.until(
            EC.presence_of_element_located((By.ID, "result-message"))
        )
        
        # 获取实际结果文本
        actual_result = result_element.text
        expected_result = "提交成功"  # 根据实际情况修改
        
        print(f"实际结果: {actual_result}")
        print(f"预期结果: {expected_result}")
        
        # 验证结果
        if expected_result in actual_result:
            print("✅ 测试通过：结果验证成功")
            return True
        else:
            print("❌ 测试失败：结果不匹配")
            return False
            
    except Exception as e:
        print(f"测试过程中发生错误: {str(e)}")
        driver.save_screenshot("error_screenshot.png")
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    test_result = test_form_submission_with_validation()
    print("\n测试最终结果:", "通过" if test_result else "失败")