import { Static, T } from '@sinclair/typebox'

/**
 * A [TypeBox][0] schema object for a packages `package.json` file.
 *
 * [0]: https://github.com/sinclairzx81/typebox
 */
export const PackageJSON = T.Partial(
  T.Object({
    /** The name of the package. */
    name: T.String(),

    /** The display name of the package. */
    displayName: T.String(),

    /** The version of the package. */
    version: T.String({ pattern: '^[0-9]+.[0-9]+.[0-9]+.*$' }),

    /** This helps people discover your package, as it's listed in `npm search`. */
    description: T.String(),

    /** This helps people discover your package as it's listed in `npm search`. */
    keywords: T.Array(T.String()),

    /** The url to the project homepage. */
    homepage: T.String(),

    /**
     * The url to your project's issue tracker and / or the email address to which issues should be
     * reported. These are helpful for people who encounter issues with your package.
     */
    bugs: T.Union([
      T.String(),
      T.Partial(
        T.Object({
          url: T.String(),
          email: T.String(),
        })
      ),
    ]),

    /**
     * Specify the place where your code lives. This is helpful for people who want to contribute.
     */
    repository: T.Union([
      T.String(),
      T.Object({
        type: T.Optional(T.String()),
        url: T.String(),
        directory: T.Optional(T.String()),
      }),
    ]),
    license: T.String(),
    author: T.Union([
      T.String(),
      T.Object({
        name: T.String(),
        email: T.Optional(T.String()),
        url: T.Optional(T.String()),
      }),
    ]),
    type: T.Union([T.Literal('module'), T.Literal('commonjs')]),
    exports: T.Union([
      T.String(),
      T.Partial(
        T.Object({
          default: T.String(),
          import: T.String(),
          node: T.String(),
          require: T.String(),
          types: T.String(),
        })
      ),
    ]),
    main: T.String(),
    files: T.Array(T.String()),
    scripts: T.Any(),
    dependencies: T.Any(),
    devDependencies: T.Any(),
    peerDependencies: T.Any(),
    optionalDependencies: T.Any(),
    bundledDependencies: T.Any(),
    engines: T.Any(),
    publishConfig: T.Partial(
      T.Object({
        access: T.Union([T.Literal('public'), T.Literal('restricted')]),
        registry: T.String(),
        tag: T.String(),
      })
    ),
  })
)

export type PackageJSON = Static<typeof PackageJSON & { [key: string]: string }>
