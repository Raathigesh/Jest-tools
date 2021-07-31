import * as express from 'express';
import * as vscode from 'vscode';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { initializeStaticRoutes } from './static-files';
import writeAndGetScriptFile from './writeAndGetScriptFile';

const StorageKeys = {
    scriptPath: 'jestTools-lastUsedScriptPath',
    port: 'jestTools-lastUsedPort',
};

export async function startApiServer(
    port: number,
    context: vscode.ExtensionContext
) {
    const app = express();
    app.use(bodyParser());
    app.use(cors());
    initializeStaticRoutes(app, port);

    let scriptPath: string = '';
    const lastUsedPort = context.workspaceState.get(StorageKeys.port);
    const lastUsedPath = context.workspaceState.get(StorageKeys.scriptPath);
    if (lastUsedPort === port && lastUsedPath !== undefined) {
        scriptPath = context.workspaceState.get(StorageKeys.scriptPath) || '';
    } else {
        scriptPath = writeAndGetScriptFile(port);
        context.workspaceState.update(StorageKeys.scriptPath, scriptPath);
        context.workspaceState.update(StorageKeys.port, port);
    }

    let logs: { id: string; content: string }[] = [];

    app.post('/document', function(req, res) {
        logs.push({
            id: new Date().getUTCMilliseconds().toString(),
            content: req.body.content,
        });

        res.send('OK');
    });

    app.get('/document', function(req, res) {
        res.json({ logs });
    });

    app.get('/getArgs', (req, res) => {
        res.json({
            args: `--setupTestFrameworkScriptFile=${scriptPath}`,
        });
    });

    app.get('/clear', (req, res) => {
        logs = [];
        res.send('OK');
    });

    app.get('/preview/:id', (req, res) => {
        const id = req.params.id;
        const item = logs.find(l => l.id === id);
        res.append('content-type', 'text/html; charset=utf-8');
        res.send(item?.content);
    });

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            const url = `http://localhost:${port}`;
            console.log(`⚡  Insight is running at ${url} `);
            resolve(null);
        });
    });
}
