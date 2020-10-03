void setup() {
    Serial.begin(115200);
}
void loop() {
    while (!Serial.available()); //wait until a byte was received
    analogWrite(3, Serial.read()); //output received byte
}