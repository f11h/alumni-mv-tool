import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Card} from '../../../shared/classes/card';
import {CardService} from '../../../shared/services/card.service';

@Component({
    selector: 'app-cards-table',
    templateUrl: './cards-table.component.html',
    styleUrls: ['./cards-table.component.scss']
})
export class CardsTableComponent implements OnInit, OnDestroy, OnChanges {
    cards: Card[];
    displayedCards: Card[];
    filteredCards: Card[];
    timeout;
    currentPage = 1;
    itemsPerPage = 10;
    searchTerm = '';

    @Input()
    refresh = false;

    constructor(private cardService: CardService) {
    }

    ngOnInit() {
        this.loadCards();
    }

    ngOnDestroy() {
        clearTimeout(this.timeout);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.refresh.previousValue !== changes.refresh.currentValue && !changes.refresh.isFirstChange()) {
            this.loadCards();
        }
    }

    loadCards() {
        this.cards = undefined;
        this.filteredCards = undefined;
        this.displayedCards = undefined;

        this.cardService.getAllCards()
            .subscribe(cards => {
                this.cards = cards;
                this.filter();
            });
    }

    pageChanged(event: { page: number, itemsPerPage: number }) {
        this.currentPage = event.page;

        const startItem = (this.currentPage - 1) * this.itemsPerPage;
        let endItem = startItem + this.itemsPerPage;

        if (endItem > this.filteredCards.length) {
            endItem = this.filteredCards.length;
        }

        this.displayedCards = this.filteredCards.slice(startItem, endItem);
    }

    deleteCardLink(card) {
        card.deletionInProgress = true;
        this.cardService.deleteCardLink(card)
            .subscribe(() => {
                // this.loadCards();
                this.cards.splice(
                    this.cards.indexOf(card),
                    1
                );
                this.filter();
            })
    }

    filter() {
        if (this.searchTerm === '') {
            this.filteredCards = this.cards;
        } else {
            const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

            this.filteredCards = this.cards.filter(card => {
                let result = false;

                lowerCaseSearchTerm.split(' ').forEach(part => {
                    if (part !== '') {
                        if (card.cardId.toLowerCase().includes(part)) {
                            result = true;
                        }

                        if (card.owner.firstname.toLowerCase().includes(part)) {
                            result = true;
                        }

                        if (card.owner.lastname.toLowerCase().includes(part)) {
                            result = true;
                        }

                        if (card.owner.id.toString() === part) {
                            result = true;
                        }

                        if (card.owner.email.toLowerCase().includes(part)) {
                            result = true;
                        }
                    }
                });
                return result;
            });
        }
        this.pageChanged({page: this.currentPage, itemsPerPage: this.itemsPerPage});
    }
}
