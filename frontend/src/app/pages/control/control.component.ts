import {Component, OnInit} from '@angular/core';
import {CardService} from '../../shared/services/card.service';
import {AuthService} from '../../shared/services/auth.service';
import {Card} from '../../shared/classes/card';
import {Subscriber, Observable} from 'rxjs';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
    notSupported = false;
    cards: Card[] = [];

    constructor(
        private cardService: CardService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.notSupported = navigator.bluetooth === undefined;

        this.cardService.getCardsFromUser(
            this.authService.getCurrentUser(),
            true
        ).subscribe(cards => {
            this.cards = cards;
        });
    }

    authenticate(card: Card) {
        const encoder = new TextEncoder();

        return new Observable<{ device: BluetoothDevice, characteristic: BluetoothRemoteGATTCharacteristic }>
        ((subscriber: Subscriber<{ device: BluetoothDevice, characteristic: BluetoothRemoteGATTCharacteristic }>) => {
            let _characteristic: BluetoothRemoteGATTCharacteristic;
            let _device: BluetoothDevice;

            navigator.bluetooth.requestDevice({ filters: [{ services: [0xf11d] }] })
                .then(device => {
                    _device = device;
                    return device.gatt.connect();
                })
                .then(server => {
                    console.log(server);
                    return server.getPrimaryService(0xf11d);
                })
                .then(service => {
                    console.log('service:', service);
                    return service.getCharacteristic(0xf11e);
                })
                .then(characteristic => {
                    _characteristic = characteristic;
                    const buffer = encoder.encode(card.signed);
                    characteristic.writeValue(buffer)
                })
                .then(() => {
                    subscriber.next({
                        device: _device,
                        characteristic: _characteristic
                    });
                    subscriber.complete();
                })
        });
    }

    sendButton(card: Card, text: string) {
        const encoder = new TextEncoder();

        this.authenticate(card)
            .subscribe(btData => {
                setTimeout(() => {
                    const buffer = encoder.encode(text);
                    btData.characteristic.writeValue(buffer)
                        .then(() => {
                            btData.device.gatt.disconnect();
                        })
                }, 1000);
            })
    }

    oneCup(card: Card) {
        this.sendButton(card, 'buttononecup');
    }

    twoCups(card: Card) {
        this.sendButton(card, 'buttontwocups');
    }
}
