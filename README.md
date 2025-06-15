## プロジェクト初期設定ツール (my-scaffolder)

対話形式で質問に答えるだけで、面倒なプロジェクトの初期設定を自動化するCLIツールです。

## 特徴

対話形式で誰でも簡単に操作可能
JavaScript / React のテンプレートに対応
`git init` や `npm install` の自動実行

## 使い方

1.  このツールをグローバルにインストールします。
    
    npm install -g YOUR_PACKAGE_NAME
    
2.  プロジェクトを作成したいディレクトリで、以下のコマンドを実行します。
    
    my-scaffolder
    
3.  あとは質問に答えるだけです！

## 使用技術

* Node.js
* Inquirer.js
* Chalk
* Execa
* fs-extra