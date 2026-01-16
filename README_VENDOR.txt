离线使用（不依赖外部 CDN）——把下列文件/目录放到仓库根目录：

/vendor/hanzi-writer.min.js
/vendor/hanzi-writer-data/        （包含大量 JSON，文件名为 CJK 码点，如 8a00.json）

获取方式：
1) 访问任意一个 CDN（任选其一）下载：
   - https://unpkg.com/hanzi-writer@2.1.2/dist/hanzi-writer.min.js
   - https://cdn.jsdelivr.net/npm/hanzi-writer@2.1.2/dist/hanzi-writer.min.js
   - https://cdnjs.cloudflare.com/ajax/libs/hanzi-writer/2.1.2/hanzi-writer.min.js

2) 字形数据（hanzi-writer-data）仓库：
   - https://github.com/chanind/hanzi-writer-data
   在 release 或 npm 包中找到 2.0 版本，将文件夹重命名为 hanzi-writer-data 放到 /vendor/ 下。

完成后，本网站会优先使用本地 /vendor/ 路径；上线校园网也可使用。
