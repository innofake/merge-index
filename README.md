# @innofake/merge-index

Merge Index is a tool that allows generating a single js file that re-exports all other js or ts index files in a specified directory.

## Install

```bash
npm i -D @innofake/merge-index
```

## Usage

```bash
merge-index
```

## Options

| Command/option   | Type     | Description                                                       | Example                                                 | 
| ---------------- | -------- | ----------------------------------------------------------------- | ------------------------------------------------------- | 
| --dir            | string   | Path to directory with js and/or  index file(s)                   | `--dir "dist"`                                       | 
| --out            | string   | File name for generated export js file                            | `--out "index.js"`                                 | 
