import path from 'path';
import fs from 'fs';

export default function errorLog(error: unknown) {
  const errors = error as unknown as Error;
  const cwd = process.cwd();
  const logFileDirectory = path.join(cwd + '/public/logs');

  if (!fs.existsSync(logFileDirectory)) {
    fs.mkdirSync(logFileDirectory, {recursive: true});
  }

  const fileName = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.txt`;
  const logFilePath = path.join(logFileDirectory, fileName);

  const fileExist = fs.existsSync(logFilePath);

  if (fileExist) {
    fs.appendFileSync(
      logFilePath,
      `\n ${errors?.message} \n ${errors?.name} \n ${errors?.stack}`,
    );
  } else {
    fs.writeFileSync(
      logFilePath,
      `\n ${errors?.message} \n ${errors?.name} \n ${errors?.stack}`,
    );
  }

  return errors;
}
