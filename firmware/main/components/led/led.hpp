#pragma once

#include <driver/gpio.h>

enum LedColor {
     kLED_COLOR_OFF,
     kLED_COLOR_RED,
     kLED_COLOR_GREEN,
     kLED_COLOR_BLUE,
     kLED_COLOR_YELLOW,
     kLED_COLOR_CYAN,
     kLED_COLOR_MAGENTA,
     kLED_COLOR_WHITE,
};

class LedRgb {
     private:
          gpio_num_t const ledRed;
          gpio_num_t const ledGreen;
          gpio_num_t const ledBlue;
          LedColor currentColor;
     public:
          LedRgb(gpio_num_t ledRed, gpio_num_t ledGreen, gpio_num_t ledBlue);
          void setColor(LedColor newColor);
          LedColor getColor(void);
};
