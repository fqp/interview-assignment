import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { NewsItem } from "../store/news.reducer";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class NewsComponent implements OnInit {
  news$: Observable<NewsItem[]> = this.store.select(
    (state: any) => state.news.news
  );
  selectedItem$: Observable<NewsItem | null> = this.store.select(
    (state: any) => state.news.selectedItem
  );
  name: string = "";

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onInputChange() {
    this.store.dispatch({
      type: "NEWS_TEXT_UPDATE",
      payload: this.name,
    });
  }

  addNews() {
    this.store.dispatch({ type: "ADD_NEWS" });
  }

  onSelect(id: number) {
    this.store.dispatch({ type: "SELECT_NEWS", payload: id });
  }
}
