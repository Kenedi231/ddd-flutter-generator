import {safeLoad, JSON_SCHEMA, safeDump} from 'js-yaml';
import {getEditorConfiguration, getRootPath} from './vscodeActions';
import {isNumber} from 'lodash';
import {readFileAsString, createFile} from './fileSystemManager';

const initializeWithDependencies = () => {
    upgradeDartVersion();
    addDependencyToPubspec('dartz', '0.9.2');
    addDependencyToPubspec('flutter_bloc', '6.1.1');
    addDependencyToPubspec('freezed_annotation', '0.12.0');
    addDependencyToPubspec('get_it', '5.0.3');
    addDependencyToPubspec('injectable', '1.0.7');
    addDependencyToPubspec('kt_dart', '0.8.0');
    addDependencyToPubspec('rxdart', '0.25.0');
    addDependencyToPubspec('uuid', '2.2.2');
    addDependencyToPubspec('auto_route', '0.6.9');
    addDependencyToPubspec('lint', '1.0.0', true);
    addDependencyToPubspec('build_runner', '1.10.11', true);
    addDependencyToPubspec('freezed', '0.12.6', true);
    addDependencyToPubspec('auto_route_generator', '0.6.10', true);
    addDependencyToPubspec('injectable_generator', '1.0.6', true);
    addDependencyToPubspec('json_serializable', '3.5.1', true);
};

const isValidFlutterPudspec = (): string | undefined => {
    const json = getPubspecJson();
    if (!json) {
        return 'Invalid Pudspec format';
    }
    const object = JSON.parse(json);
    if (!object['environment']) {
        return 'No environment definition found';
    }
    if (!object['dependencies']) {
        return 'Definition for dependencies not found';
    }
    if (!object['dependencies']['flutter']) {
        return 'Definition for FLutter in dependencies not found';
    }
    return undefined;
};

const addDependencyToPubspec = (module: string, version?: string, dev: boolean = false) => {
    const json = getPubspecJson();
    if (!json) {
        return;
    }
    const object = JSON.parse(json);
    const depend = dev ? 'dev_dependencies' : 'dependencies';
    object[depend][module] = `^${version}`;
    const modifiedString = JSON.stringify(object);
    console.debug(`UpgradeDartVersion: modified string: ${modifiedString}`);
    const updatedYaml = toYAML(modifiedString);
    if (!updatedYaml) {
        return;
    }
    overwritePubspecFile(updatedYaml);
};

const upgradeDartVersion = () => {
    const json = getPubspecJson();
    if (!json) {
        return;
    }
    const object = JSON.parse(json);
    object['environment']['sdk'] = '>=2.7.0 <3.0.0';
    const modifiedString = JSON.stringify(object);
    console.debug(`UpgradeDartVersion: modified string: ${modifiedString}`);
    const updatedYaml = toYAML(modifiedString);
    if (!updatedYaml) {
        return;
    }
    overwritePubspecFile(updatedYaml);
};

const overwritePubspecFile = (content: string) => {
    createFile(getRootPath(), 'pubspec.yaml', content);
};

const getPubspecJson = (): string | undefined => {
    const rootPath = getRootPath();
    const fileData = readFileAsString(rootPath, 'pubspec.yaml');
    if (!fileData) {
        console.debug('Pubspec.yaml not found');
        return undefined;
    }
    return toJSON(fileData);
};

const toYAML = (text: string) => {
    try {
        console.debug(`toYAML: ${text}`);
        const yaml =  safeDump(JSON.parse(text), {indent: getIndent()});
        return yaml;
    } catch(e) {
        console.log(e);
        return;
    }
};

const toJSON = (text: string) => {
    try {
        console.debug(`toJSON: ${text}`);
        const json = JSON.stringify(safeLoad(text, {schema: JSON_SCHEMA}), null, getIndent());
        return json;
    } catch(e) {
        console.error(e);
        return;
    }
};

const getIndent = (): number => {
    const editorConfig = getEditorConfiguration();
    if (editorConfig && editorConfig.get('insertSpaces')) {
        const tabSize = editorConfig.get('tabSize');
        if (tabSize && isNumber(tabSize)) {
            return tabSize;
        }
    }
    return 2;
};

export {initializeWithDependencies, isValidFlutterPudspec};