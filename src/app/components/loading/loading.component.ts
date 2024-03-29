// import { AsyncPipe, NgIf, NgTemplateOutlet, } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loading$: Observable<boolean>;

  @Input() detectRouteTransitions = false;

  @ContentChild('loading', { static: true }) customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(private loadingService: LoadingService, private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap(event => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}
