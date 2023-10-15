/**
 * An Enum of all the environment variables that can be used to configure access to [Axiom][0] for
 * logging.
 *
 * [0]: https://axiom.co
 */
export enum AxiomConfigVariable {
  /** Specifies which dataset to send logs to. */
  dataset = 'AXIOM_DATASET',

  /** The token to use to authenticate with Axiom. */
  token = 'AXIOM_TOKEN',

  /** The organization ID to use to authenticate with Axiom. */
  orgId = 'AXIOM_ORG_ID',
}

/**
 * An Enum of all the datasets I have configured in [Axiom][0].
 *
 * [0]: https://axiom.co
 */
export enum AxiomDataset {
  /** The default dataset to use for my various services. */
  Services = 'services',

  /** The dataset to use for my Discord bot: `NARB`. */
  NARB = 'narb-primary',
}
