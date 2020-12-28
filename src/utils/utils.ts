import {Uri, workspace, window} from "vscode";

const openFile = (filePath: string) => {
    console.info(`open file: ${filePath}`);
    const openPath = Uri.file(filePath);

    workspace.openTextDocument(openPath).then((document) => {
        window.showTextDocument(document);
    });
};

export {openFile};