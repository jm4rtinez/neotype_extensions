# node_esm_starter

A starter project template for TypeScript and ESModules on NodeJS

This repository provides:

-   TypeScript for development
-   ESLint for linting
-   Prettier for formatting
-   Mocha and Chai for testing

Configuration for ESLint, Prettier, and Mocha is included within `package.json`.

## How to use

1.  Create and initialize a local repository:

    ```sh
    mkdir your_repository_name
    cd your_repository_name
    git init
    ```

1.  Fetch this repository:

    ```sh
    git fetch --depth=1 -n https://github.com/jm4rtinez/node_esm_starter.git
    ```

1.  Collapse the template's commit history into a new initial commit:

    ```sh
    git reset --hard $(git commit-tree FETCH_HEAD^{tree} -m 'chore: initial commit')
    ```

1.  Add package information to `package.json`, and change any configurations as
    desired.

1.  Install development dependencies:

    ```sh
    npm install
    ```

1.  Once files are added to the `src` and `test` directories, the `.gitkeep`
    files may be deleted.
