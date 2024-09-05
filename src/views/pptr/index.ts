import puppeteer from 'puppeteer'

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized'],
  })
  console.log('Browser opened', browser)
  const page = await browser.newPage()

  // Navigate the page to a URL.
  await page.goto('http://localhost:5175/crm/index')
  // const input_user = await page.$('.s_iptBox.s_user input')
  // const input_pwd = await page.$('.s_iptBox.s_password input')

  // await input_user?.type('tianxq3')
  // await input_pwd?.type('123456')
  // const verify_area = await page.$('.verify-bar-area')
  // const verify_area_bounding = await verify_area?.boundingBox()

  // 使用 Promise.all 获取以上元素
  const [input_user, input_pwd, verify_area] = await Promise.all(
    [
      '.s_iptBox.s_user input',
      '.s_iptBox.s_password input',
      '.verify-bar-area',
    ].map(async (selector) => {
      return await page.$(selector)
    })
  )
  await input_user?.type('tianxq3')
  await input_pwd?.type('123456')
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

  // await page.locator('.pptr-button').click()
  // browser.close()
}

run()
