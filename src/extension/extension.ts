require('module-alias/register');
import * as vscode from 'vscode';
import ContentProvider from './ContentProvider';
import { startApiServer } from './api';
import { join } from 'path';
const getPort = require('get-port');

let isServerRunning = false;
let port = 0;

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('jestTools.start', () => {
            initialize(context);
        })
    );
}

export function deactivate() {}

async function initialize(context: vscode.ExtensionContext) {
    if (vscode.workspace.rootPath) {
        process.env.projectRoot = vscode.workspace.rootPath;
    }

    if (!isServerRunning) {
        port = await getPort({ port: 4545 });
        await startApiServer(port, context);
        isServerRunning = true;
    }

    const panel = vscode.window.createWebviewPanel(
        'jestTools',
        'Jest Tools',
        vscode.ViewColumn.Two,
        { enableScripts: true }
    );
    const root = join(context.extensionPath, 'icons');
    panel.iconPath = {
        dark: vscode.Uri.file(join(root, 'tiny.png')),
        light: vscode.Uri.file(join(root, 'tiny.png')),
    };

    const contentProvider = new ContentProvider();
    panel.webview.html = contentProvider.getContent(port);

    panel.onDidDispose(() => {}, null, context.subscriptions);
}
