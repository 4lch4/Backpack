/**
 * An Enum of all the environment variables that can be used to configure access to [Axiom][0] for
 * logging. I like having this enum specifically because I fat finger variable names all the time
 * and am prone to forgetting what they are. This enum helps me avoid all of that.
 *
 * [0]: https://axiom.co
 */
export enum AxiomVar {
  /** Specifies which dataset to send logs to. */
  dataset = 'AXIOM_DATASET',

  /** The token to use to authenticate with Axiom. */
  token = 'AXIOM_TOKEN',

  /** The organization ID to use to authenticate with Axiom. */
  orgId = 'AXIOM_ORG_ID',
}

/**
 * The dataset to use for logging to [Axiom][0]. The value is retrieved from the environment
 * variable with the name specified by {@link AxiomVar.dataset}.
 *
 * [0]: https://axiom.co
 */
export const AxiomDataSet = process.env[AxiomVar.dataset]

/**
 * The token to use for logging to [Axiom][0]. The value is retrieved from the environment variable
 * with the name specified by {@link AxiomVar.token}.
 *
 * [0]: https://axiom.co
 */
export const AxiomToken = process.env[AxiomVar.token]

/**
 * The organization ID to use for logging to [Axiom][0]. The value is retrieved from the environment
 * variable with the name specified by {@link AxiomVar.orgId}.
 *
 * [0]: https://axiom.co
 */
export const AxiomOrgId = process.env[AxiomVar.orgId]

/**
 * An Enum of all the datasets I have configured in [Axiom][0]. I'm not entirely sure if I'll keep
 * this one around, but I'm keeping it for now.
 *
 * [0]: https://axiom.co
 */
export enum AxiomDataset {
  /** The default dataset to use for my various services. */
  Services = 'services',

  /** The dataset to use for my Discord bot: `NARB`. */
  NARB = 'narb-primary',
}
