#ifndef SETTINGS_HPP
#define SETTINGS_HPP

#include "led.hpp"

typedef enum {
     ACCELEROMETER_SENSOR,
     ULTRASONIC_SENSOR
} Sensor;

typedef enum {
     DISCONNECTED_MODE,
     DEFAULT_MODE,
     FREE_MODE
} Mode;

typedef struct {
     float P;
     float I;
     float D;
} PID;

typedef struct {
     PID pid;
     float referenceAngle;
     Mode currentMode;
     Sensor currentSensor;
} SystemSettings;

#define SYSTEM_ANGLE_UPPER_LIMIT   14
#define SYSTEM_ANGLE_LOWER_LIMIT   -14
#define SYSTEM_DEFAULT_P           36
#define SYSTEM_DEFAULT_I           8
#define SYSTEM_DEFAULT_D           64
#define SYSTEM_DEFAULT_ANGLE       0
#define SYSTEM_DEFAULT_MODE        DISCONNECTED_MODE
#define SYSTEM_DEFAULT_SENSOR      ULTRASONIC_SENSOR

extern bool bCheckModeUpdate(void);

extern void vComponentsInit(void);

extern float fGetReferenceAngle(void);

extern float fGetPidThermP(void);

extern float fGetPidThermI(void);

extern float fGetPidThermD(void);

extern Sensor xGetCurrentSensor(void);

extern Mode xGetCurrentMode(void);

extern LedColor vGetLedColor(void);

extern void vSetReferenceAngle(float referenceAngle);

extern void vSetPidThermP(float P);

extern void vSetPidThermI(float I);

extern void vSetPidThermD(float D);

extern void vSetCurrentSensor(Sensor currentSensor);

extern void vSetCurrentMode(Mode currentMode);

extern void vSetLedColor(LedColor ledColor);

#endif