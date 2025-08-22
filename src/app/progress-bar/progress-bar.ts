import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css'
})
export class ProgressBar implements OnInit {
  value = input<number>();
  max = input<number>();

  constructor() { }
  ngOnInit(): void {
  }
}
