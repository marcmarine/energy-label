---
title: Quick Start
group: Getting Started
---

# Quick Start

Create your first energy label in 5 minutes 🚀. This guide shows you the fastest ways to generate EU-compliant energy labels.

## Choose Your Method

There are two main ways to generate energy labels:

- [**Method 1: Node.js**](#method-1-nodejs) - Generate SVG files on the server
- [**Method 2: Browser**](#method-2-browser) - Display labels directly in web pages

## Method 1: Node.js

Generate energy label SVG files using Node.js and save them to your file system.

### Step 1: Setup Your Project

Create a new directory and initialize your project:

```bash
mkdir energy-label-node
cd energy-label-node
npm init -y
```

### Step 2: Configure Package Type

Edit your `package.json` to enable ES modules:

```json
{
  "name": "energy-label-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module"
  // ...
}
```

> **Important:** The `"type": "module"` field is required to use ES6 imports in Node.js.

### Step 3: Install the Library

```bash
npm install energy-label@beta
```

### Step 4: Create Your First Label

Create a file called `index.js`:

```js
import EnergyLabel from 'energy-label'
import fs from 'node:fs'

// Create a smartphone energy label
const label = new EnergyLabel('smartphones')

// Generate the SVG and save it
label.generate().then(svgString => {
  fs.writeFileSync('smartphone-label.svg', svgString)
})
```

### Step 5: Run the Script

```bash
node index.js
```

You'll now have a `smartphone-label.svg` file in your directory!

## Method 2: Browser

Display energy labels directly in web pages using HTML and JavaScript.

### Step 1: Create HTML File

Create an `index.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Energy Label</title>
  </head>
  <body>
    <div id="label-container"></div>

    <script type="module">
      import { EnergyLabel, appendTo } from 'https://esm.sh/energy-label@beta'

      const label = EnergyLabel('smartphones')

      label.generate().then(svg => {
        appendTo(document.getElementById('label-container'), svg)
      })
    </script>
  </body>
</html>
```

### Step 2: Open in Browser

Save the file as `index.html` and open it in your browser. With this minimal example you'll see an smartphone label.

## Next Steps

Now that you've created your first energy label, explore these guides:

- [React Guide](../guides/react.md) - Integrate with React.
