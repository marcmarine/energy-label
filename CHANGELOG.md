# [1.0.0-beta.15](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2026-10-26)


### Bug Fixes

* Position A–E scale without alignment-baseline ([6dccaa9](https://github.com/marcmarine/energy-label/commit/6dccaa90de056bd6dd0fbafbe539e5a4b93f90b3))

# [1.0.0-beta.14](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2026-10-26)


### Features

* Add render functions to bundle single labels ([358268c](https://github.com/marcmarine/energy-label/commit/358268c05dc72229f71b7011cb370dd8632adafa))

# [1.0.0-beta.13](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2026-10-25)


### Bug Fixes

* Draw QR code as vector path ([b8d0e95](https://github.com/marcmarine/energy-label/commit/b8d0e9573490901386cc15357fa6e6f971aaa783))
* Hide missing fridge or freezer compartments ([2638de6](https://github.com/marcmarine/energy-label/commit/2638de6e84e26cb913a2f41604f2bc75240765c3))
* Remove SVG IDs for deterministic label markup ([22dec9a](https://github.com/marcmarine/energy-label/commit/22dec9a987c80c04b40c803d375b57839b2d7571))
* Restrict class fields to regulation values ([d777be2](https://github.com/marcmarine/energy-label/commit/d777be2c2619321f8215f16246f5e97628243936))
* Show battery cycles from EPREL hundreds ([5f58f56](https://github.com/marcmarine/energy-label/commit/5f58f56050514a2a7f9da50145b0e7808be9d6c6))
* Validate classes and flag origin ([a097256](https://github.com/marcmarine/energy-label/commit/a0972567593befb5e84005de2bc987ef98656aac))


### Features

* Match official EPREL QR codes ([fed6590](https://github.com/marcmarine/energy-label/commit/fed659008df907076469dac193de0642563922b2))

# [1.0.0-beta.12](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2026-10-17)


### Bug Fixes

* Add fallback font stacks to SVG templates ([fa35528](https://github.com/marcmarine/energy-label/commit/fa355283fd535756a5c63c14102f62ae33451d1a))
* Display battery cycle count as numeric data ([dc0a765](https://github.com/marcmarine/energy-label/commit/dc0a7659d87f2f8275f2fdbfbdb1685cb0297f2c))
* Ensure unique SVG IDs across labels ([d27b753](https://github.com/marcmarine/energy-label/commit/d27b753dfb1bfb395a3730f79614a773776b46ee))
* Escape user input in SVG labels and URLs ([3a1e0c2](https://github.com/marcmarine/energy-label/commit/3a1e0c2b746d2bef38f76b1f719781ac605e6cf5))
* Link QR codes to product groups without registration numbers ([dedaf18](https://github.com/marcmarine/energy-label/commit/dedaf184e21752e0c83baec8989dc7b5bdbfdc62))
* Move SVGO to dev dependencies ([a1e0d92](https://github.com/marcmarine/energy-label/commit/a1e0d92110bd1fd924ecd453966213d3248e321e))
* Simplify arrow efficiency label rendering ([3e54bfa](https://github.com/marcmarine/energy-label/commit/3e54bfa08763a1647cc3e8e9cc2c87c5edfe4630))
* Type template factories by name ([230a6e0](https://github.com/marcmarine/energy-label/commit/230a6e085aa0586f6e12fa84d1ec356aa553fce8))


### Performance Improvements

* Optimize SVG template markup ([e674382](https://github.com/marcmarine/energy-label/commit/e6743828a2bdc73c93ab4e802083526378cd080c))

# [1.0.0-beta.11](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2025-07-16)


### Bug Fixes

* Preserve ID attributes on SVG optimization ([e43be13](https://github.com/marcmarine/energy-label/commit/e43be13bc830f6b4524f51d6666834c52072fdd5))
* **templates:** Allows null capFreezeNet values ([0080adf](https://github.com/marcmarine/energy-label/commit/0080adfca678f34c1d54631bba912f71834b2323))

# [1.0.0-beta.10](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2025-07-11)


### Bug Fixes

* Correct incorrect battery endurance variable name ([a21f8cd](https://github.com/marcmarine/energy-label/commit/a21f8cd211c507fdb9f8b14b849d915047608617))
* Rename mask IDs in flagUK to avoid collision ([80db062](https://github.com/marcmarine/energy-label/commit/80db062e24a4ea5c34b8f127a5ac0de9a341353c))


### Features

* Add strict energy class type definitions ([1c98c28](https://github.com/marcmarine/energy-label/commit/1c98c28677d622d7c4d95c16e9c5254cc6ce3738))
* Introduce createClassArrow function to factories ([7a5f579](https://github.com/marcmarine/energy-label/commit/7a5f579edd004ca5eebf3faa340605e12d3b0664))
* Remove async from toString calls ([cb7bd25](https://github.com/marcmarine/energy-label/commit/cb7bd250cad0a9af9e44839f25dfa8b0927831ce))

# [1.0.0-beta.9](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2025-07-08)


### Bug Fixes

* Redefine SVG structure for the UK flag ([200b037](https://github.com/marcmarine/energy-label/commit/200b037d66dbe9f67688e2a7e521ed5fadc98bdc))
* **template:** Improve handling of battery endurance values ([bfa7026](https://github.com/marcmarine/energy-label/commit/bfa70263fc877d8b1668fef806710defb4062b5d))
* **template:** Refine battery endurance type for data consistency ([653d8ee](https://github.com/marcmarine/energy-label/commit/653d8eedb4179744954bee74e9e16ff759dd2112))
* Update QR code generation with product-specific URLs ([54318c1](https://github.com/marcmarine/energy-label/commit/54318c12c17a52aad4866dad29a023922b229358))


### Features

* Add `PRODUCT_GROUPS` constant and exports it ([0a732d8](https://github.com/marcmarine/energy-label/commit/0a732d8f90d68de0ee6d8e1bb8f3778701d2be79))
* Align data interfaces with EPREL Public API ([240e649](https://github.com/marcmarine/energy-label/commit/240e649010ecf7f81516206562da4908a630cd47))
* Make API more intuitive and update documentation ([7f4fce6](https://github.com/marcmarine/energy-label/commit/7f4fce67784a2caf629198b84e4ab0ba04cee18a))

# [1.0.0-beta.8](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2025-06-16)


### Bug Fixes

* **template:** Swap chill and frozen volume display ([3530522](https://github.com/marcmarine/energy-label/commit/3530522138e6f8360f849ca03350b48df56516ea))

# [1.0.0-beta.7](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2025-06-08)


### Features

* Add label orientation to `ArrowTemplate` ([b0d4995](https://github.com/marcmarine/energy-label/commit/b0d4995c655115f33bc7e700fab1a3fa3d8ce420))

# [1.0.0-beta.6](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2025-06-01)


### Bug Fixes

* **smartphones:** Adjust battery display and adds regulation number ([59d7483](https://github.com/marcmarine/energy-label/commit/59d74830d4243e933a0d2610a960cdcb5030ed78))


### Features

* Extract DOM manipulation to utility functions ([8bdc671](https://github.com/marcmarine/energy-label/commit/8bdc6718bf67aef59fc5498354f66e58388c08d1))
* Rename `generateSVGString` to `generateLabel` ([2c2f0fd](https://github.com/marcmarine/energy-label/commit/2c2f0fdd3fbe744407a47453454db86199faf2ac))
* Simplify SVG appending logic ([86c876d](https://github.com/marcmarine/energy-label/commit/86c876d7de1a0c180a70c54d9f0495640235bba5))
* **template:** Optimize SVG output formatting ([25853a6](https://github.com/marcmarine/energy-label/commit/25853a605c31202bc2d11a1909264e3dff15583b))

# [1.0.0-beta.5](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2025-05-10)


### Features

* Introduce template for smartphones and tablets ([028ce94](https://github.com/marcmarine/energy-label/commit/028ce94decaacc7ba5fa93ed9cc83a04488573a2))

# [1.0.0-beta.4](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2025-05-05)


### Bug Fixes

* Correct types for `createEnergyLabel` function ([6271aaf](https://github.com/marcmarine/energy-label/commit/6271aaf54339db9e361c14920624c057d53204fd))
* Remove test item from EU regulations ([95571e5](https://github.com/marcmarine/energy-label/commit/95571e57eebf701785b241d5a26a3f9005a91b42))


### Features

* Add image generation for efficiency class arrows ([8af2eb3](https://github.com/marcmarine/energy-label/commit/8af2eb34787299831633a95e89de42f131203018))
* Use human readable identifiers for templates ([8211ef0](https://github.com/marcmarine/energy-label/commit/8211ef0c788a2d97d3a18f74a8fdcabe20151745))

# [1.0.0-beta.3](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2025-04-24)


### Bug Fixes

* **docs:** Correct input field names ([584b121](https://github.com/marcmarine/energy-label/commit/584b121160732156965a73c7dc6b412afea82327))
* **docs:** Correct URL for Open Graph image ([b0b966d](https://github.com/marcmarine/energy-label/commit/b0b966dcac2671f36032ca2b5f8bdd94afb9c987))


### Features

* Add fridge and freezer support and type definitions ([f1179a5](https://github.com/marcmarine/energy-label/commit/f1179a5e3bd150fc1aab4c589e5e2d71be0cb4df))
* Update EnergyLabelOptions interface ([4de9e6d](https://github.com/marcmarine/energy-label/commit/4de9e6d131ef577210d3d7d028956d189bc34c85))

# [1.0.0-beta.2](https://github.com/marcmarine/energy-label/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2025-03-28)


### Bug Fixes

* **docs:** Correct installed version of `energy-label` dependency ([2aa3e49](https://github.com/marcmarine/energy-label/commit/2aa3e4959334fbc4566ebdd03cc62d9206a68905))
* Remove CommonJS export ([20cc971](https://github.com/marcmarine/energy-label/commit/20cc9715eb579b7dff93dc2d7083831d319035d6))


### Features

* Add support for products sold in Great Britain ([3edfff7](https://github.com/marcmarine/energy-label/commit/3edfff7f3dfe3254ef13ac78cc28766eb2460d03))

# 1.0.0-beta.1 (2025-03-24)


### Features

* Integrate `svgo` for SVG optimization ([751afc0](https://github.com/marcmarine/energy-label/commit/751afc02f4b3805143bfc5ec0e57d7be2edeb0ee))
