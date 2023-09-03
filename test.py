from selenium import webdriver
from selenium.webdriver.common.by import By
options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
caps = webdriver.DesiredCapabilities.CHROME.copy()
caps['goog:loggingPrefs'] = {'performance': 'ALL'} 
driver = webdriver.Chrome(options=options)

driver.get("https://www.oddschecker.com/football")

driver.get_screenshot_as_file("scr/foo.png")

# Wait for Cloudflare to finish running
for entry in driver.get_log('performance'):
    if entry['message']['method'] == 'Network.responseReceived':
        if 'cf-chl-bypass' in entry['message']['params']['response']['url']:
            break

# Scrape page here...

# driver.get_screenshot_as_file("foo.png")


driver.quit()