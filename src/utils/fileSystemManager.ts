import {existsSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {openFile} from './utils';
import {getRootPath, showErrorMessage} from './vscodeActions';

const createFile = (filePath: string, fileName: string, content: string) => {
    const newFilePath = join(filePath, fileName);
    writeFileSync(newFilePath, content);
    openFile(newFilePath);
};

const doesFileExist = (filePath: string, fileName: string): boolean => {
    return existsSync(join(filePath, fileName));
};

const readFileAsString = (filePath: string, fileName: string): string | undefined => {
    if (!doesFileExist(filePath, fileName)) {
        return undefined;
    }
    const buffer = readFileSync(join(filePath, fileName));
    return buffer.toString();
};

const isFlutterProject = (): boolean => {
    const rootPath = getRootPath();
    if (!existsSync(join(rootPath, 'pubspec.yaml'))) {
        showErrorMessage('Pubspec.yaml not found');
        return false;
    }
    return true;
};

export {readFileAsString, createFile, isFlutterProject, doesFileExist};
