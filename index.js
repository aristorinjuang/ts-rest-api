"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
const version = '/v1';
const path = '/articles';
var articles = new Map([
    [1, { title: 'Simple REST API with TypeScript', description: "Let's create a simple REST API with TypeScript." }],
]);
app.use(express_1.default.json());
app.get(version + path, (req, res) => {
    res.json(Object.fromEntries(articles));
});
app.post(version + path, (req, res) => {
    let id = articles.size + 1;
    articles.set(id, req.body);
    res.json({ [id]: req.body });
});
app.get(version + path + '/:id', (req, res) => {
    if (articles.get(Number(req.params.id)) === undefined) {
        res.status(404).end();
        return;
    }
    res.json({ [req.params.id]: articles.get(Number(req.params.id)) });
});
app.put(version + path + '/:id', (req, res) => {
    if (articles.get(Number(req.params.id)) === undefined) {
        res.status(404).end();
        return;
    }
    articles.set(Number(req.params.id), req.body);
    res.json({ [req.params.id]: articles.get(Number(req.params.id)) });
});
app.patch(version + path + '/:id', (req, res) => {
    let a = articles.get(Number(req.params.id));
    if (a === undefined) {
        res.status(404).end();
        return;
    }
    a.title = req.body.title || a.title;
    a.description = req.body.description || a.description;
    articles.set(Number(req.params.id), a);
    res.json({ [req.params.id]: a });
});
app.delete(version + path + '/:id', (req, res) => {
    if (articles.get(Number(req.params.id)) === undefined) {
        res.status(404).end();
        return;
    }
    articles.delete(Number(req.params.id));
    res.status(200).end();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
