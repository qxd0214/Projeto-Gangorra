#include "led.hpp"

LedRgb::LedRgb(gpio_num_t ledRed, gpio_num_t ledGreen, gpio_num_t ledBlue) : ledRed(ledRed), ledGreen(ledGreen), ledBlue(ledBlue) {
     gpio_set_direction(this->ledRed, GPIO_MODE_OUTPUT);
     gpio_set_direction(this->ledGreen, GPIO_MODE_OUTPUT);
     gpio_set_direction(this->ledBlue, GPIO_MODE_OUTPUT);
     this->setColor(kLED_COLOR_OFF);
}

void LedRgb::setColor(LedColor newColor) {
     switch(newColor) {
          case kLED_COLOR_OFF:
               gpio_set_level(this->ledRed, 0);
               gpio_set_level(this->ledGreen, 0);
               gpio_set_level(this->ledBlue, 0);
               break;
          case kLED_COLOR_RED:
               gpio_set_level(this->ledRed, 1);
               gpio_set_level(this->ledGreen, 0);
               gpio_set_level(this->ledBlue, 0);
               break;
          case kLED_COLOR_GREEN:
               gpio_set_level(this->ledRed, 0);
               gpio_set_level(this->ledGreen, 1);
               gpio_set_level(this->ledBlue, 0);
               break;
          case kLED_COLOR_BLUE:
               gpio_set_level(this->ledRed, 0);
               gpio_set_level(this->ledGreen, 0);
               gpio_set_level(this->ledBlue, 1);
               break;
          case kLED_COLOR_YELLOW:
               gpio_set_level(this->ledRed, 1);
               gpio_set_level(this->ledGreen, 1);
               gpio_set_level(this->ledBlue, 0);
               break;
          case kLED_COLOR_CYAN:
               gpio_set_level(this->ledRed, 0);
               gpio_set_level(this->ledGreen, 1);
               gpio_set_level(this->ledBlue, 1);
               break;
          case kLED_COLOR_MAGENTA:
               gpio_set_level(this->ledRed, 1);
               gpio_set_level(this->ledGreen, 0);
               gpio_set_level(this->ledBlue, 1);
               break;
          case kLED_COLOR_WHITE:
               gpio_set_level(this->ledRed, 1);
               gpio_set_level(this->ledGreen, 1);
               gpio_set_level(this->ledBlue, 1);
               break;
     }
}

LedColor LedRgb::getColor(void) {
     return this->currentColor;
}
