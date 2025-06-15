#!/usr/bin/env node

// 必要なライブラリをインポートします
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// 現在のファイルのパスを取得するための設定です
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// メインの処理をここに書いていきます
async function main() {
  console.log(chalk.blue('プロジェクトのセットアップを開始します...'));

  // 1. ユーザーにプロジェクト名を質問します
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'プロジェクト名を入力してください:',
      validate: input => input ? true : 'プロジェクト名を入力してください。'
    }
  ]);

  const projectName = answers.projectName;
  // ユーザーがツールを実行した場所に、新しいプロジェクト用のディレクトリパスを準備します
  const projectDir = path.resolve(process.cwd(), projectName);

  // 2. もし同じ名前のディレクトリが既に存在したら、エラーを出して終了します
  if (fs.existsSync(projectDir)) {
    console.error(chalk.red(`エラー: ディレクトリ '${projectName}' は既に存在します。`));
    process.exit(1);
  }
  // 新しいプロジェクト用のディレクトリを作成します
  fs.mkdirSync(projectDir);

  // 3. 設計図（テンプレート）をコピーします
  const templateDir = path.resolve(__dirname, 'templates', 'vanilla-js');
  await fs.copy(templateDir, projectDir);

  // 完了メッセージを表示します
  console.log(chalk.green(`\n🎉 プロジェクト '${projectName}' の作成が完了しました！`));
  console.log(chalk.yellow(`\n以下のコマンドでプロジェクトを開始できます:\n`));
  console.log(`  cd ${projectName}`);
}

// main関数を実行し、もしエラーが起きたら赤文字で表示します
main().catch(err => {
  console.error(chalk.red('エラーが発生しました:'), err);
});
