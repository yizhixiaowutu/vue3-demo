import puppeteer, { Browser } from 'puppeteer'
import { userInfo, webPageUrl } from './constants'
// import os from 'node:os'
// import path from 'node:path'

// 模拟加载动画
function startLoading() {
  const loadingChars = ['|', '/', '-', '\\']
  let index = 0

  const intervalId = setInterval(() => {
    process.stdout.write(`\r${loadingChars[index]}`)
    index = (index + 1) % loadingChars.length
  }, 100)

  return intervalId
}

// 停止加载动画
function stopLoading(intervalId: NodeJS.Timer) {
  clearInterval(intervalId)
  process.stdout.write('\r') // 清除加载动画
}

const browserLaunch = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-fullscreen'],
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // userDataDir: path.join(os.homedir(), '.puppeteer-data'),
  })
  console.log('--- browser launched ---')
  return browser
}

const browserClose = async (browser: Browser) => {
  console.log('--- browser closed ---')
  await browser.close()
}

const openWebPage = async (browser: Browser) => {
  try {
    const page = await browser.newPage()
    await page.goto(webPageUrl)
    // await page.keyboard.down('')
    // await page.keyboard.press('F')
    // await page.keyboard.up('Control')

    const [input_user, input_pwd, verify_area] = await Promise.all(
      [
        '.s_iptBox.s_user input',
        '.s_iptBox.s_password input',
        '.verify-bar-area',
      ].map(async (selector) => {
        return await page.$(selector)
      })
    )
    await input_user?.type(userInfo.operatorName) // 用户名
    await input_pwd?.type(userInfo.password) // 密码
    const verify_area_bounding = await verify_area?.boundingBox()
    const verify_move_block = await page.$('.verify-move-block')
    const verify_move_block_bounding = await verify_move_block?.boundingBox()
    if (verify_area_bounding && verify_move_block_bounding) {
      const distance =
        verify_area_bounding.width - verify_move_block_bounding.width
      console.log('distance', distance)
      // 计算起始点和目标点
      const startX =
        verify_move_block_bounding.x + verify_move_block_bounding.width / 2
      const startY = verify_area_bounding.y + verify_area_bounding.height / 2
      const endX = startX + distance
      const endY = startY // 保持在同一水平线上

      // 模拟拖动操作
      await page.mouse.move(startX, startY)
      await page.mouse.down()
      await page.mouse.move(endX, endY, { steps: 10 })
      await page.mouse.up()
    }

    const login_btn = await page.$('.s_btnBox button')
    await login_btn?.click()
  } catch (error) {
    throw new Error('openWebPage error: ' + error)
  }
}

const testRequest = async () => {
  const loadingInterval = startLoading()
  try {
    const response = await fetch(
      'http://srsbiz.kq.ziroom.com/config/classification/create/query/word/v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operatorCode: userInfo.operatorCode,
          operatorName: userInfo.operatorName,
          name: '特殊级联配置',
          typeCode: '8a9e9b94732228f401732228f49f0a23',
        }),
      }
    )
    const responseJson = response.json()
    const { data } = responseJson as any
    return data || null
  } catch (error) {
  } finally {
    stopLoading(loadingInterval)
  }
}

const main = async () => {
  const browser = await browserLaunch()
  try {
    // await openWebPage(browser)
    const result = await testRequest()
    console.log('result', result)
  } catch (error) {
    console.error(error)
    await browserClose(browser)
  }
}

main()
