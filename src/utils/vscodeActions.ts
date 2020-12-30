import {
    workspace,
    WorkspaceConfiguration,
    window,
} from 'vscode';
import {isUndefined} from 'lodash';

const getRootPath = () => {
    let rootPath = workspace.rootPath;
    if (isUndefined(rootPath)) {
        return '';
    }
    return rootPath;
};

const getEditorConfiguration = (): WorkspaceConfiguration => {
    return workspace.getConfiguration('editor');
};

const showErrorMessage = (message: string) => {
    window.showErrorMessage(message);
};

const execute = () => {
    
};

export {getRootPath, getEditorConfiguration, showErrorMessage, execute};