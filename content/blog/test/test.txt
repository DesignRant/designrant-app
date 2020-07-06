# This Blog post was added automatically.

## How?

By using three API requests. All these requests require OAuth2 - talk to sam about getting it.

#### Get the current `sha` from master using this:

```
GET https://api.github.com/repos/:owner/:repo/git/ref/:ref
```

owner:slarsendisney
repo:designrant-app
ref:heads/master

#### Create a new branch for our new content:

```
POST https://api.github.com/repos/:owner/:repo/git/refs
```

owner:slarsendisney
repo:designrant-app

`body`:

```
{
    "ref": "refs/heads/content/2020-07-06-My-Test-Post",
    "sha": "b66c473e1a95dc4dd4f033d1a28cb7bae0edc43d"
}
```

The `sha` must match the one retrieved from master in the previous step. Branch name is what comes after `refs/heads/`.

#### Add file to the branch:

```
PUT https://api.github.com/repos/:owner/:repo/contents/:path
```

owner:slarsendisney
repo:designrant-app
path:content/blog/test/index.md

Note the path here is to the absolute file you want to create

`body`:

```
{
  "message": "Content: 2020-07-06-My-Test-Post",
  "committer": {
    "name": "DesignRantBot",
    "email": "hello@designrant.app"
  },
  "branch":"content/2020-07-06-My-Test-Post",
  "content": "VGhpcyBpcyBhIHRlc3Q="
}
```

Yes the committer is me the bot! The branch must match the one we just created. Content is our content base-64 encoded.

## Awesome what's next?

Well we just have to raise a PR!

```
POST https://api.github.com/repos/:owner/:repo/pulls
```

owner:slarsendisney
repo:designrant-app

`body`:

```
{
  "title": "An Automated PR",
  "body": "This was all automated by the DesignRantBot!",
  "head": "content/2020-07-06-My-Test-Post",
  "base": "master"
}
```





