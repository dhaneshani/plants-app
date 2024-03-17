import { Component, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";
import {headerDetails, HeaderService} from "../../services/header/header.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  headerData: headerDetails = this.headerService.defaultHeaderDetails;
  private getHeaderDetailsSubscriber! : Subscription
  constructor(private headerService : HeaderService) { }

  /**
   * initialize component
   */
  ngOnInit(): void {
    this.getHeaderDetailsSubscriber = this.headerService.getHeaderDetails().subscribe(data => {
      this.headerData = data;
    });
  }

  /**
   * unsubscribe subscription before component destroyed
   */
  ngOnDestroy() {
    if (this.getHeaderDetailsSubscriber) {
      this.getHeaderDetailsSubscriber.unsubscribe();
    }
  }

  /**
   * handle back button click even
   */
  handleButtonClick(): void {
    this.headerData.action?.();
  }
}


