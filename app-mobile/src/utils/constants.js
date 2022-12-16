/* let SERVICE_SELECT_MODE_UUID = '9edcffdf-b178-4fb8-9712-c83c4e7cdc20'
let SERVICE_PID_CONTROL_UUID = '000000ee-0000-1000-8000-00805f9b34fb';
let SERVICE_ANGLE_CONTROL_UUID = '00003834-0000-1000-8000-00805f9b34fb';

let CHARACTERISTIC_P_CONTROL_UUID = '26318e26-76cd-4320-9b32-6cbd80db89c5';
let CHARACTERISTIC_I_CONTROL_UUID = '5ff892c4-333a-483d-bea6-2e86f40010b0';
let CHARACTERISTIC_D_CONTROL_UUID = 'a9042d44-fd2d-4961-80df-1815cd237d29';
let CHARACTERISTIC_ANGLE_CONTROL_UUID = '000038d4-0000-1000-8000-00805f9b34fb';
let CHARACTERISTIC_SELECT_MODE_UUID = '2316d65e-3d61-4071-a020-b00776e3468d'; */

let SERVICE_SELECT_MODE_UUID;
let SERVICE_P_CONTROL_UUID;
let SERVICE_I_CONTROL_UUID;
let SERVICE_D_CONTROL_UUID;
let SERVICE_ANGLE_CONTROL_UUID;
let SERVICE_SELECT_SENSOR_UUID;

let CHARACTERISTIC_P_CONTROL_UUID;
let CHARACTERISTIC_I_CONTROL_UUID;
let CHARACTERISTIC_D_CONTROL_UUID;
let CHARACTERISTIC_ANGLE_CONTROL_UUID;
let CHARACTERISTIC_SELECT_MODE_UUID;
let CHARACTERISTIC_SELECT_SENSOR_UUID;


export const bleConstants = {
  setServiceAngleControlUuid: (uuid) => SERVICE_ANGLE_CONTROL_UUID = uuid,
  getServiceAngleControlUuid: () => SERVICE_ANGLE_CONTROL_UUID,
  setServicePControlUuid: (uuid) => SERVICE_P_CONTROL_UUID = uuid,
  getServicePControlUuid: () => SERVICE_P_CONTROL_UUID,
  setServiceIControlUuid: (uuid) => SERVICE_I_CONTROL_UUID = uuid,
  getServiceIControlUuid: () => SERVICE_I_CONTROL_UUID,
  setServiceDControlUuid: (uuid) => SERVICE_D_CONTROL_UUID = uuid,
  getServiceDControlUuid: () => SERVICE_D_CONTROL_UUID,
  setServiceSelectModeUuid: (uuid) => SERVICE_SELECT_MODE_UUID = uuid,
  getServiceSelectModeUuid: () => SERVICE_SELECT_MODE_UUID,
  setServiceSelectSensorUuid: (uuid) => SERVICE_SELECT_SENSOR_UUID = uuid,
  getServiceSelectSensorUuid: () => SERVICE_SELECT_SENSOR_UUID,
  setCharacteristicAngleControlUuid: (uuid) => CHARACTERISTIC_ANGLE_CONTROL_UUID = uuid,
  getCharacteristicAngleControlUuid: () => CHARACTERISTIC_ANGLE_CONTROL_UUID,
  setCharacteristicPControlUuid: (uuid) => CHARACTERISTIC_P_CONTROL_UUID = uuid,
  getCharacteristicPControlUuid: () => CHARACTERISTIC_P_CONTROL_UUID,
  setCharacteristicIControlUuid: (uuid) => CHARACTERISTIC_I_CONTROL_UUID = uuid,
  getCharacteristicIControlUuid: () => CHARACTERISTIC_I_CONTROL_UUID,
  setCharacteristicDControlUuid: (uuid) => CHARACTERISTIC_D_CONTROL_UUID = uuid,
  getCharacteristicDControlUuid: () => CHARACTERISTIC_D_CONTROL_UUID,
  setCharacteristicSelectModeUuid: (uuid) => CHARACTERISTIC_SELECT_MODE_UUID = uuid,
  getCharacteristicSelectModeUuid: () => CHARACTERISTIC_SELECT_MODE_UUID,
  setCharacteristicSelectSensorUuid: (uuid) => CHARACTERISTIC_SELECT_SENSOR_UUID = uuid,
  getCharacteristicSelectSensorUuid: () => CHARACTERISTIC_SELECT_SENSOR_UUID,
}