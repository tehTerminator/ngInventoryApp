import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BundleStoreService } from './services/bundle-store.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: BundleStoreService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data => {
        try
        {
          const id = Number(data.get('id'));
          this.store.id = id;
        }
        catch(error) {
          this.store.id = 0;
        }
      })
    })
  }
}
