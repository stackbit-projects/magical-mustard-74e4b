/* FSR simple testing sketch.  <br>Connect one end of FSR to power, the other end to Analog 0.
Then connect one end of a 10K resistor from Analog 0 to ground 
*/
int fsrPin = 0;     // the FSR and 10K pulldown are connected to a0
int fsrReading;     // the analog reading from the FSR resistor divider
const int ledPin =  13;      // the number of the LED pin
int ledState = LOW;             // ledState used to set the LED
int stripPin = 10;

void setup(void) {
  Serial.begin(9600);   
    pinMode(ledPin, OUTPUT);    

}
 
void loop(void) {
  fsrReading = analogRead(fsrPin);  
 
  Serial.println(fsrReading);     // the raw analog reading
  int power = map(fsrReading, 500, 900, 0, 255);
  Serial.print(" ");
  Serial.print(power);
 
  if (fsrReading < 500) {
    Serial.println(" - No pressure");
    ledState = LOW;
    analogWrite(stripPin, 0);
  } else {
    analogWrite(stripPin, power);
    ledState = HIGH;
  }
  digitalWrite(ledPin, ledState);
  delay(10);

}
