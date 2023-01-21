import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 8080;
const version: string = '/v1';
const path: string = '/articles';

type article = {
  title: string
  description: string
}

var articles: Map<number, article> = new Map<number, article>([
  [1, {title: 'Simple REST API with TypeScript', description: "Let's create a simple REST API with TypeScript."}],
]);

app.use(express.json())

app.get(version + path, (req: Request, res: Response) => {
  res.json(Object.fromEntries(articles));
})

app.post(version + path, (req: Request, res: Response) => {
  let id: number = articles.size + 1
  articles.set(id, req.body)
  res.json({[id]: req.body});
})

app.get(version + path + '/:id', (req: Request, res: Response) => {
  if (articles.get(Number(req.params.id)) === undefined) {
    res.status(404).end()

    return
  }

  res.json({[req.params.id]: articles.get(Number(req.params.id))});
})

app.put(version + path + '/:id', (req: Request, res: Response) => {
  if (articles.get(Number(req.params.id)) === undefined) {
    res.status(404).end()

    return
  }

  articles.set(Number(req.params.id), req.body)
  res.json({[req.params.id]: articles.get(Number(req.params.id))});
})

app.patch(version + path + '/:id', (req: Request, res: Response) => {
  let a = articles.get(Number(req.params.id));

  if (a === undefined) {
    res.status(404).end()

    return
  }

  a.title = req.body.title || a.title;
  a.description = req.body.description || a.description;

  articles.set(Number(req.params.id), a)

  res.json({[req.params.id]: a});
})

app.delete(version + path + '/:id', (req: Request, res: Response) => {
  if (articles.get(Number(req.params.id)) === undefined) {
    res.status(404).end()

    return
  }

  articles.delete(Number(req.params.id))
  res.status(200).end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
