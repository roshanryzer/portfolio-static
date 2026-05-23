# Deployment & Operations Guide (Static Portfolio)

This guide is written for non-technical people. It starts with Git on your
computer, then explains deployment options for a static-only portfolio with no
backend server.

## Part 0 - Prepare Git locally and push to GitHub

If you already cloned the repo and it already has a remote pointing to GitHub,
you can skip to Part 1.

Open a terminal in the folder that contains `portfolio-static/package.json`.

If this folder is not a Git repository yet, initialize it:

```bash
git init
git branch -M main
```

Add your GitHub repository as `origin` (replace `YOUR_GITHUB_REPO_URL`):

```bash
git remote add origin YOUR_GITHUB_REPO_URL
```

Create your first commit and push:

```bash
git add .
git commit -m "Initial commit for static portfolio"
git push -u origin main
```

## Part 1 - Test locally before deployment

From `portfolio-static`:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Create a production build:

```bash
npm run build
npm run preview
```

This confirms the static files in `dist/` are ready for hosting.

## Part 2 - Deploy option A (recommended): Cloudflare Pages

Cloudflare Pages is usually the easiest low-cost option for static React sites.

1. Push your code to GitHub.
2. Open Cloudflare Dashboard.
3. Go to `Workers & Pages` -> `Create` -> `Pages` -> `Connect to Git`.
4. Select your `portfolio-static` repository.
5. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: current LTS (for example 20)
6. Click `Save and Deploy`.

After deployment, Cloudflare gives you a URL similar to:
`https://your-project.pages.dev`.

### Custom domain (optional)

If you own a domain, connect it in Cloudflare Pages project settings:

1. `Custom domains` -> `Set up a custom domain`
2. Add your domain (for example `roshan-shrestha.com`)
3. Follow DNS prompts

## Part 3 - Deploy option B: AWS S3 static website hosting

This option hosts only static files. It is simple, but if you need HTTPS on a
custom domain you may later add CloudFront.

### Step 3A - Create S3 bucket

In AWS Console:

1. Open S3 -> Create bucket
2. Use a globally unique name (example: `roshan-portfolio-static-2026`)
3. Disable "Block all public access" for website hosting
4. Acknowledge the warning and create bucket

### Step 3B - Enable static website hosting

In the created bucket:

1. Go to `Properties`
2. Open `Static website hosting`
3. Enable it
4. Set:
   - Index document: `index.html`
   - Error document: `index.html`

Using `index.html` as error document supports React SPA refresh routing.

### Step 3C - Upload build files

From local terminal:

```bash
npm run build
```

Upload all files from `dist/` into the S3 bucket root.

You can use AWS Console upload or AWS CLI:

```bash
aws s3 sync dist s3://YOUR_BUCKET_NAME --delete
```

### Step 3D - Bucket policy for public read

Set bucket policy (replace `YOUR_BUCKET_NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

After this, open the S3 website endpoint from `Properties` page.

## Part 4 - Continuous deployment (optional)

If you use Cloudflare Pages with GitHub, deployment is automatic on every push
to `main`.

If you use S3, you can automate deployment using GitHub Actions in a later step
by running `npm run build` then `aws s3 sync`.

## Part 5 - Verification checklist

- Open homepage URL and confirm all sections load.
- Refresh the page on section links and verify no 404 page appears.
- Test on phone and desktop.
- Check that contact links (`mailto`, GitHub) work.

## Part 6 - Cost guidance

Typical monthly cost for this static setup:

- Cloudflare Pages only: often 0 AUD on free tier
- S3 static hosting only: usually low single-digit AUD depending on traffic

This is significantly cheaper than running an always-on backend server and
database for a portfolio site.
