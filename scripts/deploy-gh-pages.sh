#!/usr/bin/env bash
# Build the static export and deploy it to the gh-pages branch.
#
# The app uses Next.js `basePath: '/themis-womens-health'`, which prefixes
# router links and `_next/*` assets automatically. Raw string asset paths
# (e.g. `src="/images/foo.png"`, `/placeholder.svg`) are NOT prefixed by
# Next, so we rewrite them in the built `out/` here. This keeps the source
# (`main`) free of hardcoded base paths while the deployed site at
# https://devops-tatvacare.github.io/themis-womens-health/ resolves assets.
set -euo pipefail

BASE_PATH="/themis-womens-health"
REPO="https://github.com/devops-tatvacare/themis-womens-health.git"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"
rm -rf .next out
./node_modules/.bin/next build

# Prefix root-absolute public asset paths with the basePath.
find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.txt' \) -print0 \
  | xargs -0 perl -pi -e "s{([\"'\\(])/images/}{\$1${BASE_PATH}/images/}g; s{([\"'\\(])/placeholder}{\$1${BASE_PATH}/placeholder}g;"

touch out/.nojekyll

# Publish out/ to gh-pages.
PG="$(mktemp -d)"
cp -R out/. "$PG/"
cd "$PG"
git init -q -b gh-pages
git add -A
git -c user.name="devops-tatvacare" -c user.email="devops@tatvacare.in" \
  commit -q -m "Deploy static export to GitHub Pages"
git remote add origin "$REPO"
git push -q -f origin gh-pages
echo "Deployed: https://devops-tatvacare.github.io${BASE_PATH}/"
