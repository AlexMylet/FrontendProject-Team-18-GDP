# API Contribution

## Adding to the API

[source](https://rapidapi.com/guides/call-apis-react-query)

The following is an example API end-point, saved in the file `src/api/v1/a/b.ts`:

```ts
import { Router, Request, Response } from "express";

const router = Router();

router.post("/api/v1/a/b/c", (req: Request, res: Response) => {
    // The object req.body represents the JSON request
    // So here, the JSON would look like {"goal": {"name": ..., ...}, ...}
    const name = req.body.goal.name
    res.json({ ... })
});

export default router;
```

After this, you need to edit [api.ts](./src/api/api.ts):

a. Below the "Route imports" comment, add

```ts
import abRoutes from "./v1/a/b"
```

b. Below the "Route usage" comment, add

```ts
app.use("/", abRoutes)
```

Convention:

Store all endpoints of the form `/api/v1/a/b/c`, where c varies and there are no `api/v1/a/b/c/d` APIs, in the file `src/api/v1/a/b` (so all the goals APIs get stored in the same file, for example)

## Calling the API

### GET

The following performs a GET request, with nothing sent to the server, takes the result as JSON and wraps it in a component ([source](https://rapidapi.com/guides/call-apis-react-query)).

Required import:

```tsx
import useQuery from "@tanstack/react-query";
```

```tsx
function APIComponent() {
    const callAPI = async () => {
        const res = await fetch("http://api.example.com/api/example")
        return res.json()
    }
    const {data, error, isLoading} = useQuery({ queryKey: ['someUniqueID'], queryFn: callAPI})
    return <div>
    {
        error ? <div>Query failed</div>
        : isLoading ? <div>Loading ...</div>
        : <div>Success</div>
    }
}
```

You then may wish to use data to display some useful information.

### POST

Modify the above by using a POST by [doing](https://stackoverflow.com/questions/29775797/fetch-post-json-data)

```ts
    const res = await fetch("http://api.example.com/api/example",
      {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({a: 1, b: "Hello"})
      }
    )
```

#### If you don't mutate server state

Then you don't need to do anything else.

#### If you mutate server state

Then you should use a [mutation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations).

You should change the line with a `useQuery` to be

```ts
const mutation = useMutation({ mutationFn: callAPI })
```

You can then use this as follows

```tsx
  return <div>
  {
    <>
    { mutation.isError ? <div>Query failed: {mutation.error.message}</div> : null }
    { mutation.isPending ? <div>Pending ...</div> : null }
    { mutation.isSuccess ? <div>Success</div> : null }
    <button onClick={() => {mutation.mutate()}}>Mutate</button>
    </>
  }
  </div>
```
