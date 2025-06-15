#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.blue('プロジェクトのセットアップを開始します...'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'プロジェクト名を入力してください:',
      validate: input => input ? true : 'プロジェクト名を入力してください。'
    }
  ]);

  const projectName = answers.projectName;
  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error(chalk.red(`エラー: ディレクトリ '${projectName}' は既に存在します。`));
    process.exit(1);
  }
  fs.mkdirSync(projectDir);

  const templateDir = path.resolve(__dirname, 'templates', 'vanilla-js');
  await fs.copy(templateDir, projectDir);

  console.log(chalk.green(`\n🎉 プロジェクト '${projectName}' の作成が完了しました！`));
  console.log(chalk.yellow(`\n以下のコマンドでプロジェクトを開始できます:\n`));
  console.log(`  cd ${projectName}`);
}

main().catch(err => {
  console.error(chalk.red('エラーが発生しました:'), err);
});
