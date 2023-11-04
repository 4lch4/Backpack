import { Static, Type } from '@sinclair/typebox'

/**
 * A [TypeBox][0] schema object for a packages `package.json` file.
 *
 * [0]: https://github.com/sinclairzx81/typebox
 */
export const PackageJSON = Type.Partial(
  Type.Object({
    /** The name of the package. */
    name: Type.String(),

    /** The display name of the package. */
    displayName: Type.String(),

    /** The version of the package. */
    version: Type.String({ pattern: '^[0-9]+.[0-9]+.[0-9]+.*$' }),

    /** This helps people discover your package, as it's listed in `npm search`. */
    description: Type.String(),

    /** This helps people discover your package as it's listed in `npm search`. */
    keywords: Type.Array(Type.String()),

    /** The url to the project homepage. */
    homepage: Type.String(),

    /**
     * The url to your project's issue tracker and / or the email address to which issues should be
     * reported. These are helpful for people who encounter issues with your package.
     */
    bugs: Type.Union([
      Type.String(),
      Type.Partial(
        Type.Object({
          url: Type.String(),
          email: Type.String(),
        })
      ),
    ]),

    /**
     * Specify the place where your code lives. This is helpful for people who want to contribute.
     */
    repository: Type.Union([
      Type.String(),
      Type.Object({
        type: Type.Optional(Type.String()),
        url: Type.String(),
        directory: Type.Optional(Type.String()),
      }),
    ]),
    license: Type.String(),
    author: Type.Union([
      Type.String(),
      Type.Object({
        name: Type.String(),
        email: Type.Optional(Type.String()),
        url: Type.Optional(Type.String()),
      }),
    ]),
    type: Type.Union([Type.Literal('module'), Type.Literal('commonjs')]),
    exports: Type.Union([
      Type.String(),
      Type.Partial(
        Type.Object({
          default: Type.String(),
          import: Type.String(),
          node: Type.String(),
          require: Type.String(),
          types: Type.String(),
        })
      ),
    ]),
    main: Type.String(),
    files: Type.Array(Type.String()),
    scripts: Type.Any(),
    dependencies: Type.Any(),
    devDependencies: Type.Any(),
    peerDependencies: Type.Any(),
    optionalDependencies: Type.Any(),
    bundledDependencies: Type.Any(),
    engines: Type.Any(),
    publishConfig: Type.Partial(
      Type.Object({
        access: Type.Union([Type.Literal('public'), Type.Literal('restricted')]),
        registry: Type.String(),
        tag: Type.String(),
      })
    ),
  })
)

export type PackageJSON = Static<typeof PackageJSON & { [key: string]: string }>
