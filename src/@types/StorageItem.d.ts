// `@aws-amplify/storage/dist/esm/types/outputs.d.ts`
// ↑ がエクスポートされていないため、そのまま読み込むことができない。
// したがって、当型定義をそのままコピーして利用する。

interface StorageItem {
  /**
   * Key of the object
   */
  key: string
  /**
   * Creation date of the object.
   */
  lastModified?: Date
  /**
   * Size of the body in bytes.
   */
  size?: number
  /**
   * An entity tag (ETag) is an opaque identifier assigned by a web server to a specific version of a resource found at
   * a URL.
   */
  eTag?: string
  /**
   * The user-defined metadata for the object uploaded to S3.
   * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html#UserMetadata
   */
  metadata?: Record<string, string>
};
