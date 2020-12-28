import {initializeWithDependencies} from "./yamlHelper";
import {createFile, doesFileExist} from "./fileSystemManager";
import {openFile} from "./utils";
import {join} from "path";
import Home from "../dart_snippets/architecture/home";

const init = (rootPath: string) => {
    initPages(rootPath);
    initializeWithDependencies();
};

const initPages = (rootPath: string) => {
    const pagesPath = join(rootPath, 'presentation', 'pages');

    createFile(join(pagesPath, 'home'), 'home_screen.dart', Home());
};

const initRoutes = (rootPath: string) => {

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