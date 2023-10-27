/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
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
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
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
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
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
export const createDeviceTimeStamp = /* GraphQL */ `
  mutation CreateDeviceTimeStamp(
    $input: CreateDeviceTimeStampInput!
    $condition: ModelDeviceTimeStampConditionInput
  ) {
    createDeviceTimeStamp(input: $input, condition: $condition) {
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
export const updateDeviceTimeStamp = /* GraphQL */ `
  mutation UpdateDeviceTimeStamp(
    $input: UpdateDeviceTimeStampInput!
    $condition: ModelDeviceTimeStampConditionInput
  ) {
    updateDeviceTimeStamp(input: $input, condition: $condition) {
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
export const deleteDeviceTimeStamp = /* GraphQL */ `
  mutation DeleteDeviceTimeStamp(
    $input: DeleteDeviceTimeStampInput!
    $condition: ModelDeviceTimeStampConditionInput
  ) {
    deleteDeviceTimeStamp(input: $input, condition: $condition) {
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
