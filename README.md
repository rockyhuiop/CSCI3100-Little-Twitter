# Express Mongoose Backend Example

呢條 branch 只係例子，只係愛來解釋 backend。我應該無幾耐就會 del 咗渠。
渠而家淨係做得呢幾樣嘢：

- basic authentication flow (register, login, logout)
- delete user
- add tweet
- like / unlike tweets

呢度淨係得 backend，所以用 ejs 啲 template 頂住當先。所有 template 都完全無 styling。

## REST API

GET route 通常都係攞 data, render 網頁嘅地方， POST 就係會改 data 嘅 route。
唔跟 specification，express 都唔會發懞掙，不過跟咗好啲。

## Authentication Flow

- `POST /auth/login` 係處理 login form 嘅 route
- `POST /auth/register` 係處理 register form 嘅 route
- `POST /auth/logout` 係 logout 嘅 route

入面個 flow 好簡單啫，因為有 `express-session`。頭幾行，用 `express-session` 嘅 middleware 就得。
橫掂用緊 MongoDB, 不如用攞渠來當係 session store。呢樣嘢都唔複雜，因為有人已經寫咗 `connect-mongo`。就咁用個 constructor 就得。

register 就得呢幾步：

1. 睇吓啲資料啱唔啱 （廢事 implement 呢步）
2. 整個新 User
3. 入渠落個 database
4. redirect

register 可以順便整埋 session，不過我留返 login 先算

login 係最複雜嘅：

1. 睇吓啲資料啱唔啱 （廢事 implement 呢步）
2. 用個電郵找個 user 出來
3. 無就算啦
4. 有就對下個 password 有無錯
5. 錯就算啦
6. 啱就**整個新 session 畀渠**
7. redirect

整個 session，只係一行嘅事：

```js
res.session.user = user 
```

set 完之後，呢幾件事就會發生：

- 渠自動喺 HTTP response 加咗條 set cookie 嘅 header，value 正正係 encrypt 咗嘅 user
- 因為 set 咗做 cookie，下次 user 問嘢，都會搦埋呢塊曲奇。
- 塊曲奇重識自己 expire 添。

logout 就簡單好多嘞：

1. 銷咗個 session 渠
2. redirect

銷都係一句就得：

```js
res.session.destroy(cb) 
```

destroy 唔畀返 Promise，一定要收 callback。

當然，如果遲啲話用 JWT，Passport.js，乜嘢 social sign in 之類，上面嗰啲都係廢話。不過
最尾都係普通 session 㗎話，上面嗰啲都夠用。用乜 store 都係一樣，Redis，甚至 in memory 啲 logic
都係完全一樣。

有啲 route 係 protected　嘅，即係話未 authenticate　嘅人唔入得。`middlewares`　嗰個 folder 有兩個guard 可以參考。

## Mongoose

`model` 入面又兩個 model，得幾個 field 當示範。

`likes` 只係個裝住 ObjectId 嘅 array。嗰啲 ObjectId，全部都係 User 嘅。

`/` route 有個 aggregation pipeline，將 `userLiked` 同 `likesCount` 加埋落去啲 tweets 到
，完全唔使用 JavaScript logic。呢個應該係 MongoDB 嘅威力掛。

Mongoose 只係 MongoDB 嘅 abstraction，多數 operation 同 Mongo Shell 嗰啲 syntax 完全一樣。

## Express

`MarkCSC-patch-1` 有清楚解說，唔使我饒舌。

## 點樣 run

`npm install` 先，之後跟住 .env.sample 填 .env。

build 完之後 run：

```sh
npm build && npm start
```

`package.json` 列咗個啲 script 都係咁 run 嘅啫。

## 又及

- 最好唔用 TypeScript 寫，因為寫 Express 同 Mongoose 嘅人都無為渠等著想。
- error handling 極亂，千萬唔好學
- 其實我應該用 MVC 寫。而家 controller 就喺啲 route handler嘅 argument 入面，無可能 test 到 
- 就咁 curl, wget 個 server 都得，唔使睇個骨突 user interface

## 奇想

- 試唔試用 GraphQL？
- frontend 用唔用 Next.js？
- 用唔用 JWT？
- TypeORM 會唔會好過 Mongoose？