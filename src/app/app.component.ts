import { Component, Inject, inject, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { LanguageService, SERVER_LANG_TOKEN } from './service/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'i18n-app';

  private cookie = inject(SsrCookieService);
  private languageService = inject(LanguageService);

  constructor(
    @Optional()
    @Inject(SERVER_LANG_TOKEN) langServer: string,
  ) {
    const lang = langServer ?? ( this.cookie.check('lang') ? this.cookie.get('get') : 'en' );
    this.languageService.changeLang(lang);
  }

}
