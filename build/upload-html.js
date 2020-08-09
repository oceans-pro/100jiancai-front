const Client = require('ftp')
const fs = require('fs')
const path = require('path')
const {ftpConfig} = require('../secret')
const client = new Client()
const fullPath = path.join(__dirname, '../dist/index.html')
// 这里的路径相对于 package.json来说的，当路径不存在时，ftp会将路径当作内容塞到html中....
// 为了避免这种情况（使用node环境和npm环境不一致...即本js右键运行、package.json写好脚本运行），这里尽量使用绝对路径
client.on('ready', function () {
  client.put(fullPath, 'index.html', function (err) {
    if (err) throw err
    client.end()
  })
})
client.connect(ftpConfig)


/*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                    docs: https://www.npmjs.com/package/ftp
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/

// Get a directory listing of the current (remote) working directory
// client.on('ready', function () {
//   client.list(function (err, list) {
//     if (err) throw err
//     console.dir(list)
//     client.end()
//   })
// })

// Download remote file 'foo.txt' and save it to the local file system:
// client.on('ready', function() {
//   client.get('foo.txt', function(err, stream) {
//     if (err) throw err;
//     stream.once('close', function() { client.end(); });
//     stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
//   });
// });

// Upload local file 'foo.txt' to the server:
// client.on('ready', function() {
//   client.put('foo.txt', 'upload.remote-foo.txt', function(err) {
//     if (err) throw err;
//     client.end();
//   });
// });
