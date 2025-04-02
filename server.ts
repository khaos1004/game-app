// // server.ts
// import next from 'next'
// import { createServer } from 'https'
// import { createServer as createHttpServer } from 'http'
// import { parse } from 'url'
// import fs from 'fs'

// const port = 443
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const httpsOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
// }

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url!, true)
//     handle(req, res, parsedUrl)
//   }).listen(port, () => {
//     console.log(`> HTTPS Ready on https://localhost:${port}`)
//   })

//   // 선택: 80 포트 → 443 리디렉션
//   createHttpServer((req, res) => {
//     res.writeHead(301, {
//       Location: 'https://' + req.headers.host + req.url,
//     })
//     res.end()
//   }).listen(80)
// })
