# Temporary readme for the Shopify Praise Theme

In the root folder, using the Shopify CLI 3.0, run `shopify run dev`. Details on Shopify CLI found here (https://shopify.dev/themes/tools/cli)[https://shopify.dev/themes/tools/cli].

In another terminal tab run `sass --watch scss/theme.scss:assets/theme.css scss/sections:assets scss/snippets:assets --sourcemap=none`

This compiles all global style files into one theme.css file, and all the snippets and sections files into separate files
