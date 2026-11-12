---

title: EPREL Guide
group: Guides
---

# EPREL Guide

[EPREL](https://eprel.ec.europa.eu) is the European Product Registry for Energy Labelling. The label data fields use the same names and units as its public API, so a product's data can be passed as it comes. Fields the label doesn't need are ignored.

## Create a label from an EPREL product

`createEnergyLabelFromEprel` chooses the label from the product's `productGroup`:

```js
import { createEnergyLabelFromEprel } from 'energy-label'

const response = await fetch('https://eprel.ec.europa.eu/api/product/1573269')
const product = await response.json()

const svgString = createEnergyLabelFromEprel(product).toString()
```

These product groups have a label:

| Label                    | EPREL `productGroup`          |
| ------------------------ | ----------------------------- |
| Smartphones and tablets  | `smartphonestablets20231669`  |
| Refrigerating appliances | `refrigeratingappliances2019` |

For other product groups it throws an error. `PRODUCT_GROUPS` lists them, so you can check a product first:

```js
import { PRODUCT_GROUPS } from 'energy-label'

const supported = Object.values(PRODUCT_GROUPS).some(
  (group) => group.urlCode === product.productGroup,
)
```

If you already know the product group, `createEnergyLabel('refrigerating-appliances', product)` does the same. To bundle a single label, use its render function, such as `renderRefrigeratingAppliancesLabel(product)`. See the [Bundle Size Guide](./bundle-size.md).

## What the data decides

- **The label variant:** a refrigerating appliance with `capBottles` gets the wine storage label, and a freezer without a fridge compartment shows only the freezer capacity.
- **The QR code:** it links to the product in EPREL, with the same URL as the official labels. Without `eprelRegistrationNumber`, it links to the product group page.

## From the browser

The EPREL API doesn't allow requests from browsers (CORS), so fetch the data on your server, or host [eprel-api-proxy](https://github.com/marcmarine/eprel-api-proxy), a small proxy that forwards requests to the EPREL API and adds the CORS headers:

```js
// Requests to the proxy are forwarded to https://eprel.ec.europa.eu/api
const response = await fetch(
  'https://your-eprel-proxy.example.com/product/1573269',
)
const product = await response.json()

const label = createEnergyLabelFromEprel(product)
```

> Set `CORS_ORIGIN` to your site's origin so other sites can't use your proxy from their pages.
