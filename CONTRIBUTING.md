## Branch naming
Branch names should indicate type of work. For fixes also related issue should be mentioned.
The format is `fix/123-short-description`, `feature/description` or `feature/123-short-description`.

For example
* [PR 648](https://github.com/colouring-cities/colouring-core/pull/684) used branch `fix/681-land-use-edit` referencing [#681](https://github.com/colouring-cities/colouring-core/issues/681)
* [PR 625](https://github.com/colouring-cities/colouring-core/pull/625) used branch `feature/verification`

## Commits
Commit messages should start from an upper case. So `Change public ownership sources field to array` is preferred over `change public ownership sources field to array`.

## 'Generifying' the Platform
We are still in the process of moving from the Colouring Britain prototype to the Colouring Cities Core platform. If you notice any London-specific/Britain-specific text or variables in the Core code, we would be grateful if you could flag those up, either by raising an issue so that we can fix them or by fixing them yourself and creating a pull request. 

Ideally, any references to London should be replaced, either:
- with the City Name parameter (specified in [docs/configuring-colouring-cities](docs/configuring-colouring-cities.md)) when referring to a specific deployment.
- with "Colouring Cities" when referring to the wider CCRP.
