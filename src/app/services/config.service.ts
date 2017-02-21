import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public static newsApi = "https://newsapi.org/v1";
  public static newsApiKey = "2b9968bdf0e14d979f1d3fea48adc989";

  public static channelTypes = ['Business', 'Technology', 'General', 'Sports'];

  constructor() { }

}
