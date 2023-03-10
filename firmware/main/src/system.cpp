#include "system.hpp"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "sensors.hpp"
#include "motors.hpp"
#include "display.hpp"
#include "bluetooth.hpp"
#include "delay.hpp"

static LedRgb systemLed = LedRgb(GPIO_NUM_5, GPIO_NUM_15, GPIO_NUM_18);
static SystemSettings currentSettings;
static bool modeUpdate;

// =============================================================================
// PRIVATE FUNCTIONS
// =============================================================================

static void vInitSystemSettings(void) {
     currentSettings = {
          .pid = {
               .P = SYSTEM_DEFAULT_P,
               .I = SYSTEM_DEFAULT_I,
               .D = SYSTEM_DEFAULT_D,
          },
          .referenceAngle = SYSTEM_DEFAULT_ANGLE,
          .currentMode = SYSTEM_DEFAULT_MODE,
          .currentSensor = SYSTEM_DEFAULT_SENSOR
     };
     modeUpdate = true;
}

static void vStartupScreen(void) {
     vClearDisplay();
     vSetDisplayCursor(0, 0);
     vDisplayWriteString("Balanco Didatico");
     vSetDisplayCursor(1, 6);
     vDisplayWriteString("v1.0.1");
     vDelayMs(2000);

     vClearDisplay();
     vSetDisplayCursor(0, 0);
     vDisplayWriteString("Ligando Motores");
     vSetDisplayCursor(1, 5);
     vDisplayWriteString("em 3s");
     vDelayMs(1000);

     vSetDisplayCursor(1, 8);
     vDisplayWriteChar('2');
     vDelayMs(1000);

     vSetDisplayCursor(1, 8);
     vDisplayWriteChar('1');
     vDelayMs(1000);
}

// =============================================================================
// PUBLIC FUNCTIONS
// =============================================================================

bool bCheckModeUpdate(void) {
     bool currentModeUpdate = modeUpdate;
     modeUpdate = false;
     return currentModeUpdate;
}

void vComponentsInit(void) {
     vInitSystemSettings();
     vInitAccelerometerSensor();
     vInitUltrasonicSensor();
     vInitBluetooth();
     vInitDisplay();
     vStartupScreen();
     vInitMotors();
     vSetLedColor(kLED_COLOR_GREEN);
}

// =============================================================================
// SETTERS
// =============================================================================

void vSetReferenceAngle(float referenceAngle) {
     if(referenceAngle > SYSTEM_ANGLE_UPPER_LIMIT || referenceAngle < SYSTEM_ANGLE_LOWER_LIMIT) {
          return;
     }
     currentSettings.referenceAngle = referenceAngle;
}

void vSetPidThermP(float P) {
     currentSettings.pid.P = P;
}

void vSetPidThermI(float I) {
     currentSettings.pid.I = I;
}

void vSetPidThermD(float D) {
     currentSettings.pid.D = D;
}

void vSetCurrentSensor(Sensor currentSensor) {
     if(currentSensor > ULTRASONIC_SENSOR && currentSensor < ACCELEROMETER_SENSOR) {
          return;
     }
     currentSettings.currentSensor = currentSensor;
}

void vSetCurrentMode(Mode currentMode) {
     if(currentMode > FREE_MODE && currentMode < DISCONNECTED_MODE) {
          return;
     }
     currentSettings.currentMode = currentMode;
     modeUpdate = true;
}

void vSetLedColor(LedColor ledColor){ 
     systemLed.setColor(ledColor);
}

// =============================================================================
// GETTERS
// =============================================================================

float fGetReferenceAngle(void) {
     return currentSettings.referenceAngle;
}

float fGetPidThermP(void) {
     return currentSettings.pid.P;
}

float fGetPidThermI(void) {
     return currentSettings.pid.I;
}

float fGetPidThermD(void) {
     return currentSettings.pid.D;
}

Sensor xGetCurrentSensor(void) {
     return currentSettings.currentSensor;
}

Mode xGetCurrentMode(void) {
     return currentSettings.currentMode;
}

LedColor vGetLedColor(void) {
     return systemLed.getColor();
}
