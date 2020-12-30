import {mkdir} from 'shelljs';
import {exec} from 'child_process';

const createDir = (path: string) => {
  mkdir('-p', path);
};

const runPubGet = () => {
  exec('flutter pub get');
};

const runBuildRunner = () => {
  exec('flutter pub run build_runner build --delete-conflicting-outputs');
}

export {createDir, runPubGet, runBuildRunner};