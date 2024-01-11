interface Tmp {
  user:
    | {
        vip: true
        expires: string
      }
    | {
        vip: false
        time: string
      }
}

declare const tmp: Tmp

// if(tmp.user.vip) {
//   console.log('cc', tmp.user.expires)
// }

const returnNum = () => 100 + 499
enum Items {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}

type T1 = '1'
type T2 = '2'
type T3 = '3'
type T4 = '4'
type TAll = T1 | T2 | T3 | T4

const fooValue = Items[599]
console.log('fooValue', fooValue)
const tNum: TAll = '4'

function func(foo: number, bar?: true): string
function func(foo: number, bar?: false): number
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo)
  } else {
    return foo * 599
  }
}

const res1 = func(599) // number
const res2 = func(599, true) // string
const res3 = func(599, false) // number
console.log(res1, res2, res3)

class Base {
  public name: string = 'txq'
  printWithLove() {
    console.log('Base')
  }
}

class Derived extends Base {
  override printWithLove(): void {
    console.log('Derived')
    console.log('nn', this.name)
  }
}

const base = new Base()
base.printWithLove()
const derived = new Derived()
derived.printWithLove()

// SOLID 原则 ⭐️⭐️⭐️⭐️⭐️

abstract class LoginHandler {
  abstract handler(): void
}

class WeChatLoginHandler implements LoginHandler {
  handler(): void {
    console.log('WeChatLoginHandler')
  }
}

class QQLoginHandler implements LoginHandler {
  handler(): void {
    console.log('QQLoginHandler')
  }
}
class TaoBaoLoginHandler implements LoginHandler {
  handler() {
    console.log('TaoBaoLoginHandler')
  }
}

class TikTokLoginHandler implements LoginHandler {
  handler() {
    console.log('TikTokLoginHandler')
  }
}
enum LoginType {
  WeChat,
  TaoBao,
  TikTok,
  QQ,
}
class Login {
  public static handleMap: Record<LoginType, LoginHandler> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler(),
    [LoginType.TikTok]: new TikTokLoginHandler(),
    [LoginType.QQ]: new QQLoginHandler(),
  }

  public static handler(type: LoginType) {
    Login.handleMap[type].handler()
  }
}

// use
Login.handler(LoginType.TaoBao)
