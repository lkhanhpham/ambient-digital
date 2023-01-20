#!/bin/sh

echo ""  && echo "### Running clean install ###" && echo ""
npm ci

echo ""  && echo "### Installing playwright ###" && echo ""
npm i -D @playwright/test
npx playwright install
npx playwright install chromium

echo ""  && echo "### Running playwright tests ###" && echo ""
npx playwright test