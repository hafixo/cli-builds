/**
 * Builds and serves your app, rebuilding on file changes.
 */
export interface Schema {
    /**
     * Specify the configuration to use.
     */
    configuration?: string;
    /**
     * Shows a help message.
     */
    help?: boolean;
    /**
     * Shows the metadata associated with each flags, in JSON format.
     */
    helpJson?: boolean;
    /**
     * Flag to set configuration to 'production'.
     */
    prod?: boolean;
    /**
     * The name of the project to build.
     */
    project?: string;
}
