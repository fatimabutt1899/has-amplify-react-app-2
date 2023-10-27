/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
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
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        status
        createdAt
        updatedAt
        userDevicesId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDeviceTimeStamp = /* GraphQL */ `
  query GetDeviceTimeStamp($id: ID!) {
    getDeviceTimeStamp(id: $id) {
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
export const listDeviceTimeStamps = /* GraphQL */ `
  query ListDeviceTimeStamps(
    $filter: ModelDeviceTimeStampFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeviceTimeStamps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const deviceTimeStampsByDeviceIDAndId = /* GraphQL */ `
  query DeviceTimeStampsByDeviceIDAndId(
    $deviceID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeviceTimeStampFilterInput
    $limit: Int
    $nextToken: String
  ) {
    deviceTimeStampsByDeviceIDAndId(
      deviceID: $deviceID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const deviceTimeStampsByUserIDAndId = /* GraphQL */ `
  query DeviceTimeStampsByUserIDAndId(
    $userID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeviceTimeStampFilterInput
    $limit: Int
    $nextToken: String
  ) {
    deviceTimeStampsByUserIDAndId(
      userID: $userID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
