import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "ddd-flutter-generator" is now active!');
	const wsedit = new vscode.WorkspaceEdit();

	let initialize = vscode.commands.registerCommand('ddd-flutter-generator.initialize', async () => {
		vscode.window.showInformationMessage('Initialize from DDD-Flutter-Generator!');
	});

	let createScreen = vscode.commands.registerCommand('ddd-flutter-generator.createscreen', async () => {
		const workspaces = vscode.workspace.workspaceFolders;
		if (!workspaces) {
			vscode.window.showInformationMessage('Workspace not open');
			return;
		}
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Creating screen",
			cancellable: true
		}, async (progress: any, token: any) => {
			token.onCancellationRequested(() => {
				console.log("User canceled the long running operation");
			});

			progress.report({ increment: 0 });

			progress.report({ increment: 20, message: "Get name from input" });
			const input = await vscode.window.showInputBox();

			progress.report({ increment: 50, message: "Creating path" });
			const wsPath = workspaces[0].uri.fsPath;
			const filePath = vscode.Uri.file(`${wsPath}/screen/${input}.dart`);

			wsedit.createFile(filePath, { ignoreIfExists: true });
			vscode.workspace.applyEdit(wsedit);
			progress.report({ increment: 30, message: "Finish" });

			const p = new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 5000);
			});

			return p;
		});
	});

	context.subscriptions.push(createScreen);
	context.subscriptions.push(initialize);
}

export function deactivate() {}
