import time
from selenium import webdriver
from twocaptcha import TwoCaptcha
from selenium.webdriver.common.by import By

solver = TwoCaptcha('YOUR_API_KEY')

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
driver = webdriver.Chrome(options=options)

driver.get("https://www.oddschecker.com/football")

time.sleep(5)

print("here")
driver.get_screenshot_as_file("./foo.png")


if "Checking your browser" in driver.page_source:
    # Wait for a few seconds and retry

    time.sleep(5)
    # continue here
    time.sleep(10)
else:
    driver.find_element(By.CLASS_NAME,'inside-close-button').click()
    driver.get_screenshot_as_file("./foo2.png")


driver.quit()