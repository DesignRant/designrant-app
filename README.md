<div align="center">
  <img alt="Logo" src="https://ik.imagekit.io/sld/cover_odI2P6tOsR.png" width="1000"/>
</div>

# 👋 Welcome to DesignRant's Repository

#### [You can see it live @ DesignRant.app ](https://designrant.app/)

#### What Is DesignRant?

We all try to remain positive people but occassionally we need to complain. This site is a place to vent about some of the user interfaces and experiences that drive us all insane.

I ‘d like to point out that while we can be quite negative here, we also think that there are plenty of examples out there where people have built awesome, friendly and beautiful user interfaces. Perhaps in the future we will build a site dedicated to these too.

#### Get Noticed

DesignRant puts the Authors first. DesignRant has no ads or sponsors so we cannot pay you for your content, but we can help you get exposure. We actively encourage cross posting as we understand your reach is important.

Each writer has a dedicated page that is linked to wherever your content is. The author page is for you, the link to your personal site and your sponsorship pages are the only primary call to actions. We currently have support for your twitter handle, personal site link, ko-fi and buymeacoffee with more coming soon. We are also open to suggestions on what we should add to author profiles.

The whole site is built using our favourite react framework - Gatsby! If you haven't heard of it, you should check it out here: [`Learn Gatsby`](https://www.gatsbyjs.org/)

#### Contributing Posts

We encourage contributions from any individual, whether your'e a student, working in UX or are just passionate about the subject. In order to keep the posts "short & sharp" there is a **limit of 1000 words per post**. Please ensure you come in under that amount when contributing.

##### Still keen?

## How to contribute

### Setup

1. Ensure you have Git on your local machine where you will be writing. Download it here if you don't: [`Get Git`](https://git-scm.com/downloads)
2. Fork this repository into your own Github account. This creates a copy of the repository in your account. You can fork by clicking the Fork button at the top of the repository.
3. Go to the forked repository that is now in your account and clone it. Get the clone URL by clicking on the green Code button and copy the URL to your clipboard (Will look something like https://github.com/Clariity/designrant-app.git). Then on the command line do: `git clone https://github.com/YourUsername/designrant-app.git`
4. Once the clone has completed, on the command line enter the following to change to the Design Rant directory: `cd designrant-app`
5. Use the command line to create a new branch for the post you wish to write, for example: `git checkout -b your-branch-name`
6. Set a remote called "upstream" that references the the main Design Rant repo (will be needed for later): `git remote add upstream https://github.com/slarsendisney/designrant-app.git`

### Adding content

#### Add yourself as an author:

First add a square PNG or JPEG of yourself to `content/avatar`. Use your initials to name the file e.g. if your name is John Smith the file name would be `js-avatar.png`.

Add yourself to the `author.yaml` file that can be found in the content folder. Your entry should have the following format:

```yaml
- id: Sam Larsen-Disney
from: Brighton, UK
shortBio: Creator of Design Rant.
bio: "Creator of Design Rant. When he's not complaining, he likes documenting the cool things he learns and helping the next generation to code."
website: https://sld.codes
avatar: avatars/sld-avatar.png
twitter: SamLarsenDisney
kofi: sldcodes
buymeacoffee: lLj8yvRAk
```

Please note that `id`, `from`,`shortBio`, `bio` and `avatar` are required. All other fields are optional but encouraged.

- `id` - Your name as you would like it to be appear on the site
- `shortBio` - 50 character limit
- `bio` - 200 character limit
- `website` - full web address including http/https
- `avatar`- the file name should match the file you have added to /avatar
- `twitter` - your twitter handle without the "@"
- `ko-fi` - the path to your ko-fi page _e.g. if your page is at https://ko-fi.com/sldcodes then you would enter `sld.codes`_
- `buymeacoffee` - the path to your buymeacoffee page _e.g. if your page is at https://www.buymeacoffee.com/lLj8yvRAk then you would enter `lLj8yvRAk`_

If you provide both a `ko-fi` link and a `buymeacofee` link then only the `ko-fi` link will be used.

Once you have added yourself as an author, you do not need to do it again for subsequent posts.

**Author submissions will only be accepted if the pull request also contains a post. You can't be an author without a post.**

### Add your post

Create a folder in `/content/blog` for your post. The folder should be named with the following format `YYYY-MM-DD post-title` where the date is the date you are submitting the post. The Markdown file (you should name it `index.md`) and any images linked to in the markdown should be placed in this folder. You should also add a hero image to this folder that will be used as the article preview.

Add front-matter to the top of the markdown post in this format:

```markdown
---
title: Does Disney+ need space(bar)?
author: Sam Larsen-Disney
date: "2020-05-04"
type: Post
description: You'd think that a company late to the party would have worked out the importance of the biggest button on our keyboard.
hero: "./cover-img.png"
tags: ["Streaming", "Media", "UX"]
---
```

All lines must be filled in and not left empty. Please ensure that the author name matches the author id in `author.yaml`. Your post may contain a maximum of 3 tags.

#### Ready to raise the PR?

Checklist for submission:

- I have added myself to the author.yaml ✅
- I have added an image of myself to `content/avatar` ✅
- My shortBio is under 50 characters and my bio is under 200 characters ✅
- My post is under 1000 words ✅
- I have checked for spelling mistakes ✅
- I added the relevant front matter to my post ✅
- I have included a maximum of 3 tags ✅
- I have added a hero image ✅

Looks like you're good to go 🎉

### Publishing your content

1. Stage your local changes by executing `git add .` in the command line
2. Commit your changes by executing `git commit -m "Added a new awesome rant on Disney+"`
3. Push your changes to your forked repository using the command `git push --set-upstream origin your-branch-name` or if this isn't your first time then use `git push origin your-branch-name`
4. You will see the new commit on GitHub. Click the "Compare & pull request" button and then "Create pull request". This will request to merge into the master branch of `slarsdisney/designrant-app`
5. If all done correctly, your pull request will be approved and your post will be live
6. As you're now hooked on ranting about poor designs, when you want to contribute again in the future you will need to sync the updated master branch with your fork. To do this, enter the following commands on the command line:
   ```
   git checkout master
   git pull upstream master
   ```
   Do this before you want to add another post and then just checkout to a new branch using `git checkout -b your-new-branch-name` and repeat the steps from the point of [`Add your post`](#add-your-post)

## 🚨 Forking this repo for use on another project

Yes, you can fork this repo. Please give us proper credit by linking back to [designrant.app](https://designrant.app). Thanks!

If you have questions about implementation, please refer to the [Gatsby docs](https://www.gatsbyjs.org/docs/).

## Running the server on your local machine

### 🛠 Installation & Set Up

1. Install the Gatsby CLI

   ```sh
   npm install -g gatsby-cli
   ```

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm start
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

1. Preview the site as it will appear once deployed

   ```sh
   npm run serve
   ```

## 🎨 Color Reference

| Color      | Light Mode Hex                                                     | Dark Mode Hex                                                      |
| ---------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| White      | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) `#ffffff` | ![#1c1c1c](https://via.placeholder.com/10/1c1c1c?text=+) `#1c1c1c` |
| Black      | ![#000000](https://via.placeholder.com/10/000000?text=+) `#000000` | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) `#ffffff` |
| Grey       | ![#2e4052](https://via.placeholder.com/10/2e4052?text=+) `#2e4052` | ![#f9f9f9](https://via.placeholder.com/10/f9f9f9?text=+) `#f9f9f9` |
| Light Grey | ![#f9f9f9](https://via.placeholder.com/10/f9f9f9?text=+) `#f9f9f9` | ![#121212](https://via.placeholder.com/10/121212?text=+) `#121212` |
|            |                                                                    |                                                                    |
|            |                                                                    |                                                                    |
