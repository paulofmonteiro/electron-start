import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<div class="jumbotron">
            <h1>Electron APP with {{name}}!</h1>
            <p>Dev Enviroment is in progress</p>
        </div>`
})

export class AppComponent { name = 'Angular 2'; }