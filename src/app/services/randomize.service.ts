import { Injectable } from '@angular/core';

@Injectable()
export class RandomizeService {
  random: number;

  constructor() {
    this.random = Math.floor(Math.random() * 1000);
  }

  getSalt() {
    return this.random;
  }
}
