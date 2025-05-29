import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importe FormsModule
import { provideHttpClient } from '@angular/common/http'; // Importe HttpClientModule

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionGeneratorComponent } from './components/question-generator/question-generator.component';
import { QuestionDisplayComponent } from './components/question-display/question-display.component';
import { ResolutionDisplayComponent } from './components/resolution-display/resolution-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionGeneratorComponent,
    QuestionDisplayComponent,
    ResolutionDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}