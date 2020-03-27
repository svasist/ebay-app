import { Country } from './../../enums/country.enum';
import { SearchItem } from './../../models/search-item.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchItemsService } from 'src/app/services/search-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  searchItemsSubscription: Subscription;
  searchItems: SearchItem[];
  Country = Country;
  constructor(private searchItemService: SearchItemsService) {}

  ngOnInit() {
    this.searchItemsSubscription = this.searchItemService.getSearchItems()
      .subscribe((res: SearchItem[]) => {
        this.searchItems = res;
      });
  
  }

  ngOnDestroy() {
    this.searchItemsSubscription.unsubscribe();
  }
}
