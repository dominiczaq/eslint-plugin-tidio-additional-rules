# DEPRECIATED
This is no longer maintained, package moved to TidioLTD org - https://github.com/TidioLtd/eslint-plugin-tidio-additional-rules

# eslint-plugin-tidio-additional-rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tidio-additional-rules`:

```
$ npm install eslint-plugin-tidio-additional-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tidio-additional-rules` globally.

## Usage

Add `eslint-plugin-tidio-additional-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "tidio-additional-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tidio-additional-rules/rule-name": 2
    }
}
```

## Supported Rules

* Disallow string literals as direct JSXElement children





