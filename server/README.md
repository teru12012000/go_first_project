# バックエンドの説明
## 概要
todoアプリのバックエンドコードである。
### 仕様技術
- Go
- gin
- sqlite3

## 起動手順等
### 前提
ここではGoの環境構築がてきていることを前提とする
- [windows](https://qiita.com/suke_masa/items/0c45c92934b9a2807ddb)
- [mac](https://zenn.dev/y16ra/articles/251c3770365689)

### 起動
1. serverディレクトリに移動する
1. ```
    go run server
    ``` 
    を実行する
1. PORT番号9090でサーバーが立ち上がるはず
1. 起動時にDBも作成される(はず)

※PORT番号がダブっている場合は立ち上がらない

## 動作確認
1. [vscodeの拡張機能であるthundar client](https://qiita.com/youtoy/items/66dda361e369daa8cecb)を使う
2. [postman](https://www.postman.com/)を使う