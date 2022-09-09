/*
 * Copyright (c) 2022 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.workers.config;

import io.airbyte.config.storage.CloudStorageConfigs;
import io.airbyte.config.storage.CloudStorageConfigs.GcsConfig;
import io.airbyte.config.storage.CloudStorageConfigs.MinioConfig;
import io.airbyte.config.storage.CloudStorageConfigs.S3Config;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.context.annotation.Value;
import java.util.Optional;
import javax.inject.Named;
import javax.inject.Singleton;

/**
 * Micronaut bean factory for cloud storage-related singletons.
 */
@Factory
@SuppressWarnings("PMD.AvoidDuplicateLiterals")
public class CloudStorageBeanFactory {

  @Singleton
  @Requires(property = "airbyte.cloud.storage.logs.gcs.bucket",
            notEquals = "")
  @Named("logStorageConfigs")
  public Optional<CloudStorageConfigs> gcsLogStorageConfigs(
                                                            @Value("${airbyte.cloud.storage.logs.gcs.bucket}") final String gcsLogBucket,
                                                            @Value("${airbyte.cloud.storage.logs.gcs:application-credentials}") final String googleApplicationCredentials) {
    return Optional.of(CloudStorageConfigs.gcs(new GcsConfig(gcsLogBucket, googleApplicationCredentials)));
  }

  @Singleton
  @Requires(property = "airbyte.cloud.storage.logs.minio.endpoint",
            notEquals = "")
  @Named("logStorageConfigs")
  public Optional<CloudStorageConfigs> minioLogStorageConfigs(
                                                              @Value("${airbyte.cloud.storage.logs.minio.access-key}") final String awsAccessKeyId,
                                                              @Value("${airbyte.cloud.storage.logs.minio.secret-access-key}") final String awsSecretAccessKey,
                                                              @Value("${airbyte.cloud.storage.logs.minio.bucket}") final String s3LogBucket,
                                                              @Value("${airbyte.cloud.storage.logs.minio.endpoint}") final String s3MinioEndpoint) {
    return Optional.of(CloudStorageConfigs.minio(new MinioConfig(s3LogBucket, awsAccessKeyId, awsSecretAccessKey, s3MinioEndpoint)));
  }

  @Singleton
  @Requires(property = "airbyte.cloud.storage.logs.s3.region",
            notEquals = "")
  @Named("logStorageConfigs")
  public Optional<CloudStorageConfigs> s3LogStorageConfigs(
                                                           @Value("${airbyte.cloud.storage.logs.s3.access-key}") final String awsAccessKeyId,
                                                           @Value("${airbyte.cloud.storage.logs.s3.secret-access-key}") final String awsSecretAccessKey,
                                                           @Value("${airbyte.cloud.storage.logs.s3.bucket}") final String s3LogBucket,
                                                           @Value("${airbyte.cloud.storage.logs.s3.region}") final String s3LogBucketRegion) {
    return Optional.of(CloudStorageConfigs.s3(new S3Config(s3LogBucket, awsAccessKeyId, awsSecretAccessKey, s3LogBucketRegion)));
  }

  @Singleton
  @Requires(property = "airbyte.cloud.storage.state.gcs.bucket",
            notEquals = "")
  @Named("stateStorageConfigs")
  public Optional<CloudStorageConfigs> gcsStateStorageConfiguration(
                                                                    @Value("${airbyte.cloud.storage.state.gcs.bucket}") final String gcsBucketName,
                                                                    @Value("${airbyte.cloud.storage.state.gcs.application-credentials}") final String gcsApplicationCredentials) {
    return Optional.of(CloudStorageConfigs.gcs(new GcsConfig(gcsBucketName, gcsApplicationCredentials)));
  }

  @Singleton
  @Requires(property = "airbyte.cloud.storage.state.minio.endpoint",
            notEquals = "")
  @Named("stateStorageConfigs")
  public Optional<CloudStorageConfigs> minioStateStorageConfiguration(
                                                                      @Value("${airbyte.cloud.storage.state.minio.bucket}") final String bucketName,
                                                                      @Value("${airbyte.cloud.storage.state.minio.access-key}") final String awsAccessKey,
                                                                      @Value("${airbyte.cloud.storage.state.minio.secret-access-key}") final String secretAccessKey,
                                                                      @Value("${airbyte.cloud.storage.state.minio.endpoint}") final String endpoint) {
    return Optional.of(CloudStorageConfigs.minio(new MinioConfig(bucketName, awsAccessKey, secretAccessKey, endpoint)));
  }

  @Singleton
  @Requires(property = "airbyte.cloud.storage.state.s3.region",
      notEquals = "")
  @Named("stateStorageConfigs")
  public Optional<CloudStorageConfigs> s3StateStorageConfiguration(
                                                                   @Value("${airbyte.cloud.storage.state.s3.bucket}") final String bucketName,
                                                                   @Value("${airbyte.cloud.storage.state.s3.access-key}") final String awsAccessKey,
                                                                   @Value("${airbyte.cloud.storage.state.s3.secret-access-key}") final String secretAcessKey,
                                                                   @Value("${airbyte.cloud.storage.state.s3.region}") final String s3Region) {
    return Optional.of(CloudStorageConfigs.s3(new S3Config(bucketName, awsAccessKey, secretAcessKey, s3Region)));
  }

}
