# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
from requests.auth import HTTPBasicAuth
import os


def get_chrome_driver():
    """统一的 ChromeDriver 配置，可复用本地 Chrome 数据"""
    chrome_options = Options()
 
    chrome_options.add_experimental_option("detach", True)  # 浏览器运行后不自动关闭

    return webdriver.Chrome(options=chrome_options)


def request_with_auth(url, username, password):
    """使用 requests 验证 BasicAuth 是否可访问"""
    response = requests.get(url, auth=HTTPBasicAuth(username, password))
    print("HTTP 状态码:", response.status_code)
    return response


def open_and_get_token(driver, url, username, password):
    """使用 Selenium 打开带 BasicAuth 的页面并获取 Token"""
    # 拼接带账号密码的 URL
    auth_url = f"http://{username}:{password}@{url.split('://')[1]}"
    driver.get(auth_url)

    # 等待 body 元素出现
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

    # 读取 localStorage
    local_storage = driver.execute_script("return window.localStorage;")
    token = local_storage.get("Token")
    print(f"✅ 获取到 Token: {token}")
    return token


def set_localstorage(driver, url, key, value):
    """在目标 URL 写入 localStorage"""
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

    driver.execute_script(f"window.localStorage.setItem('{key}', '{value}');")
    stored_value = driver.execute_script(f"return window.localStorage.getItem('{key}');")
    print(f"✅ 已写入 localStorage: {key} = {stored_value}")

if __name__ == "__main__":
    username = "liu_qihao"
    password = "jiejie520@"
    url = "http://siemens-email.ccw.lab/#/main/emailList"

    # Step 1: 用 requests 验证接口
    request_with_auth(url, username, password)

    # Step 2: 启动浏览器（复用本地配置）
    driver = get_chrome_driver()

    # Step 3: 获取 Token
    token = open_and_get_token(driver, url, username, password)

    # Step 4: 把 Token 保存到另一个地址
    if token:
        set_localstorage(driver, "http://localhost:4399/#/main/emailList", "Token", token)

    # ✅ 注意：这里不要 quit()，否则 localStorage 会丢失
    # driver.quit()
