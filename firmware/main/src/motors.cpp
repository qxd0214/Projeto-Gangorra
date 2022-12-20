#include "motors.hpp"
#include "driver/mcpwm.h"

// #include "esp_log.h"
// #include "esp_err.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/semphr.h"

#include <cmath>
#include "sensors.hpp"
#include "system.hpp"
#include <iostream>


#define ACCELEROMETER_DEGREES_TO_RADIAN M_PI/180

#define X                               0.0425
#define Ts                              0.05
#define Ct                              6.1053

#define REF_ANGLE                       -7.0
#define MOTOR_LEFT                      12
#define MOTOR_RIGHT                     13

float OUT_CONTROL_PAST1 = 0;
float OUT_CONTROL_PAST2 = 0;

float ERROR_CONTROL = 0;
float ERROR_CONTROL_PAST1 = 0;
float ERROR_CONTROL_PAST2 = 0;



// float i = 31;

void vInitMotors(void) {

     mcpwm_gpio_init(MCPWM_UNIT_0, MCPWM0A, MOTOR_LEFT);
     mcpwm_gpio_init(MCPWM_UNIT_0, MCPWM0B, MOTOR_RIGHT);
     mcpwm_config_t motor_pwm_config = {
         .frequency = 300, // frequency = 300Hz,
         .cmpr_a = 30,     // duty cycle of PWMxA
         .cmpr_b = 30,     // duty cycle of PWMxb
         .duty_mode = MCPWM_DUTY_MODE_0,
         .counter_mode = MCPWM_UP_COUNTER,
     };

     mcpwm_init(MCPWM_UNIT_0, MCPWM_TIMER_0, &motor_pwm_config);
     // vTaskDelay(3000/portTICK_PERIOD_MS);
     usleep(3000000);
     mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_A, 38.25);
     mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B, 40.0);
     // ESP_LOGI("Frequency Motor_Left", "Using rev \"%u\"Hz", mcpwm_get_frequency(MCPWM_UNIT_0, MCPWM_TIMER_0));
     // ESP_LOGI("Duty Cycle Motor_Left", "%f %%", mcpwm_get_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_A));
     // ESP_LOGI("Duty Cycle Motor_Right", "%f %%", mcpwm_get_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B));
}

void vAdjustMotors(void) {

     float angle = fGetCurrentAngle();
     // ESP_LOGI("Angle", "%.2f", angle);

     if (angle > -14 && angle < 14) {

          //fGetReferenceAngle();
          ERROR_CONTROL = REF_ANGLE - angle;
          if(abs(ERROR_CONTROL) > 3.5) {
               ERROR_CONTROL = ERROR_CONTROL * ACCELEROMETER_DEGREES_TO_RADIAN;
               
               float OUT_CONTROL = ERROR_CONTROL * (fGetPidThermP() +fGetPidThermI()*(Ts/2)) + ERROR_CONTROL_PAST1 * (-fGetPidThermP()+fGetPidThermI()*(Ts/2)-2*fGetPidThermD()*(1/Ts)) + ERROR_CONTROL_PAST2 * (fGetPidThermD()*(1/Ts)) - OUT_CONTROL_PAST1 * (-1);
               float pwm = mcpwm_get_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B);
               float out_control_ct = (OUT_CONTROL * Ct * 2.2)/10000;
               ESP_LOGI("OUT_PWM1", "%.2f", out_control_ct);
               // if((REF_ANGLE - angle) < 0) {
               //      out_control_ct *= -1;
               // } else {
               //      out_control_ct *= 1;
               // }
               float out = out_control_ct * 0.3 + pwm;
               // ESP_LOGI("OUT_PWM2", "%.2f", out);

               //out_pwm = out_pwm * 0.3 + pwm;
               usleep(5000);
               if((out > 38) && (out < 45)) {
                    mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B, out);
               } else if(out < 38) {
                    mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B, 38);
               } else if(out > 45) {
                    mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B, 44);
               } else {
                    mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_B, 40);
               }

               ERROR_CONTROL_PAST1 = ERROR_CONTROL;
               OUT_CONTROL_PAST2 = OUT_CONTROL_PAST1;
               OUT_CONTROL_PAST1 = OUT_CONTROL;
               mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_A, 38.5);
          }else{
               mcpwm_set_duty(MCPWM_UNIT_0, MCPWM_TIMER_0, MCPWM_OPR_A, 40);
          }

     }

}