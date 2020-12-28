import {initializeWithDependencies} from './yamlHelper';
import {createFile, doesFileExist} from './fileSystemManager';
import {openFile} from './utils';
import {join} from 'path';
import Home from '../dart_snippets/architecture/home';
import AppWidget from '../dart_snippets/architecture/app_widget';
import Main from '../dart_snippets/architecture/main';
import Injection from '../dart_snippets/architecture/injection';
import Router from '../dart_snippets/architecture/router';

const init = (rootPath: string) => {
    initPages(rootPath);
    initRoutes(rootPath);
    initializeWithDependencies();

    createNewFile(join(rootPath, 'presentation'), 'app_widget.dart', AppWidget('DDD Flutter App'));
    createNewFile(rootPath, 'injection.dart', Injection());
    createExistingFile(rootPath, 'main.dart', Main());
};

const initPages = (rootPath: string) => {
    const pagesPath = join(rootPath, 'presentation', 'pages');

    createNewFile(join(pagesPath, 'home'), 'home_screen.dart', Home());
};

const initRoutes = (rootPath: string) => {
    const routesPath = join(rootPath, 'presentation', 'routes');

    createNewFile(routesPath, 'router.dart', Router());
};

const createNewFile = (filePath: string, fileName: string, content: string) => {
    if (doesFileExist(filePath, fileName)) {
        console.error(`${fileName} already exists`);
        return;
    }

    createFile(filePath, fileName, content);
    openFile(join(filePath, fileName));
};

const createExistingFile = (filePath: string, fileName: string, content: string) => {
    createFile(filePath, fileName, content);
    openFile(join(filePath, fileName));
};

export {init};