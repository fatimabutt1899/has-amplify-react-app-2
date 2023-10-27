/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      email 
      devices {
        nextToken
        __typename
      }
      deviceTimeStamps {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      email
      devices {
        nextToken
        __typename
      }
      deviceTimeStamps {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      email
      devices {
        nextToken
        __typename
      }
      deviceTimeStamps {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onCreateDevice(filter: $filter, owner: $owner) {
      id
      name
      type
      status
      user {
        id
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userDevicesId
      owner
      __typename
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onUpdateDevice(filter: $filter, owner: $owner) {
      id
      name
      type
      status
      user {
        id
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userDevicesId
      owner
      __typename
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onDeleteDevice(filter: $filter, owner: $owner) {
      id
      name
      type
      status
      user {
        id
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userDevicesId
      owner
      __typename
    }
  }
`;
export const onCreateDeviceTimeStamp = /* GraphQL */ `
  subscription OnCreateDeviceTimeStamp(
    $filter: ModelSubscriptionDeviceTimeStampFilterInput
    $owner: String
  ) {
    onCreateDeviceTimeStamp(filter: $filter, owner: $owner) {
      id
      deviceID
      userID
      timestamp
      eventStatus
      createdAt
      updatedAt
      userDeviceTimeStampsId
      owner
      __typename
    }
  }
`;
export const onUpdateDeviceTimeStamp = /* GraphQL */ `
  subscription OnUpdateDeviceTimeStamp(
    $filter: ModelSubscriptionDeviceTimeStampFilterInput
    $owner: String
  ) {
    onUpdateDeviceTimeStamp(filter: $filter, owner: $owner) {
      id
      deviceID
      userID
      timestamp
      eventStatus
      createdAt
      updatedAt
      userDeviceTimeStampsId
      owner
      __typename
    }
  }
`;
export const onDeleteDeviceTimeStamp = /* GraphQL */ `
  subscription OnDeleteDeviceTimeStamp(
    $filter: ModelSubscriptionDeviceTimeStampFilterInput
    $owner: String
  ) {
    onDeleteDeviceTimeStamp(filter: $filter, owner: $owner) {
      id
      deviceID
      userID
      timestamp
      eventStatus
      createdAt
      updatedAt
      userDeviceTimeStampsId
      owner
      __typename
    }
  }
`;
