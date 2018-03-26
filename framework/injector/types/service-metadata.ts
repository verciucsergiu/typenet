export interface ServiceMetadata {
    /**
     * True if this service is a singleton and value should be populated.
     */
    global?: boolean;

    /**
     * Service insatnce.
     */
    value?: any;

    /**
     * Service type used in the future to create new instances.
     */
    type: Function;
}