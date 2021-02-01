#include "FastLED.h"

// How many leds in your strip?
#define NUM_LEDS 100

// For led chips like Neopixels, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
#define DATA_PIN 3
#define CLOCK_PIN 13
#define COLOR_ORDER BGR
#define FRAMES_PER_SECOND 120


#define FSR_PIN 0

// Define the array of leds
CRGB leds[NUM_LEDS];

void setup() { 
      Serial.begin(9600);
      FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, COLOR_ORDER, RGB>(leds, NUM_LEDS);
      Serial.print("Analog reading = ");
}

    void loop() {

        int fsrReading = analogRead(FSR_PIN);  
        
        Serial.println(fsrReading);     // the raw analog reading

        int numLedsToLight = map(fsrReading, 0, 1023, 0, NUM_LEDS);

numLedsToLight = NUM_LEDS;

        // First, clear the existing led values
        FastLED.clear();
        for(int led = 0; led < numLedsToLight; led++) { 
            leds[led] = CRGB::Blue; 
        }
        FastLED.show();
        delay(100);
    }
